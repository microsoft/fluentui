export function handleRedirects() {
  // handle the current URL first
  redirectUrls(window.location.hash);

  // then, if any change to hash would trigger this
  window.addEventListener('hashchange', evt => {
    redirectUrls(window.location.hash);
  });
}

function redirectUrls(hash: string) {
  // Legacy redirects
  const redirectMap = {
    '#/customizations/themes': '#/components/customizations/themes',
    '#/customizations/colors': '#/components/customizations/colors'
  };

  for (const old of Object.keys(redirectMap)) {
    if (hash === old) {
      window.location.hash = redirectMap[old];
      return;
    }
  }

  // Newer version redirects (if switching in)
  const webRegex = /\/web(?=\/|$)/;
  if (webRegex.test(hash)) {
    if (hash.indexOf('controls/web') !== -1) {
      window.location.hash = hash.replace('controls/web', 'components');
    } else {
      window.location.hash = hash.replace(webRegex, '');
    }
  }
}
