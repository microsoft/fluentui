export function handleRedirects() {
  // handle the current URL first
  redirectLegacyUrls(window.location.hash);

  // then, if any change to hash would trigger this
  window.addEventListener('hashchange', evt => {
    redirectLegacyUrls(window.location.hash);
  });
}

function redirectLegacyUrls(hash: string) {
  const redirectMap = {
    '#/customizations/themes': '#/components/customizations/themes',
    '#/customizations/colors': '#/components/customizations/colors',
    '#/examples/announced/quickactions': '#/components/announced/quickactions',
    '#/examples/announced/searchresults': '#/components/announced/searchresults',
    '#/examples/announced/lazyloading': '#/components/announced/lazyloading',
    '#/examples/announced/bulkoperations': '#/components/announced/bulkoperations',
    '#/components/ComboBox': '#/components/combobox',
    '#/components/ComboBox#Overview': '#/components/combobox#Overview',
    '#/components/ComboBox#BestPractices': '#/components/combobox#BestPractices',
    '#/components/ComboBox#Variants': '#/components/combobox#Variants',
    '#/components/ComboBox#Implementation': '#/components/combobox#Implementation',
    '#/components/Calendar': '#/components/calendar',
    '#/components/Calendar#Overview': '#/components/calendar#Overview',
    '#/components/Calendar#BestPractices': '#/components/calendar#BestPractices',
    '#/components/Calendar#Variants': '#/components/calendar#Variants',
    '#/components/Calendar#Implementation': '#/components/calendar#Implementation'
  };

  Object.keys(redirectMap).forEach(old => {
    if (hash === old) {
      window.location.hash = redirectMap[old];
    }
  });
}
