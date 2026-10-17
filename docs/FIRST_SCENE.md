# First scene: 有些碎片

The website opens with the supplied black title card at `/`. Clicking anywhere, or activating the invisible full-screen link with the keyboard, fades to `/city-demo`, the Vancouver / Kaohsiung page. No visible copy has been added.

`dist/fragments.html` preserves the supplied glyphs, English typography, embedded Chinese font, coordinates and initial fade. Its Latin font is self-hosted with the SIL OFL license in `dist/assets/`. Reduced motion skips animation. Browser Back restores a clickable card.

The city page retains its landscape hover expansion, narrow glass seam, 44px return edge and live clocks. Its controls only expand or restore the city views; they do not navigate back to the title card.

Run `node scripts/build-landing.mjs`: `public/index.html` is generated from the title card, while `public/city-demo.html` contains the cities. `/fragments` remains a title-card alias. Desktop scope only.

Verified live: root displays the title card; clicking enters the cities; both city photographs load; keyboard expansion and return restore split view; browser Back restores the title card. Production deployment: `dpl_BRzdZfZRV7wMMbqcXeah7fDuzayk`.
