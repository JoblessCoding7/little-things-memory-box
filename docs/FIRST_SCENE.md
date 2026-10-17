# First scene: 有些碎片

Source supplied by the user: `/Users/sorry7/Desktop/水煮蛋/有些碎片.html`.

The original black 16:9 title card, four split Chinese glyphs, English text, coordinates, embedded Chinese font, colors and fade-in are preserved in `dist/fragments.html`. The Cormorant Garamond 500 Latin font is now self-hosted, with its SIL OFL license in `dist/assets/`. Reduced-motion preference shows the card immediately.

From the dual-city landing page, clicking either city fades through black for 650ms and navigates to `fragments.html`. Hover retains the existing landscape-only slide. Clicking or hovering the return sliver restores the split. Pointer drags do not trigger navigation. Browser Back restores a usable split view rather than keeping the fade overlay. The card holds; no later scene or added visible text has been invented.

Verification: both city links enter the card; browser Back clears the overlay; both original font families load; the 16:9 frame fits 1280x720 with no horizontal overflow. Source lint has zero failures; the existing requested glass seam and clock-padding warnings remain. Desktop scope only.

The build script includes this new page and its local font/license in `public/`. A ready-to-upload ZIP is stored in the current task's artifact directory as `yichen0606-first-scene.zip`.
