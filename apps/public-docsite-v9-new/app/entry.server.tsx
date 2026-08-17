import { RendererProvider, createDOMRenderer, renderToStyleElements } from '@griffel/react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import { ServerRouter, type EntryContext } from 'react-router';

/**
 * Custom server entry so Griffel styles are present in the prerendered HTML (design D8).
 *
 * Without this, prerendered pages ship the `fui-*` class names but none of the rules that
 * define them: examples render unstyled until hydration, then snap into place. Griffel
 * collects rules into a renderer during render, so the markup has to be produced first and
 * the collected `<style>` elements injected into `<head>` afterwards — which rules out the
 * default streaming entry.
 */
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Response {
  const renderer = createDOMRenderer();

  const markup = renderToString(
    <RendererProvider renderer={renderer}>
      <ServerRouter context={routerContext} url={request.url} />
    </RendererProvider>,
  );

  const styles = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>);

  // `renderToString` always emits a single <head>; append just before it closes so the
  // rules land after the stylesheet links and can still be overridden by them if needed.
  const html = markup.includes('</head>') ? markup.replace('</head>', `${styles}</head>`) : `${styles}${markup}`;

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(`<!DOCTYPE html>${html}`, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
