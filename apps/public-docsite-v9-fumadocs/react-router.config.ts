import type { Config } from '@react-router/dev/config';
import { getExamplePaths } from './example-paths.config';

export default {
  appDirectory: 'src',
  ssr: false,
  basename: `${process.env.DOCSITE_BASE_PATH || '/'}docs`,
  buildDirectory: 'dist',
  /* eslint-disable @typescript-eslint/naming-convention */
  future: {
    v8_middleware: true,
    v8_splitRouteModules: true,
    v8_viteEnvironmentApi: true,
    v8_passThroughRequests: true,
    v8_trailingSlashAwareDataRequests: true,
  },
  /* eslint-enable @typescript-eslint/naming-convention */
  prerender({ getStaticPaths }) {
    const resources = getStaticPaths().filter(path => path.endsWith('.txt'));
    return [
      '/',
      '/search-index.json',
      ...resources,
      ...resources.filter(path => path !== '/llms.txt').map(path => path.slice(0, -4)),
      ...getExamplePaths(),
    ];
  },
} satisfies Config;
