# Vancouver / Kaohsiung demo

Separate preview route: `/city-demo.html`. The current home page and editor are preserved.

Direction: user-approved Frostbound reference, adapted into a two-city photographic curtain. No random direction draw: this is one explicitly art-directed opening section. User constraints override generic image-count, extra-copy and navigation requirements.

Subject inventory: Vancouver inlet, cold blue mountains, urban lights, Kaohsiung harbour, warm cloud light, 85 Sky Tower, user's two photographs, simultaneous local clocks, 15-hour difference, approved floating objects revealed behind the photographs.

Argument: both cities occupy the same instant; the user's photographs and simultaneous clocks provide the proof. The two curtain links open the existing photographic collection.

Copy deck: Vancouver; Kaohsiung; local HH:mm:ss; 15 小时. No other visible hero copy. Mobile uses vertically stacked photos to retain recognizable city views, with the same left/right curtain exit.

Assets: user supplied 高雄.jpg and 温哥华.jpg, copied byte-for-byte to city-kaohsiung.jpg and city-vancouver.jpg. No AI retouching or fabricated photos. CSS gently reduces saturation and adds neutral text scrims.

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
