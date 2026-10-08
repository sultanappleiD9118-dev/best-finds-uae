// Staging only. Never publishes or invents commission/discount claims.
import fs from 'node:fs';
import path from 'node:path';

const dir = new URL('./output/', import.meta.url);
fs.mkdirSync(dir, { recursive: true });
const candidates = JSON.parse(fs.readFileSync(new URL('./sample-products.json', import.meta.url), 'utf8'));
function valid(p) {
  return p && typeof p.id === 'string' && typeof p.name === 'string'
    && Number.isFinite(p.priceAED) && p.priceAED > 0
    && Number.isFinite(p.commissionRate) && p.commissionRate >= 0 && p.commissionRate <= 1
    && typeof p.affiliateUrl === 'string' && /^https:\/\//.test(p.affiliateUrl)
    && p.verified === true;
}
const selected = candidates.filter(valid)
  .sort((a, b) => (b.priceAED * b.commissionRate) - (a.priceAED * a.commissionRate))
  .slice(0, 3);
const preview = {
  mode: 'staging-preview',
  generatedAt: new Date().toISOString(),
  publishEnabled: false,
  selectionRule: 'Estimated gross commission per unit; actual payout is not guaranteed',
  products: selected.map(p => ({
    ...p,
    estimatedGrossCommissionAED: +(p.priceAED * p.commissionRate).toFixed(2),
    video: { durationSeconds: 15, status: 'blocked_pending_video_provider',
      brief: 'Show an AI model demonstrating this product, with accurate product details. Do not imply real customer footage.' }
  })),
  missingIntegrations: ['Authorized Temu affiliate product/commission feed', 'AI model video generation API', 'Video storage', 'Approved affiliate tracking links']
};
fs.writeFileSync(new URL('./output/preview.json', import.meta.url), JSON.stringify(preview, null, 2));
console.log('Staging preview created:', selected.length, 'verified candidates. No site changes made.');
