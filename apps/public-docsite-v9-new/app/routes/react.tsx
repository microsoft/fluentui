import { useParams } from 'react-router';

import { DocsTreeRoute } from '../components/docs-tree-route';
import { reactSource } from '../source';

export default function ReactDocs() {
  const params = useParams();

  return <DocsTreeRoute source={reactSource} splat={params['*']} title="Fluent UI React v9" />;
}
