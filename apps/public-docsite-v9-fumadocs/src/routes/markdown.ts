import type { LoaderFunctionArgs } from 'react-router';
import { markdownIndex, pageMarkdown } from '../markdown.server';
import { docsBasename } from '../utils/paths';

export async function loader({ url }: LoaderFunctionArgs): Promise<Response> {
  const pathname = url.pathname.replace(/\/$/, '');
  if (pathname === `${docsBasename}/llms.txt`) {
    return new Response(markdownIndex(), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const [collection, ...slugs] = pathname
    .slice(docsBasename.length + 1)
    .replace(/\.txt$/, '')
    .split('/');
  if (collection !== 'react' && collection !== 'headless') {
    throw new Response('Not found', { status: 404 });
  }
  const text = await pageMarkdown(collection, slugs);
  if (text === undefined) {
    throw new Response('Not found', { status: 404 });
  }
  return new Response(text, { headers: { 'Content-Type': 'text/markdown; charset=utf-8' } });
}
