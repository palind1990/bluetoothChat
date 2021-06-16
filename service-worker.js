const Qr_generator = "Qr-generator";
const assets = [
  "/",
  "/index.html",
  "css/styles.css",
  "/scripts/app.js",
];

self.addEventListener("install", (installEvent) => {
    installEvent.waitUntil(
      caches.open(Qr_generator).then(cache => {
        cache.addAll(assets);
      })
    );
  });
  
  self.addEventListener("fetch", (fetchEvent) => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then((res) => {
        return res || fetch(fetchEvent.request);
      })
    );
  });