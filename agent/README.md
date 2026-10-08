# Best Finds UAE — Daily AI Agent (staging)

This branch is isolated from `main`. No live product pages, affiliate links, or video assets are published.

## Schedule
The workflow targets **15:00 Asia/Dubai**, which is **11:00 UTC** year-round. GitHub Actions scheduled workflows can start late or occasionally be skipped; use an external scheduler if exact timing is essential. The workflow also supports manual runs.

## Current behavior
`node agent/run.mjs` creates `agent/output/preview.json` from `agent/sample-products.json`. The sample list is empty on purpose. A candidate must be explicitly verified and contain an HTTPS affiliate URL, product price, and commission rate. Up to three products are ranked by estimated gross commission per unit. No real Temu products, commission figures, discounts, or tracking links are fabricated. The preview is uploaded as a workflow artifact, not deployed.

## Required production integrations
1. **Temu Affiliate authorized product source** with current UAE pricing, product availability, commission terms and valid account-specific affiliate URLs. Confirm API/feed/export access with Temu.
2. **AI video provider** that supports a 15-second product demonstration featuring synthetic models, product reference imagery, rights/usage approval, asynchronous rendering and webhook/job polling. Add disclosure for AI-generated demonstrations.
3. **Durable video/image storage** (e.g., Vercel Blob or S3), with public URLs.
4. **Secret management** via GitHub Actions secrets or backend environment variables. Never commit API keys.
5. **Publisher** to generate bilingual product data and pages, safely update the existing static index, and deploy only after validation. Keep a deduplication ledger and rollback capability.

## Next steps
Connect the approved Temu data source and video provider, then add a staged preview page and end-to-end tests. Enable production publishing only after reviewing successful staging outputs.
