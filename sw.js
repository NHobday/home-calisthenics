const CACHE='calisthenics-v2-1';
const CORE=['./','./index.html','./manifest.webmanifest','./exercises.json','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(CORE);self.skipWaiting()})())});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim()})())});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith((async()=>{const c=await caches.open(CACHE);const hit=await c.match(e.request);if(hit)return hit;try{const response=await fetch(e.request);if(response.ok&&new URL(e.request.url).origin===location.origin)c.put(e.request,response.clone());return response}catch{return hit||Response.error()}})())});
