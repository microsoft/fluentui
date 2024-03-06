import { render } from 'react-dom';
import { createElement } from 'react';
import { App } from './app';

main();

function main() {
  const root = document.getElementById('root');

  render(createElement(App), root);
}
