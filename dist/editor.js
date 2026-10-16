import { STORAGE_KEY, clone, round, clamp, createLayout, validateLayout, reorder } from './layout-model.mjs';

const assets = window.collectionItems;
const $ = id => document.getElementById(id);
const board = $('artboard'), workspace = $('workspace'), selection = $('selection');
const assetMap = new Map(assets.map(asset => [asset.id, asset]));
const nodes = new Map(), layerNodes = new Map(), masks = new Map();
const ratios = new Map(assets.map(a => [a.id, 1]));
let state = createLayout(assets), mode = 'desktop', selected = null;
let scale = 1, zoom = 'fit', preview = false, gesture = null;
let history = [], future = [], toastTimer, saveOkay = true;
let loadedDraft = false, draftError = false;
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) { state = validateLayout(JSON.parse(saved), assets); loadedDraft = true; }
} catch { draftError = true; }

function toast(message) {
  $('toast').textContent = message;
  $('toast').hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { $('toast').hidden = true; }, 4500);
}
function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    saveOkay = true;
    $('save-state').textContent = '已保存到当前浏览器';
  } catch {
    saveOkay = false;
    $('save-state').textContent = '本地保存不可用 · 请导出布局';
    toast('浏览器暂时无法保存。请用「完成并导出」下载布局文件。');
  }
}
function commit(before) {
  if (JSON.stringify(before) !== JSON.stringify(state)) {
    history.push(before);
    if (history.length > 100) history.shift();
    future = [];
    save();
  }
  render();
}
function change(fn) { const before = clone(state); fn(); commit(before); }
function row() { return state.items.find(item => item.id === selected); }
function point(event) {
  const bounds = board.getBoundingClientRect();
  return { x: (event.clientX - bounds.left) / scale, y: (event.clientY - bounds.top) / scale };
}
function positionNode(node, p, height) {
  node.style.left = `${p.x}px`; node.style.top = `${p.y}px`;
  node.style.width = `${p.w}px`;
  if (height != null) node.style.height = `${height}px`;
}
function renderSelection() {
  const item = row();
  selection.hidden = !item || preview;
  if (!item) return;
  const p = item[mode];
  positionNode(selection, p, p.w * ratios.get(item.id));
  selection.style.borderWidth = `${1.5 / scale}px`;
  $('selection-name').textContent = assetMap.get(item.id).alt;
  $('selection-name').style.fontSize = `${10 / scale}px`;
  $('resize-handle').style.width = `${12 / scale}px`;
  $('resize-handle').style.height = `${12 / scale}px`;
  $('resize-handle').style.right = `${-6 / scale}px`;
  $('resize-handle').style.bottom = `${-6 / scale}px`;
}
function updateScale() {
  const canvas = state.canvases[mode];
  const padding = parseFloat(getComputedStyle(workspace).paddingLeft) * 2;
  scale = zoom === 'fit' ? Math.min(1, Math.max(.08, (workspace.clientWidth - padding - 2) / canvas.width)) : zoom;
  board.style.width = `${canvas.width}px`;
  board.style.height = `${canvas.height}px`;
  board.style.transform = `scale(${scale})`;
  $('canvas-wrap').style.width = `${canvas.width * scale}px`;
  $('canvas-wrap').style.height = `${canvas.height * scale}px`;
  $('zoom-value').textContent = `${Math.round(scale * 100)}%`;
  $('canvas-size').textContent = `${canvas.width} × ${round(canvas.height)}`;
  $('canvas-name').textContent = mode === 'desktop' ? '电脑画布' : '手机画布';
  renderSelection();
}
function renderProperties() {
  const item = row();
  $('properties').disabled = !item || preview;
  $('selected-name').textContent = item ? assetMap.get(item.id).alt : '选一件素材';
  $('empty-hint').hidden = !!item;
  for (const key of ['x', 'y', 'w']) {
    const field = $(`field-${key}`);
    if (document.activeElement !== field) field.value = item ? round(item[mode][key]) : '';
  }
  $('canvas-height').value = state.canvases[mode].height;
  $('canvas-height').disabled = preview;
  document.querySelectorAll('[data-layer]').forEach(button => {
    button.disabled = !item || preview || (['up', 'front'].includes(button.dataset.layer) ? item.z === assets.length : item.z === 1);
  });
  $('undo').disabled = !history.length || preview;
  $('redo').disabled = !future.length || preview;
}
function render() {
  for (const item of state.items) {
    const node = nodes.get(item.id);
    positionNode(node, item[mode]); node.style.zIndex = item.z;
    const layer = layerNodes.get(item.id);
    layer.querySelector('button').setAttribute('aria-pressed', String(selected === item.id));
    layer.querySelector('.layer-number').textContent = String(item.z).padStart(2, '0');
  }
  const focused = document.activeElement;
  [...state.items].sort((a, b) => b.z - a.z).forEach((item, index) => {
    const layer = layerNodes.get(item.id);
    if ($('layers').children[index] !== layer) $('layers').insertBefore(layer, $('layers').children[index] || null);
  });
  if (focused?.matches('#layers button')) focused.focus({ preventScroll: true });
  renderProperties(); updateScale();
}
function select(id) {
  selected = id;
  render();
}
function locate() {
  const p = row()?.[mode];
  if (!p) return;
  workspace.scrollTo({ left: Math.max(0, p.x * scale - workspace.clientWidth / 2 + p.w * scale / 2), top: Math.max(0, p.y * scale - workspace.clientHeight / 2 + p.w * ratios.get(selected) * scale / 2 + 38), behavior: 'auto' });
}

