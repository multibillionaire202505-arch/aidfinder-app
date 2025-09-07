// super-tiny cache: HTML/network-first, static assets/cache-first
const VERSION = "aidfinder-v1";
const ASSETS = ["/", "/logo.png", "/manifest.json"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;

  // HTML: network first
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      }).catch(() => caches.match(req).then(r => r || caches.match("/")))
    );
    return;
  }

  // others: cache first
  e.respondWith(
    caches.match(req).then((hit) => {
      return hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      });
    })
  );
});
