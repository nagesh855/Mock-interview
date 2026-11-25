/* ============================================================
   AI MOCK INTERVIEW PRACTICE - SERVICE WORKER
   Offline-First Application Shell & Static Asset Caching
   Version: ai-mock-interview-v1
   ============================================================ */

const CACHE_NAME = 'ai-mock-interview-v1';

// Essential application shell assets to precache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/favicon.svg',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/offline.html'
];

// Install Event: cache application shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.warn('[ServiceWorker] Precache failed:', error);
      })
  );
});

// Activate Event: clean up obsolete cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
            return null;
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch Event: secure offline-first routing
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Rule 1: Only handle HTTP/HTTPS GET requests
  if (request.method !== 'GET') {
    return;
  }

  const url = new URL(request.url);

  // Rule 2: Only intercept same-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Rule 3: NEVER cache authentication endpoints, user tokens, or private backend APIs
  if (
    url.pathname.startsWith('/api/') ||
    url.pathname.includes('/auth') ||
    url.pathname.includes('/login') ||
    url.pathname.includes('/register') ||
    url.pathname.includes('/token')
  ) {
    return;
  }

  // Strategy A: HTML Page Navigation (Network First with Cache Fallback)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cached index.html (SPA shell handles offline state) or offline.html
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return caches.match('/index.html')
                .then((spaIndex) => {
                  if (spaIndex) return spaIndex;
                  return caches.match('/offline.html');
                });
            });
        })
    );
    return;
  }

  // Strategy B: Static Assets (Stale-While-Revalidate)
  // JS, CSS, Web Manifest, Images, SVGs, Fonts
  const isStaticAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.webmanifest') ||
    url.pathname.endsWith('.woff2');

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => {
            // Return cached response if network fails
            return cachedResponse;
          });

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default: Network with Cache Fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});
