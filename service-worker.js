const CACHE_NAME = 'prosa-e-ponteado-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  // Add other static assets here if needed, like CSS or key images.
  // The build process might automate this in a real setup.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
