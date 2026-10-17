# Vancouver / Kaohsiung demo

Separate preview route: `/city-demo.html`. The current home page and editor are preserved.

Direction: user-approved Frostbound reference, adapted into a two-city photographic curtain. No random direction draw: this is one explicitly art-directed opening section. User constraints override generic image-count, extra-copy and navigation requirements.

Subject inventory: Vancouver inlet, cold blue mountains, urban lights, Kaohsiung harbour, warm cloud light, 85 Sky Tower, user's two photographs, simultaneous local clocks, 15-hour difference, approved floating objects revealed behind the photographs.

Argument: both cities occupy the same instant; the user's photographs and simultaneous clocks provide the proof. The two curtain links open the existing photographic collection.

Copy deck: Vancouver / 温哥华; Kaohsiung / 高雄; local HH:mm:ss; 15 小时. No other visible hero copy. Portrait phone and tablet layouts use vertically stacked photos to retain recognizable city views, with the same left/right curtain exit.

Assets: user supplied 高雄.jpg and 温哥华.jpg, copied byte-for-byte to city-kaohsiung.jpg and city-vancouver.jpg. No AI retouching or fabricated photos. CSS reduces saturation and adds neutral text scrims. The 2026-10-17 revision uses a cool flat sky surround above the Vancouver photo, a soft alpha blend into the original sky, and two precisely co-registered copies of each photo separated by live HTML type. CSS polygon masks follow the original mountains and Kaohsiung tower; no raster asset or skyline was regenerated.

Time policy: Vancouver UTC-7 year-round as of March 2026, Kaohsiung UTC+8. Use explicit offsets to avoid older browser IANA data switching Vancouver back in November. Official source: https://news.gov.bc.ca/releases/2026CITZ0009-001073

Motion: independent 31s and 37s photographic drift; 1.45s outward curtain; real existing object drift after entry. Reduced-motion preference skips both hero drift and curtain travel. Normal links provide navigation when the enhancement is unavailable.

## Review and validation

ROUND 1
Seen in one second: two real cities, cool Vancouver and warm Kaohsiung.
Idea: simultaneous local clocks join the user's two city photographs before opening the personal collection.
Live thing: real clocks and a clickable photographic curtain.
Layout: hero=full-bleed split, phone=stacked / collection=irregular overlapping objects.
Scores: design 8 · usability 8 · creativity 7 · content 9 → overall 7.9.
Top fixes: retain Kaohsiung tower in narrow crops; move phone time-difference label away from the seam. Both fixed.
User constraints take precedence over the generic four-image floor: exactly two supplied photos in this opening, with fifteen approved objects behind.

Syntax check passed. Taste source lint: zero failures, one expected clock zero-padding warning. Neutral photo scrims explicitly use the skill's allowed exception. Browser inspection used CUA rather than the external browser inspector, as required by the environment. Desktop, tablet and phone views inspected; no horizontal overflow. Both cities enter the 15-object collection; home returns to the dual-city opener. Reduced-motion fallback is present in source; OS preference was not emulated.


## 2026-10-17 depth typography revision

The user supplied a Frostbound screenshot and explicitly requested its large, very light title partially behind the landscape. This replaces the prior corner titles and large clocks. English names use uppercase Helvetica Neue at weight 100 where available, with Helvetica / Arial fallbacks; this is a visual approximation, not a verified copy of the paid reference font. Chinese city names are centered low in the frame, with 16px clocks below (14px on phones). The narrow Vancouver sky is recomposed with a CSS sky surround, preserving the original image file. The viewport-specific foreground masks use the same dimensions, position and transform as their background copies, preventing drift at the mountain edge. Both image planes and title share the slow scene motion. Portrait layouts below 900px stack, with title heights tied to image geometry.

ROUND 2
Seen in one second: city-sized English names tucked into the actual mountain and tower silhouettes.
Idea (one sentence): the two cities become landscapes that physically contain their own names, while their clocks show the same instant.
Live thing: two working local clocks and click-to-open curtains into the existing collection.
Layout words by section: hero=split photographic depth / portrait hero=stacked landscape / collection=irregular floating objects.
Scores: design 8 · usability 8 · creativity 7 · content 9 → overall 7.9.
Caps applied: user explicitly requested title occlusion, exactly two supplied photos and no added copy; these override generic skill restrictions. The sky surround is visibly simpler than the cloud-rich reference; the original photo contains almost no sky. Foreground tower intentionally obscures part of the Kaohsiung lettering; the Chinese name remains fully readable.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. Initial desktop lettering too tight: increased display tracking and matched the two title baselines.
2. Narrow tablet columns lost mountain overlap and hid too much lettering: switched portrait tablets to a stacked composition and tied title position to image dimensions.
3. Initial clocks were dominant: changed to quiet 16px / 14px clocks underneath the Chinese names, matching the requested hierarchy.

Source lint passes with only the expected clock zero-padding warning. 1440x900 desktop, 768x1024 tablet and 390x844 phone renders inspected via CUA. All photo layers loaded, clocks agree on minutes/seconds with a 15-hour difference, and no horizontal overflow was observed. Actual Helvetica Neue 100 use was read from computed browser styles. Browser-driven inspector replaced by equivalent CUA checks to follow environment rules. User photo bytes and collection/editor implementation remain unchanged.
