import { useParams } from 'react-router';

/*
 * The headless examples are styled with CSS Modules that reference design tokens defined in
 * the stories package. Storybook loads this globally from its preview; the site scopes it to
 * this route so the tokens do not leak into the styled (/docs/react) tree.
 */
import '@fluentui/react-headless-components-preview-stories/.storybook/tokens.css';

import { DocsTreeRoute } from '../components/docs-tree-route';
import { headlessSource } from '../source';

export default function HeadlessDocs() {
  const params = useParams();

  return <DocsTreeRoute source={headlessSource} splat={params['*']} title="Fluent UI Headless" />;
}
