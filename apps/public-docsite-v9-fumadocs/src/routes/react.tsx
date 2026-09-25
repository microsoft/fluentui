'use client';

import { useParams } from 'react-router';
import type * as React from 'react';

import { DocsTreeRoute } from '../components/DocsTreeRoute';
import { reactSource } from '../source';

const ReactDocs = (): React.ReactElement => {
  const params = useParams();

  return <DocsTreeRoute source={reactSource} splat={params['*']} title="Fluent UI React v9" home />;
};

export default ReactDocs;
