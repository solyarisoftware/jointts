```
$ npm install google-tts-api
npm notice created a lockfile as package-lock.json. You should commit this file.
+ google-tts-api@0.0.4
added 8 packages from 7 contributors and audited 8 packages in 1.69s
found 1 low severity vulnerability
  run `npm audit fix` to fix them, or `npm audit` for details
$ npm audit

                       === npm audit security report ===

┌──────────────────────────────────────────────────────────────────────────────┐
│                                Manual Review                                 │
│            Some vulnerabilities require your attention to resolve            │
│                                                                              │
│         Visit https://go.npm.me/audit-guide for additional guidance          │
└──────────────────────────────────────────────────────────────────────────────┘
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ Low           │ Denial of Service                                            │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ node-fetch                                                   │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=2.6.1 <3.0.0-beta.1|| >= 3.0.0-beta.9                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ google-tts-api                                               │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ google-tts-api > isomorphic-fetch > node-fetch               │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://npmjs.com/advisories/1556                            │
└───────────────┴──────────────────────────────────────────────────────────────┘
found 1 low severity vulnerability in 8 scanned packages
  1 vulnerability requires manual review. See the full report for details.
$ npm audit fix
up to date in 0.188s
fixed 0 of 1 vulnerability in 8 scanned packages
  1 vulnerability required manual review and could not be updated

```
