// Read-only credential test: creates no browser session and logs no secrets.
const apiKey = process.env.BROWSERBASE_API_KEY;
const projectId = process.env.BROWSERBASE_PROJECT_ID;
if (!apiKey || !projectId) {
  console.error('Missing BROWSERBASE_API_KEY or BROWSERBASE_PROJECT_ID');
  process.exit(1);
}
try {
  const res = await fetch('https://api.browserbase.com/v1/projects', {
    headers: { 'X-BB-API-Key': apiKey, 'Accept': 'application/json' },
    signal: AbortSignal.timeout(15000)
  });
  if (!res.ok) {
    console.error('Browserbase connection failed. HTTP status:', res.status);
    process.exit(1);
  }
  // Do not print the API response or account identifiers.
  console.log('Browserbase API authentication succeeded. Configured project ID present:', Boolean(projectId));
} catch (e) {
  console.error('Browserbase connection could not be verified:', e.name);
  process.exit(1);
}
