//const CACHE_NAME = 'dnd-chat-v1';
//const ASSETS_TO_CACHE = [
//  '/customchat/index.html',
//  '/customchat/manifest.json',
//  '/customchat/favicon.ico'
//];
//
//// Install Service Worker & Cache Files
//self.addEventListener("install", (event) => {
//  event.waitUntil(
//    caches.open(CACHE_NAME)
//      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
//  );
//});
//
//// Fetch Cached Files (Offline Support)
//self.addEventListener("fetch", (event) => {
//  event.respondWith(
//    caches.match(event.request)
//      .then((response) => response || fetch(event.request))
//  );
//});






const CACHE_NAME = 'dnd-chat-v2';
const ASSETS_TO_CACHE = [
  '/customchat/',
  '/customchat/index.html',
  '/customchat/manifest.json',
  '/customchat/favicon.ico',
  '/customchat/icon-192x192.png',
  '/customchat/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (!(event.request.url.indexOf('http') === 0)) return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
          // Only cache GET requests and successful responses
          if (event.request.method === 'GET' && fetchResponse.status === 200) {
            const responseToCache = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return fetchResponse;
        });
      })
  );
});