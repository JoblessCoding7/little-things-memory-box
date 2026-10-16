# Layout editor handoff

The standalone editor lives at `/editor.html`. It uses the 15 approved PNGs and initializes from `dist/collection.js`. It does not load the public site's motion code or modify the public collection. The user will arrange assets and send back an exported JSON file before the actual page composition is changed.

## User controls

- Drag an object to move it. Transparent corners pass clicks through to the visible object behind them; use the layer list to select fully covered objects.
- Drag the bottom-right selection handle to scale proportionally. Exact X, Y and width values are also editable.
- Move layers forward/backward one step, or directly to front/back. The layer list is ordered front to back.
- Desktop and mobile have independent positions, widths and canvas heights. Their stacking order is shared.
- Arrow keys move the selected object by 1 px; Shift + arrows move by 10 px. Command/Ctrl+Z undoes; Command/Ctrl+Shift+Z redoes. History lasts for this editing session.
- Preview hides selection UI and temporarily disables canvas edits. It is deliberately static; motion will return on the public page.
- Drafts automatically save in `localStorage` under `little-things-layout-v1`. This is browser- and origin-specific, not cloud synchronization. Clear browser data or change devices and the draft will not follow; export a file to transfer it.
- Export includes both layouts and all 15 layers. Download JSON or copy the JSON text. Import validates the format, IDs, layer uniqueness, geometry and asset completeness; an invalid file leaves the current draft untouched.
- Reset has a confirmation dialog and remains undoable in the current session.

## Export format and applying a confirmed layout

The versioned object has `format: "little-things-layout"`, `version: 1`, `canvases`, `items`, and an informational `exportedAt` timestamp. Each item has a stable approved asset `id`, shared integer `z`, and `desktop` / `mobile` objects with `x`, `y`, `w` in design pixels. Desktop canvas width is 1280; mobile width is 390. Unknown fields and source URLs from imports are discarded.

Once the user returns and approves a layout:

1. Validate it with `validateLayout(json, approvedAssets)` from `dist/layout-model.mjs`.
2. Use `toCollection(layout, approvedAssets)` to generate the array in `dist/collection.js`. It keeps the approved source paths and original array order (which also preserves each object's motion seed). Mobile X and width are converted from design pixels back to percentages.
3. Set `#world` desktop height to `layout.canvases.desktop.height / 12.8` vw, and its mobile height to `layout.canvases.mobile.height / 3.9` vw. Preserve the existing 600 px breakpoint.
4. Keep the existing irregular drift, gentle rotation, lightbox and reduced-motion behavior. The layout stores the static animation origins, not exact positions at every animation frame.
5. Verify the resulting public page in the browser, then follow the existing Sites deployment and GitHub backup workflow.

Do not apply the browser's local draft or the QA export as a confirmed user layout. No automatic live-page apply button exists.

## Validation on 2026-10-16

- `node --check dist/editor.js` and `node --check dist/layout-model.mjs` passed.
- `node --test tests/layout-model.test.mjs`: all four tests passed (initial composition fidelity, independent layout round-trip, layer boundaries, invalid-import rejection).
- Browser at 1280 × 720: all 15 images loaded; no horizontal overflow or console errors. Dragging, proportional resize, layer-to-front, numeric inputs, undo/redo, page refresh draft recovery and static preview verified.
- Browser at 390 × 844: all 15 images loaded; document width 390 px with no horizontal overflow. Mobile canvas and stacked editor panels visually checked.
- A JSON file downloaded through the editor was selected through its import picker and restored the edited desktop coordinates, dimensions and front layer. The exported data also retained the separate mobile change.
- Test edits were reset through the UI. Existing public `index.html`, `style.css`, `app.js`, `collection.js` and all PNGs are unchanged.
- Screenshots: `docs/screenshots/layout-editor-desktop.png` and `layout-editor-mobile.png`.
