import * as React from 'react';

const button = document.getElementById('storybook-load');
if (!button) {
  throw new Error('Storybook fixture button is missing.');
}
button.textContent = `React ${React.version}`;
button.addEventListener('click', async () => {
  const { compressToBase64 } = await import(/* webpackChunkName: "playground-module-2" */ 'lz-string');
  button.dataset.value = compressToBase64('native runtime');
  button.textContent = 'Native runtime ready';
});
