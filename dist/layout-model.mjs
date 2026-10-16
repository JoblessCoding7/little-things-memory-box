export const FORMAT = 'little-things-layout';
export const STORAGE_KEY = 'little-things-layout-v1';
export const clone = value => JSON.parse(JSON.stringify(value));
export const round = value => Math.round(value * 100) / 100;
export const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

export function createLayout(assets) {
  // Stable sort preserves the original DOM stacking order for equal z-indices.
  const order = [...assets].sort((a, b) => a.z - b.z).map(a => a.id);
  return {
    format: FORMAT, version: 1,
    canvases: { desktop: { width: 1280, height: 1894.4 }, mobile: { width: 390, height: 2671.5 } },
    items: assets.map(a => ({
      id: a.id, z: order.indexOf(a.id) + 1,
      desktop: { x: a.x, y: a.y, w: a.w },
      mobile: { x: round(a.m[0] * 3.9), y: a.m[1], w: round(a.m[2] * 3.9) }
    }))
  };
}

export function validateLayout(input, assets) {
  const fail = () => { throw new Error('这不是完整的 Little Things 布局文件，请选择从这个画布导出的 JSON。'); };
  if (!input || input.format !== FORMAT || input.version !== 1 || !Array.isArray(input.items) || input.items.length !== assets.length) fail();
  const validNumber = (v, min, max) => typeof v === 'number' && Number.isFinite(v) && v >= min && v <= max;
  const result = createLayout(assets);
  for (const mode of ['desktop', 'mobile']) {
    const canvas = input.canvases?.[mode];
    if (!canvas || canvas.width !== result.canvases[mode].width || !validNumber(canvas.height, 300, 12000)) fail();
    result.canvases[mode].height = round(canvas.height);
  }
  const ids = new Set(), zs = new Set();
  for (const row of input.items) {
    if (!row || !assets.some(a => a.id === row.id) || ids.has(row.id) || !Number.isInteger(row.z) || row.z < 1 || row.z > assets.length || zs.has(row.z)) fail();
    ids.add(row.id); zs.add(row.z);
    const target = result.items.find(a => a.id === row.id);
    target.z = row.z;
    for (const mode of ['desktop', 'mobile']) {
      const p = row[mode];
      if (!p || !validNumber(p.x, -12000, 12000) || !validNumber(p.y, -12000, 12000) || !validNumber(p.w, 20, 6000)) fail();
      target[mode] = { x: round(p.x), y: round(p.y), w: round(p.w) };
    }
  }
  // Discard all unknown fields; source URLs always come from the approved asset list.
  return result;
}

export function reorder(layout, id, direction) {
  const rows = [...layout.items].sort((a, b) => a.z - b.z);
  const index = rows.findIndex(a => a.id === id);
  if (index < 0) return;
  const target = direction === 'front' ? rows.length - 1 : direction === 'back' ? 0 : clamp(index + (direction === 'up' ? 1 : -1), 0, rows.length - 1);
  rows.splice(target, 0, rows.splice(index, 1)[0]);
  rows.forEach((a, i) => { a.z = i + 1; });
}

export function toCollection(layout, assets) {
  const checked = validateLayout(layout, assets);
  return assets.map(a => {
    const row = checked.items.find(item => item.id === a.id);
    return { ...a, ...row.desktop, z: row.z, m: [round(row.mobile.x / 3.9), row.mobile.y, round(row.mobile.w / 3.9)] };
  });
}
