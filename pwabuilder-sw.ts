import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
// import { precacheAndRoute } from 'workbox-precaching';

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com' ||
    url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({}),
);

registerRoute(
  ({ url }) => url.href.includes("@microsoft/fast-components"),
  new CacheFirst(),
);

registerRoute(
  ({ url }) => url.href.includes("@pwabuilder"),
  new CacheFirst(),
);

registerRoute(
  ({ url }) => url.href.includes('atlas.microsoft.com'),
  new StaleWhileRevalidate({
    cacheName: 'offline-data',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 19 * 60, // 5 minutes
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// @ts-ignore
precacheAndRoute(self.__WB_MANIFEST);