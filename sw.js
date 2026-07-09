// CACHE_NAME muss bei jedem Release mit APP_VERSION in index.html mitgezogen werden -
// nur ein geänderter String hier lässt den Browser die neue sw.js erkennen, den alten
// Cache verwerfen und die App-Shell-Dateien frisch nachladen (siehe CLAUDE.md "Versionierung").
const CACHE_NAME = "fretze-v1.16.0";
const APP_SHELL = [
  "./",
  "./index.html",
  "./howto.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./logo-mark-dark.png",
  "./logo-mark-sepia.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first, damit die App auch ohne Netz im Gym startet
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => cached);
    })
  );
});
