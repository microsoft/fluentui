import { Provider, teamsTheme, teamsHighContrastTheme, teamsDarkTheme } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';
import { match } from 'react-router-dom';
import { KnobProvider } from '@fluentui/docs-components';

import { examplesContext } from '../contexts/examplesContext';
import PageNotFound from '../views/PageNotFound';
import { exampleKebabNameToFilename, parseExamplePath } from '../utils';

const examplePaths = examplesContext.keys();

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

  const [renderId, setRenderId] = React.useState<number>(0);
  const [themeName, setThemeName] = React.useState<string>();

  React.useLayoutEffect(() => {
    window.resetExternalLayout = () => setRenderId(prevNumber => prevNumber + 1);
    window.switchTheme = setThemeName;
  }, []);

  const exampleFilename = exampleKebabNameToFilename(exampleName);
  const examplePath = _.find(examplePaths, path => exampleFilename === parseExamplePath(path).exampleName);

  if (!examplePath) return <PageNotFound />;

  const Example: React.ElementType = examplesContext(examplePath).default;
  const theme = (themeName && themes[themeName]) || {};

  return (
    <Provider key={renderId} theme={theme} rtl={rtl === 'true'}>
      <KnobProvider>
        <Example />
      </KnobProvider>
    </Provider>
  );
};

export default ExternalExampleLayout;
