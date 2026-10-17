# Vercel deployment

Live website: https://yichen0606.vercel.app/

Project dashboard: https://vercel.com/joblesscoding7s-projects/yichen0606

Account/team: joblesscoding7 / joblesscoding7s-projects (Hobby).

Published successfully on 2026-10-17 using Vercel Drop to Deploy, uploading the generated `public/` folder (5 files, 1.7 MB). The current homepage is the Vancouver / Kaohsiung landing page. The allocated production domain is exactly `yichen0606.vercel.app`.

Deployment URL: https://yichen0606-kuwnpnky0-joblesscoding7s-projects.vercel.app/

## Build and future updates

Run `node scripts/build-landing.mjs` to recreate `public/`. It copies `dist/city-demo.html` as the homepage plus its CSS, JS and two enhanced city photographs. No environment variables or database are required.

This Vercel project was deployed by direct upload. The private GitHub repository is the source backup and is not currently connected for automatic Vercel deployments. Pushing GitHub alone will not update this website. Publish a new upload/deployment to the existing project, or connect the repository when that workflow is authorized.

`vercel.json` prepares optional future Git/CLI deployment: Other framework, build command `node scripts/build-landing.mjs`, output `public/`. Its `/city-demo` rewrite applies when deploying with this repository configuration; the initial direct upload serves the landing page at `/`.

`public/` and `.vercel/` are local generated state and ignored by Git. The pre-existing Sites identity remains separate.
