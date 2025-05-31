const CACHE_NAME = 'dnd-chat-v1';
const ASSETS_TO_CACHE = [
  '/customchat/index.html',
  '/customchat/manifest.json',
  '/customchat/favicon.ico'
];

// Install Service Worker & Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch Cached Files (Offline Support)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});