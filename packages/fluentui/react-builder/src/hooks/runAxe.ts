import * as axeCore from 'axe-core';

export async function runAxe() {
  return await axeCore.run(document.getElementsByTagName('iframe')[0], {
    rules: {
      // excluding rules which are related to the whole page not to components
      'page-has-heading-one': { enabled: false },
      region: { enabled: false },
      'landmark-one-main': { enabled: false },
    },
  });
}
