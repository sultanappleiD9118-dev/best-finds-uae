// Staging-only session service. DO NOT deploy publicly without HTTPS,
// strong owner authentication, rate limits, encrypted persistence and a
// verified Browserbase session-sharing/login workflow.
// No Temu or Google credentials are accepted or stored here.
import http from 'node:http';
import crypto from 'node:crypto';
const port = Number(process.env.PORT || 8787);
const ownerToken = process.env.OWNER_ACCESS_TOKEN;
const bbKey = process.env.BROWSERBASE_API_KEY;
const projectId = process.env.BROWSERBASE_PROJECT_ID;
if (!ownerToken || ownerToken.length < 32 || !bbKey || !projectId) {
  throw Error('Missing OWNER_ACCESS_TOKEN (32+ chars), BROWSERBASE_API_KEY or BROWSERBASE_PROJECT_ID');
}
const server = http.createServer(async (req,res)=>{
  const auth = req.headers.authorization || '';
  const expected = 'Bearer '+ownerToken;
  const ok = auth.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(auth),Buffer.from(expected));
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Type','application/json');
  if (!ok) {res.writeHead(401);res.end(JSON.stringify({error:'Unauthorized'}));return;}
  if (req.method !== 'POST' || req.url !== '/sessions') {
    res.writeHead(404);res.end(JSON.stringify({error:'Not found'}));return;
  }
  try {
    const upstream=await fetch('https://api.browserbase.com/v1/sessions',{
      method:'POST',
      headers:{'X-BB-API-Key':bbKey,'Content-Type':'application/json'},
      body:JSON.stringify({projectId}),
      signal:AbortSignal.timeout(20000)
    });
    if(!upstream.ok){res.writeHead(502);res.end(JSON.stringify({error:'Browser service unavailable',status:upstream.status}));return;}
    const data=await upstream.json();
    // Session ID is confidential and is only returned to the authenticated owner.
    res.writeHead(201);res.end(JSON.stringify({sessionId:data.id,status:'created',next:'Owner-only live-view onboarding not configured'}));
  } catch {
    res.writeHead(502);res.end(JSON.stringify({error:'Unable to create session'}));
  }
});
server.listen(port,'127.0.0.1',()=>console.log('Staging session service listening on localhost only'));
