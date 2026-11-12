import * as React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { RendererProvider, createDOMRenderer, renderToStyleElements } from '@griffel/react';
import { SSRParityApp } from './SSRParityApp';
import type { SSRScenario } from './SSRParityApp';

export type SSRResult = { html: string; styles: string };

/**
 * Server rendering in a worker: no `window`/`document`, so Griffel, FluentProvider and Fluent CSS Modules registration
 * run their server code paths, while class names come from the same bundle as the hydrating client.
 */
const worker = globalThis as unknown as {
  onmessage: (event: { data: { scenario: SSRScenario } }) => void;
  postMessage: (result: SSRResult) => void;
};

worker.onmessage = ({ data: { scenario } }) => {
  const renderer = createDOMRenderer(undefined);
  const html = renderToString(
    <RendererProvider renderer={renderer}>
      <SSRParityApp scenario={scenario} />
    </RendererProvider>,
  );
  const styles = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>);
  worker.postMessage({ html, styles });
};
