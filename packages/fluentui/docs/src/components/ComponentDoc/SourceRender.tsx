import useScript from '@charlietango/use-script';
import { Loader } from '@fluentui/react-northstar';
import * as React from 'react';

const _SourceRender = React.lazy(() => import('react-source-render'));

type SourceRenderProps = {
  babelConfig?: Record<string, any>;
  hot?: boolean;
  resolver?: (importPath: string, context?: Object) => void;
  resolverContext?: Object;
  source: string;
  onRender?: (error: Error | null) => void;
};

export const SourceRender: React.FC<SourceRenderProps> = props => {
  const url = `https://cdn.jsdelivr.net/npm/@babel/standalone@${window['versions'].babelStandalone}/babel.min.js`;
  const [ready] = useScript(url);

  return ready ? (
    <React.Suspense fallback={<Loader />}>
      <_SourceRender {...props} />
    </React.Suspense>
  ) : (
    <Loader />
  );
};
