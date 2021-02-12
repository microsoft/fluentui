import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Renders a component with `ReactDOM.render()` and safely cleans it up.
 *
 * @param content - JSX content to test.
 * @param callback - Function callback which receives the host element and a callback for re-rendering.
 * @param attach - If true, attach the host element to `document.body`. This is primarily for tests
 * involving event handlers.
 */
export function safeRender(
  content: React.ReactElement,
  callback: (host: HTMLDivElement, reRender: (content: React.ReactElement) => void) => void,
  attach?: boolean,
): void {
  const host = document.createElement('div');
  if (attach) {
    document.body.appendChild(host);
  }

  const reRender = (newContent: React.ReactElement) => {
    ReactDOM.render(newContent, host);
  };
  reRender(content);

  try {
    callback(host, reRender);
  } finally {
    try {
      ReactDOM.unmountComponentAtNode(host);
    } catch {
      // ignore
    }
    if (attach) {
      document.body.removeChild(host);
    }
  }
}
