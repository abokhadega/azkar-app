const CACHE_NAME = 'azkar-cache-v9';
const urlsToCache = [
  './index.html',
  './manifest.json',
  './azkar_obj.json',
  './icon-192x192.png',
  './icon-512x512.png',
  './icon-512x512-maskable.png',
  'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في الكاش (بدون إنترنت)، قم بإرجاعه
        if (response) {
          return response; 
        }
        // إذا لم يجده، قم بجلبه من الإنترنت
        return fetch(event.request);
      })
  );
});

// دالة لمسح الكاش القديم عند تحديث رقم الإصدار
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
