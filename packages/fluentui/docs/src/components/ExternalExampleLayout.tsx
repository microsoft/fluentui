import { Provider, teamsTheme, teamsHighContrastTheme, teamsDarkTheme } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import { match } from 'react-router-dom';
import { KnobProvider } from '@fluentui/docs-components';

import { ExampleSource } from '../types';
import { exampleSourcesContext, exampleKebabNameToSourceFilename, parseExamplePath } from '../utils';
import PageNotFound from '../views/PageNotFound';
import { SourceRender } from './ComponentDoc/SourceRender';
import { babelConfig, importResolver } from './Playground/renderConfig';

const examplePaths = exampleSourcesContext.keys();

type ExternalExampleLayoutProps = {
  match: match<{
    exampleName: string;
    rtl: string;
  }>;
};

const themes = {
  teams: teamsTheme,
  teamsHighContrast: teamsHighContrastTheme,
  teamsDark: teamsDarkTheme,
};

const ExternalExampleLayout: React.FC<ExternalExampleLayoutProps> = props => {
  const { exampleName, rtl } = props.match.params;

  const [error, setError] = React.useState<Error | null>(null);
  const [renderId, setRenderId] = React.useState<number>(0);
  const [themeName, setThemeName] = React.useState<string>();

  React.useLayoutEffect(() => {
    window.resetExternalLayout = () => setRenderId(prevNumber => prevNumber + 1);
    window.switchTheme = setThemeName;
  }, []);

  const exampleFilename = exampleKebabNameToSourceFilename(exampleName);
  const examplePath = _.find(examplePaths, path => exampleFilename === parseExamplePath(path).exampleName);

  if (!examplePath) return <PageNotFound />;

  const exampleSource: ExampleSource = exampleSourcesContext(examplePath);
  const theme = (themeName && themes[themeName]) || {};

  return (
    <Provider key={renderId} theme={theme} rtl={rtl === 'true'}>
      <KnobProvider>
        <SourceRender
          babelConfig={babelConfig}
          onRender={setError}
          source={exampleSource.js}
          resolver={importResolver}
          hot
        />
        {/* This block allows to see issues with examples as visual regressions. */}
        {error && <div style={{ fontSize: '5rem', color: 'red' }}>{error.toString()}</div>}
      </KnobProvider>
    </Provider>
  );
};

export default ExternalExampleLayout;