for (const asset of assets) {
  const node = document.createElement('div');
  node.className = 'asset'; node.dataset.id = asset.id;
  const image = new Image(); image.src = asset.src; image.alt = asset.alt; image.draggable = false;
  node.append(image); board.insertBefore(node, selection); nodes.set(asset.id, node);
  image.addEventListener('load', () => {
    ratios.set(asset.id, image.naturalHeight / image.naturalWidth);
    // Tiny alpha masks make transparent image corners click-through, without changing the source PNG.
    try {
      const canvas = document.createElement('canvas'); canvas.width = 160; canvas.height = 160;
      const context = canvas.getContext('2d', { willReadFrequently: true });
      context.drawImage(image, 0, 0, 160, 160);
      masks.set(asset.id, context.getImageData(0, 0, 160, 160).data);
    } catch { /* Bounding-box selection remains available, as does the layer list. */ }
    renderSelection();
  });
  image.addEventListener('error', () => toast(`素材未能载入：${asset.alt}。请刷新页面重试。`));
  const li = document.createElement('li');
  const button = document.createElement('button'); button.type = 'button';
  button.dataset.id = asset.id; button.setAttribute('aria-label', `选择${asset.alt}`);
  const thumb = image.cloneNode(); thumb.alt = '';
  const name = document.createElement('span'); name.className = 'layer-title'; name.textContent = asset.alt;
  const number = document.createElement('span'); number.className = 'layer-number';
  button.append(thumb, name, number); li.append(button); layerNodes.set(asset.id, li);
  button.addEventListener('click', () => { select(asset.id); locate(); });
}

function hitTest(p) {
  for (const item of [...state.items].sort((a, b) => b.z - a.z)) {
    const r = item[mode], h = r.w * ratios.get(item.id);
    const u = (p.x - r.x) / r.w, v = (p.y - r.y) / h;
    if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
    const mask = masks.get(item.id);
    if (!mask || mask[(Math.floor(v * 160) * 160 + Math.floor(u * 160)) * 4 + 3] > 32) return item.id;
  }
  return null;
}
board.addEventListener('pointerdown', event => {
  if (preview || event.button !== 0 || gesture) return;
  const p = point(event);
  const resizing = event.target === $('resize-handle') && selected;
  if (!resizing) select(hitTest(p));
  if (!selected) return;
  event.preventDefault();
  workspace.focus({ preventScroll: true });
  gesture = { before: clone(state), start: p, original: { ...row()[mode] }, resizing, pointerId: event.pointerId };
  board.setPointerCapture(event.pointerId);
  board.style.cursor = resizing ? 'nwse-resize' : 'grabbing';
});
board.addEventListener('pointermove', event => {
  if (!gesture || event.pointerId !== gesture.pointerId) return;
  const p = point(event), r = row()[mode], g = gesture;
  const dx = p.x - g.start.x, dy = p.y - g.start.y;
  if (g.resizing) {
    const ratio = ratios.get(selected);
    // Project the pointer onto the image diagonal, keeping its aspect ratio fixed.
    r.w = round(clamp(g.original.w + (dx + dy * ratio) / (1 + ratio * ratio), 20, 6000));
  } else {
    r.x = round(clamp(g.original.x + dx, -12000, 12000));
    r.y = round(clamp(g.original.y + dy, -12000, 12000));
  }
  positionNode(nodes.get(selected), r); renderSelection(); renderProperties();
});
function endGesture(event, cancel = false) {
  if (!gesture || (event && event.pointerId !== gesture.pointerId)) return;
  const g = gesture; gesture = null;
  if (board.hasPointerCapture(g.pointerId)) board.releasePointerCapture(g.pointerId);
  board.style.cursor = '';
  if (cancel) { state = g.before; render(); } else commit(g.before);
}
board.addEventListener('pointerup', event => endGesture(event));
board.addEventListener('pointercancel', event => endGesture(event, true));
board.addEventListener('lostpointercapture', event => endGesture(event, true));

