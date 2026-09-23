import { fileURLToPath } from 'node:url';

import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { createFluentTypeTableGenerator } from './mdx-plugins/fluent-type-table';
import { remarkComponentApi } from './mdx-plugins/remark-component-api';
import { remarkFluentMarkdown, stringifyFluent } from './mdx-plugins/remark-fluent-markdown';

const postprocess = {
  includeProcessedMarkdown: { mdxAsPlaceholder: ['ComponentPage', 'SectionOverview'], stringify: stringifyFluent },
};

const generator = createFluentTypeTableGenerator({
  tsconfigPath: fileURLToPath(new URL('./tsconfig.docgen.json', import.meta.url)),
});

export const react = defineDocs({
  dir: 'content/react',
  docs: { async: true, postprocess },
});

export const headless = defineDocs({
  dir: 'content/headless',
  docs: { async: true, postprocess },
});

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: { persist: { id: 'package-manager' } },
    remarkPlugins: plugins => [...plugins, [remarkComponentApi, { generator }], remarkFluentMarkdown],
  },
});
