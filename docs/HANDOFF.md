# Developer handoff

## Scope and visual intent

This is a personal visual memory collection, not the earlier Wyrd commerce project. Preserve the black background, photographic object cutouts, irregular spacing and partial overlaps. Do not add visible headings, captions, cards, marketing copy or cartoon treatments. Existing typography inside the approved images is intentional.

The site is buildless HTML/CSS/JavaScript. `dist/` is both the editable source and deployment output. No dependency installation, API keys, server functions or database are required.

## Entry points

- `dist/index.html`: five full-screen landing image compositions, icon-only navigation and the native dialog.
- `dist/collection.js`: all 15 approved objects. `src` is relative to `dist/`. `x`, `y`, `w` use a 1280-unit desktop canvas; `z` controls overlap. `m` is `[leftPercent, topAt390px, widthPercent]` for the separate mobile composition.
- `dist/app.js`: renders objects and assigns deterministic, independent X/Y/rotation amplitudes, durations and phases. Also handles `#collection`, pointer parallax, pause/resume and lightbox interactions.
- `dist/style.css`: motion keyframes, separate mobile sizing below 600px, landing placement, responsive canvas height and reduced-motion fallback.

Every landing image links to `#collection`. The home icon returns to the landing. Collection buttons open an image-only native dialog. Escape closes it and returns focus. The icon menu includes animation pause/resume.

## Asset decisions

All 15 current outputs were approved together by the user. Preserve these bytes unless a further edit is requested. The BAPE file is v3; the white sneaker is v2; the pendant is `13-orb-pendant-no-chain.png`; the Miu Miu bag is the completed silhouette. The source files and generation prompts are in `sources/`. The exact runtime inventory is in `APPROVED_ASSETS.json` and `sources/processing.json`.

The images are AI-processed cutouts rather than lossless pixel extraction. The user saw and approved the remaining color, texture, lettering and edge differences. The bag's unseen handles/base and some occluded shoe details were inferred. Do not present those as verified product geometry.

## Continuing development

1. Serve `dist/` locally using the command in the README.
2. For a new asset, retain its original under `sources/originals/`, prepare a separate candidate and obtain the user's approval before replacing it.
3. Update the selected file in `dist/assets/`, `collection.js`, any landing references, `APPROVED_ASSETS.json` and the review manifest/data together.
4. Adjust desktop and mobile positions separately. Keep unequal sizes and slight overlaps while ensuring every object can be opened.
5. Check desktop (1440), tablet (768), phone (390), image loading, horizontal overflow, image-to-collection links, lightbox, Escape, pause/resume and reduced motion. The full canvas intentionally crops some large objects at its edges.
6. Commit and push to this private GitHub repository.

JavaScript syntax checks:

```sh
node --check dist/app.js
node --check dist/collection.js
```

## Hosting

The existing Site is identified by `.openai/hosting.json`; retain that project ID and current private access. GitHub pushes are a backup/development workflow and do not automatically trigger this Sites deployment. To publish through Codex Sites, use the Sites skill to open the existing site's source repository, sync the reviewed files into that checkout, package `dist/`, then save/deploy the verified pushed commit. Obtain fresh repository credentials through the connector and keep them out of files and Git history.

For another static host, deploy only `dist/`. Do not publish `sources/`, `review/` or internal documentation as the production web root. A deployment migration or access change is a separate owner decision.

## Optional future work

- Refine any approved cutout edges if requested.
- Compress delivery copies (e.g. WebP/AVIF with alpha) after visual comparison; preserve original PNG masters. Current masters total about 20 MB.
- Revisit the final landing composition with the owner if desired.
- Add a custom domain or invite viewers only at the owner's request.
