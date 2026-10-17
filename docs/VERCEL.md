# Vercel deployment

Requested project name / preferred free address: `yichen0606` / `yichen0606.vercel.app`. Availability and deployment must be confirmed in Vercel.

The current production homepage is the Vancouver / Kaohsiung landing page. Build with `node scripts/build-landing.mjs`. `vercel.json` selects the Other framework preset and publishes `public/`. The build copies the landing HTML, its CSS/JS and the two enhanced photographs; later first-page content can be added through the same build.

Connect this private GitHub repository to the Vercel project and use `main` as its production branch. No environment variables, database, paid plan, install step or framework dependency is required. `/city-demo` also resolves to the homepage.

`public/` and `.vercel/` are local generated state and ignored by Git. The pre-existing Sites source identity stays separate from Vercel.
