# Temu Affiliate cloud-browser onboarding (iPhone)

**Status:** configuration prepared; no Browserbase project, API key, browser session, or login link has been provisioned.

## Proposed service
Browserbase cloud browser + Playwright/Stagehand. Browserbase supports remote browser sessions and a live debug view. Google OAuth inside an automated browser may be blocked, require extra verification, or violate a provider's restrictions; do not bypass security checks. Check Temu Affiliate's automation rules before enabling any extraction.

## Owner steps from iPhone
1. Create a Browserbase account at https://www.browserbase.com/ and a project.
2. Generate a project API key and project ID. **Do not paste keys, passwords, OTPs, cookies, session IDs, or Google credentials in ChatGPT or GitHub source files.**
3. Add `BROWSERBASE_API_KEY` and `BROWSERBASE_PROJECT_ID` as GitHub Actions secrets only when a safe interactive onboarding mechanism is deployed. A GitHub secret alone cannot create a persistent Google login.
4. Developer creates an authenticated, expiring, owner-only session-link flow and encrypted session persistence, with access limited to reading affiliate products. Never expose the Browserbase debug URL publicly or save it in CI logs.
5. Open the owner-only link on iPhone, sign in yourself, and complete any Google security prompts. Test whether Temu allows read-only access.
6. Connect a permitted affiliate feed/API if browser automation is restricted; this is the preferred fallback.

## Security gates
- No passwords, cookies or tokens in repository or logs.
- No changes to affiliate account settings, payments, or withdrawals.
- No Google anti-bot / CAPTCHA bypass.
- No product or commission claims without verification.
- No public website deployment until explicit approval.
- Deduplicate by stable product ID across all prior days.
- Target production schedule: 15:00 UAE (11:00 UTC), three previously unpublished products daily, each with a 15-second clearly AI-generated model demonstration.
- Pause and request owner intervention if authentication expires.

## Missing services
- Browserbase account/project and billing approval, if required.
- Confirmation of permitted Temu data access.
- Secure mobile interactive-login service and encrypted session persistence.
- Approved video-generation provider and durable asset storage.
- Publisher and end-to-end validation.
