import { JSONTreeElement } from '../components/types';

export const focusTreeTitle = uuid => {
  // TODO: use refs
  const element = document.querySelector(`#${uuid} [data-is-focusable]`) as HTMLElement;
  element && element.focus();
};

export function debug(...args) {
  console.log('--Designer', ...args);
}

export function getDefaultJSONTree(): JSONTreeElement {
  return { uuid: 'builder-root', type: 'div' };
}
