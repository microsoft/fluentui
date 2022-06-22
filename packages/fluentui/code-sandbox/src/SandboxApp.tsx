import { KnobInspector, KnobProvider } from '@fluentui/docs-components';
import {
  Divider,
  Flex,
  Header,
  Provider,
  RadioGroup,
  Text,
  teamsTheme,
  teamsV2Theme,
  teamsDarkTheme,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
} from '@fluentui/react-northstar';
// @ts-ignore
import pkg from '@fluentui/react-northstar/package.json';
import * as React from 'react';

import { KnobsSnippet } from './KnobsSnippet';
import { knobComponents } from './knobComponents';

const items = [
  {
    key: 'light',
    label: 'Teams Light',
    value: 'teamsTheme',
  },
  {
    key: 'light_v2',
    label: 'Teams Light V2',
    value: 'teamsV2Theme',
  },
  {
    key: 'dark',
    label: 'Teams Dark',
    value: 'teamsDarkTheme',
  },
  {
    key: 'dark_v2',
    label: 'Teams Dark V2',
    value: 'teamsDarkV2Theme',
  },
  {
    key: 'hc',
    label: 'Teams High Contrast',
    value: 'teamsHighContrastTheme',
  },
];

const themes = {
  teamsTheme,
  teamsDarkTheme,
  teamsV2Theme,
  teamsDarkV2Theme,
  teamsHighContrastTheme,
};

export const SandboxApp: React.FunctionComponent = props => {
  const { children } = props;
  const [theme, setTheme] = React.useState(items[0].value);

  return (
    <Provider theme={themes[theme]} styles={{ height: '100vh', padding: '1rem' }}>
      {/* TODO: Load it in more React way */}
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.16.0/themes/prism-tomorrow.min.css" />

      <KnobProvider components={knobComponents}>
        <div>
          <Header>Fluent UI @ {pkg.version}</Header>
          <p>
            This example is powered by Fluent UI, check{' '}
            <Text as="a" href="https://aka.ms/fluent-ui">
              our docs
            </Text>{' '}
            and{' '}
            <Text as="a" href="https://github.com/microsoft/fluentui">
              GitHub
            </Text>
            .
          </p>

          <Flex>
            Select theme:
            <RadioGroup
              onCheckedValueChange={(e, data) => setTheme(data.value as string)}
              checkedValue={theme}
              items={items}
            />
          </Flex>
          <Divider />
          <KnobInspector>
            {knobs =>
              knobs && (
                <>
                  <KnobsSnippet>{knobs}</KnobsSnippet>
                  <Divider />
                </>
              )
            }
          </KnobInspector>

          {children}
        </div>
      </KnobProvider>
    </Provider>
  );
};
