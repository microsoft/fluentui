import { RendererProvider, createDOMRenderer, renderToStyleElements } from '@griffel/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { prerender } from 'react-dom/static';
import { ServerRouter, type EntryContext } from 'react-router';

/**
 * Custom server entry (design D8, D9).
 *
 * Two things this must do that the default streaming entry cannot:
 *
 * 1. Griffel collects style rules *during* render, so the markup has to be produced first
 *    and the collected `<style>` elements injected into `<head>` afterwards. Without this,
 *    prerendered pages ship `fui-*` class names with no rules behind them.
 * 2. Page content is loaded lazily (see `source.config.ts` — `async: true`), so rendering
 *    suspends. `prerender` from `react-dom/static` waits for every suspended boundary to
 *    settle, whereas `renderToString` would emit fallbacks instead of content.
 */
export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
): Promise<Response> {
  const renderer = createDOMRenderer();

  const { prelude } = await prerender(
    <RendererProvider renderer={renderer}>
      <ServerRouter context={routerContext} url={request.url} />
    </RendererProvider>,
  );

  const markup = await new Response(prelude).text();
  const styles = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>);

  // Append just before </head> so the rules land after the stylesheet links.
  const html = markup.includes('</head>') ? markup.replace('</head>', `${styles}</head>`) : `${styles}${markup}`;

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(html, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
