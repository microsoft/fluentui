import { IRedirect } from './SiteDefinition.types';

/**
 * If the hash contains any of the given object's keys, replace that segment of the hash with the
 * given value and redirect.
 */
export function handleRedirects(redirects?: IRedirect[]) {
  if (!redirects) {
    return;
  }

  // handle the current URL first
  redirectLegacyUrls(redirects, window.location.hash);

  // then, if any change to hash would trigger this
  window.addEventListener('hashchange', () => {
    redirectLegacyUrls(redirects, window.location.hash);
  });
}

function redirectLegacyUrls(redirects: IRedirect[], hash: string) {
  for (const { from, to } of redirects) {
    const isMatch = typeof from === 'string' ? hash.indexOf(from) !== -1 : from.test(hash);
    if (isMatch) {
      window.location.hash = hash.replace(from, to);
      break;
    }
  }
}
