# Vercel deployment

Live website: https://yichen0606.vercel.app/

Flow: title card → click → Vancouver / Kaohsiung at `/city-demo`.

Dashboard: https://vercel.com/joblesscoding7s-projects/yichen0606

Build: `node scripts/build-landing.mjs`, output `public/`, static site with local images and fonts. No database or environment variables are required by the website.

The checkout is linked to project `prj_ZFTqmGhFF7lD7CzrWtRj1OitNKt8`, team `team_bj6CH121A0AZ5l3EFt8ZJ9lw`. Verify these IDs before publishing. Use the existing authenticated official CLI:

`npx --yes --cache /private/tmp/yichen-vercel-cli-cache vercel@64.5.0 deploy --prod --yes --scope joblesscoding7s-projects`

GitHub is a private source backup and is not connected for automatic deployments. `public/`, `.vercel/` and `.env.local` are ignored local state. Never commit credentials or print the environment file.
