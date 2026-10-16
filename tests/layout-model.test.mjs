import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { createLayout, validateLayout, reorder, toCollection, clone } from '../dist/layout-model.mjs';

const context = { window: {} };
runInNewContext(readFileSync(new URL('../dist/collection.js', import.meta.url), 'utf8'), context);
const assets = JSON.parse(JSON.stringify(context.window.collectionItems));

test('initial editor composition matches every approved desktop/mobile asset and stacking order', () => {
  const layout = createLayout(assets);
  const converted = toCollection(layout, assets);
  for (let i = 0; i < assets.length; i++) {
    const a = assets[i], b = converted[i];
    assert.deepEqual({ ...b, z: a.z }, a);
  }
  assert.deepEqual([...converted].sort((a,b) => a.z-b.z).map(a=>a.id), [...assets].sort((a,b)=>a.z-b.z).map(a=>a.id));
});

test('edited desktop/mobile positions, sizes and canvas heights survive JSON handoff', () => {
  const layout = createLayout(assets);
  layout.items[2].desktop = { x: -75.5, y: 530.25, w: 360 };
  layout.items[2].mobile = { x: 39, y: 788, w: 195 };
  layout.canvases.desktop.height = 2400;
  reorder(layout, layout.items[2].id, 'back');
  const imported = validateLayout(JSON.parse(JSON.stringify(layout)), assets);
  assert.deepEqual(imported, layout);
  const output = toCollection(imported, assets)[2];
  assert.deepEqual(output.m, [10, 788, 50]);
  assert.equal(output.x, -75.5);
  assert.equal(output.z, 1);
  assert.equal(output.src, assets[2].src);
});

test('layer movement preserves all assets and contiguous stacking, including boundary moves', () => {
  const layout = createLayout(assets), id = assets[0].id;
  reorder(layout, id, 'back'); reorder(layout, id, 'down');
  assert.equal(layout.items.find(a=>a.id===id).z, 1);
  reorder(layout, id, 'front'); reorder(layout, id, 'up');
  assert.equal(layout.items.find(a=>a.id===id).z, 15);
  reorder(layout, id, 'down');
  assert.equal(layout.items.find(a=>a.id===id).z, 14);
  assert.deepEqual(layout.items.map(a=>a.z).sort((a,b)=>a-b), Array.from({length:15},(_,i)=>i+1));
});

test('invalid imports cannot silently lose assets, corrupt geometry, or supply external image sources', () => {
  const initial = createLayout(assets);
  for (const mutate of [
    s=>s.items.pop(), s=>s.items[0].id='unknown', s=>s.items[0].id=s.items[1].id,
    s=>s.items[0].z=s.items[1].z, s=>s.items[0].desktop.x=NaN,
    s=>s.items[0].mobile.w=0, s=>s.canvases.desktop.height=99999,
    s=>s.canvases.mobile.width=600, s=>s.version=2
  ]) { const invalid = clone(initial); mutate(invalid); assert.throws(()=>validateLayout(invalid,assets)); }
  const extended = clone(initial); extended.items[0].src = 'https://example.com/unknown.png';
  assert.deepEqual(validateLayout(extended, assets), initial);
  assert.deepEqual(initial, createLayout(assets));
});
