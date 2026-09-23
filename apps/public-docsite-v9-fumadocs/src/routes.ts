import { index, route } from '@react-router/dev/routes';
import type { RouteConfig } from '@react-router/dev/routes';
import { readdirSync } from 'node:fs';

const markdownRoutes = ['react', 'headless'].flatMap(collection =>
  readdirSync(new URL(`../content/${collection}/`, import.meta.url), { recursive: true })
    .filter((file): file is string => typeof file === 'string' && /\.mdx?$/.test(file))
    .map(file => {
      const slug = file
        .replace(/\\/g, '/')
        .replace(/\.mdx?$/, '')
        .replace(/(?:^|\/)index$/, '');
      const path = `${collection}${slug ? `/${slug}` : ''}.txt`;
      return route(path, 'routes/markdown.ts', { id: `markdown/${path}` });
    }),
);

export default [
  index('routes/home.tsx'),
  route('search-index.json', 'routes/search.ts'),
  route('llms.txt', 'routes/markdown.ts', { id: 'markdown/index' }),
  ...markdownRoutes,
  route('examples/headless/:example/*', 'routes/headless-example.tsx'),
  route('examples/:collection/:example/*', 'routes/example.tsx'),
  route('react/*', 'routes/react.tsx'),
  route('headless/*', 'routes/headless.tsx'),
] satisfies RouteConfig;