function bindNumber(field, getValue, setValue, min, max, paint) {
  let before = null;
  field.addEventListener('input', () => {
    if (preview || field.disabled || !Number.isFinite(field.valueAsNumber)) return;
    if (!before) before = clone(state);
    setValue(round(clamp(field.valueAsNumber, min, max)));
    paint(); save();
  });
  const finish = () => {
    if (before) { const snapshot = before; before = null; commit(snapshot); }
    const value = getValue(); field.value = value == null ? '' : value;
  };
  field.addEventListener('change', finish);
  field.addEventListener('blur', finish);
}
for (const key of ['x', 'y', 'w']) {
  bindNumber($(`field-${key}`), () => row()?.[mode][key], value => { if (row()) row()[mode][key] = value; }, key === 'w' ? 20 : -12000, key === 'w' ? 6000 : 12000, () => {
    if (row()) positionNode(nodes.get(selected), row()[mode]); renderSelection();
  });
}
bindNumber($('canvas-height'), () => state.canvases[mode].height, value => { state.canvases[mode].height = value; }, 300, 12000, updateScale);
document.querySelectorAll('[data-layer]').forEach(button => button.addEventListener('click', () => { if (selected && !preview) change(() => reorder(state, selected, button.dataset.layer)); }));
$('locate').addEventListener('click', locate);
document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
  endGesture(null);
  mode = button.dataset.mode; zoom = 'fit';
  document.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
  workspace.scrollTo(0, 0); render();
}));
function undo() { if (!history.length || preview) return; future.push(clone(state)); state = history.pop(); save(); render(); }
function redo() { if (!future.length || preview) return; history.push(clone(state)); state = future.pop(); save(); render(); }
$('undo').addEventListener('click', undo); $('redo').addEventListener('click', redo);
$('fit').addEventListener('click', () => { zoom = 'fit'; updateScale(); });
$('zoom-in').addEventListener('click', () => { zoom = Math.min(1.5, round(scale + .1)); updateScale(); });
$('zoom-out').addEventListener('click', () => { zoom = Math.max(.1, round(scale - .1)); updateScale(); });
$('preview').addEventListener('click', () => {
  preview = !preview;
  document.body.classList.toggle('is-preview', preview);
  $('preview').setAttribute('aria-pressed', String(preview));
  $('preview').textContent = preview ? '返回编辑' : '预览排版';
  $('canvas-hint').textContent = preview ? '静态预览 · 正式网页将恢复漂浮' : '拖动位置 · 右下角缩放 · 方向键微调';
  render();
});
document.addEventListener('keydown', event => {
  if (event.target.closest('input, textarea, select, dialog') || preview) return;
  if (gesture) { if (event.key === 'Escape') { event.preventDefault(); endGesture(null, true); } return; }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'z') { event.preventDefault(); event.shiftKey ? redo() : undo(); return; }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'y') { event.preventDefault(); redo(); return; }
  if (event.key === 'Escape') { select(null); return; }
  if (selected && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
    const step = event.shiftKey ? 10 : 1;
    change(() => { const r = row()[mode]; const key = event.key.includes('Left') || event.key.includes('Right') ? 'x' : 'y'; r[key] = round(clamp(r[key] + (['ArrowLeft', 'ArrowUp'].includes(event.key) ? -step : step), -12000, 12000)); });
  }
});

$('export-button').addEventListener('click', () => {
  endGesture(null);
  $('export-text').value = JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
  $('export-dialog').showModal();
});
$('close-export').addEventListener('click', () => $('export-dialog').close());
$('download').addEventListener('click', () => {
  const url = URL.createObjectURL(new Blob([$('export-text').value + '\n'], { type: 'application/json' }));
  const anchor = document.createElement('a'); anchor.href = url;
  anchor.download = `little-things-layout-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.append(anchor); anchor.click(); anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast('布局文件已准备下载。把文件发到对话里即可。');
});
$('copy').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText($('export-text').value); toast('已复制布局文本，可以直接粘贴到对话里。'); }
  catch { $('export-text').focus(); $('export-text').select(); toast('请按 ⌘C / Ctrl+C 复制选中的布局文本。'); }
});
$('import-button').addEventListener('click', () => $('import-file').click());
$('import-file').addEventListener('change', async event => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    if (file.size > 250000) throw new Error('文件过大，请选择这个画布导出的布局 JSON。');
    const imported = validateLayout(JSON.parse(await file.text()), assets);
    change(() => { state = imported; });
    toast('布局已导入；如果选错文件，可以撤销。');
  } catch (error) { toast(error instanceof SyntaxError ? '文件内容不是有效的 JSON，请重新选择布局文件。' : error.message); }
  event.target.value = '';
});
$('reset').addEventListener('click', () => $('reset-dialog').showModal());
$('cancel-reset').addEventListener('click', () => $('reset-dialog').close());
$('confirm-reset').addEventListener('click', () => {
  change(() => { state = createLayout(assets); }); $('reset-dialog').close(); toast('已恢复初始排版。可点「撤销」找回刚才的版本。');
});
new ResizeObserver(updateScale).observe(workspace);
render();
$('save-state').textContent = loadedDraft ? '已恢复这个浏览器的上次排版' : '修改将自动保存在当前浏览器';
if (draftError) toast('上次的本地草稿无法读取，已显示初始排版；可以导入之前下载的布局文件。');
window.addEventListener('beforeunload', event => { if (!saveOkay) { event.preventDefault(); event.returnValue = ''; } });
