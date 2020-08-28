import * as React from 'react';
import { LazyWithBabel } from './LazyWithBabel';

const _SourceRender = React.lazy(() => import('react-source-render'));

type SourceRenderProps = {
  babelConfig?: Record<string, any>;
  hot?: boolean;
  resolver?: (importPath: string, context?: Object) => void;
  resolverContext?: Object;
  source: string;
  onRender?: (error: Error | null) => void;
};

export const SourceRender: React.FC<SourceRenderProps> = props => (
  <LazyWithBabel>
    <_SourceRender {...props} />
  </LazyWithBabel>
);
