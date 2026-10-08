# Mobile session onboarding — staged, not deployed

A localhost-only prototype is at `agent/session-service.mjs`. It can create a Browserbase session through the API but **does not** yet provide an iPhone-accessible live browser or Temu login. It is intentionally not included in the production website and does not change `main`.

Before deployment, implement:
- Private HTTPS endpoint with strong owner authentication (not a shared public URL), CSRF protection, rate limiting and expiring access.
- Browserbase live-view/debug session integration with owner-only access. Never leak debug URLs or browser session identifiers into GitHub logs or public assets.
- A secure browser context/persistence strategy approved by Temu and Google; test that Google sign-in is permitted in the environment, and allow manual re-authentication.
- Data extraction limited to Temu Affiliate products/commission details, only when authorized.
- Video provider, storage, product deduplication, staging publishing tests.

`OWNER_ACCESS_TOKEN`, `BROWSERBASE_API_KEY`, and `BROWSERBASE_PROJECT_ID` are server environment variables. Do not commit any credentials.

**Do not deploy this prototype directly to the internet.** It has no frontend and no persistent authentication/session management. Browserbase Free plan may impose short sessions; do not assume an authenticated browser can remain open continuously.
