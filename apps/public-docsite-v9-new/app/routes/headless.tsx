import { useParams } from 'react-router';

import { DocsTreeRoute } from '../components/docs-tree-route';
import { headlessSource } from '../lib/source';

export default function HeadlessDocs() {
  const params = useParams();

  return <DocsTreeRoute source={headlessSource} splat={params['*']} title="Fluent UI Headless" />;
}
