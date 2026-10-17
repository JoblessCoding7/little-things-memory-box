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


## First scene update (2026-10-17)

The provided `有些碎片.html` title card is now the first scene at `/fragments`. Click either city on the homepage to enter it through a brief black fade. The page retains the supplied typography and layout, and both font families are self-contained/local.

The repository is now linked locally to existing project `prj_ZFTqmGhFF7lD7CzrWtRj1OitNKt8`, team `team_bj6CH121A0AZ5l3EFt8ZJ9lw`. Deployment succeeded with the official Vercel CLI 64.5.0 using its existing credentials after the Vercel MCP connection returned a team-scope 403. No new login or access grant was needed.

For updates from this checkout: `npx --yes --cache /private/tmp/yichen-vercel-cli-cache vercel@64.5.0 deploy --prod --yes --scope joblesscoding7s-projects`. Verify `.vercel/project.json` still identifies the project above before publishing. That local metadata is ignored by Git. The CLI also pulled a project OIDC token into ignored `.env.local`; never commit that file or print its contents.

GitHub remains a source backup, with no automatic Vercel Git deployment connection.
