import * as _ from 'lodash';
import * as React from 'react';
import { match } from 'react-router-dom';
import PageNotFound from '../views/PageNotFound';
import { exampleSourcesContext, exampleKebabNameToSourceFilename, parseExamplePath } from '../utils';

type ExternalExampleLayoutProps = {
  match: match<{
    exampleName: string;
  }>;
};

const examplePaths = exampleSourcesContext.keys();

const PerfExampleLayout: React.FC<ExternalExampleLayoutProps> = props => {
  const { exampleName } = props.match.params;

  const exampleFilename = exampleKebabNameToSourceFilename(exampleName);
  const examplePath = _.find(examplePaths, path => exampleFilename === parseExamplePath(path).exampleName);

  if (!examplePath) return <PageNotFound />;

  const Prototype = React.lazy(async () => ({
    default: (
      await import(
        /* webpackChunkName: "prototype-example" */ `../examples/components${examplePath
          .substr(1)
          .replace('source.json', 'tsx')}`
      )
    ).default,
  }));

  return <Prototype />;
};

export default PerfExampleLayout;
