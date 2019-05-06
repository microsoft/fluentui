/**
 * If the hash contains any of the given object's keys, replace that segment of the hash with the
 * given value and redirect.
 */
export function handleRedirects(redirectMap?: { [from: string]: string }) {
  if (!redirectMap) {
    return;
  }

  // handle the current URL first
  redirectLegacyUrls(redirectMap, window.location.hash);

  // then, if any change to hash would trigger this
  window.addEventListener('hashchange', () => {
    redirectLegacyUrls(redirectMap, window.location.hash);
  });
}

function redirectLegacyUrls(redirectMap: { [from: string]: string }, hash: string) {
  for (const from of Object.keys(redirectMap)) {
    if (hash.indexOf(from) !== -1) {
      window.location.hash = hash.replace(from, redirectMap[from]);
      break;
    }
  }
}
