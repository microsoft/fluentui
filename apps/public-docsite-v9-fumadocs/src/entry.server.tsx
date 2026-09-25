import { RendererProvider, createDOMRenderer, renderToStyleElements } from '@griffel/react';
import { renderToStaticMarkup } from 'react-dom/server';
import { prerender } from 'react-dom/static';
import { ServerRouter } from 'react-router';
import type { EntryContext } from 'react-router';

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

  const html = markup.includes('</head>') ? markup.replace('</head>', `${styles}</head>`) : `${styles}${markup}`;

  responseHeaders.set('Content-Type', 'text/html');

  return new Response(html, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
