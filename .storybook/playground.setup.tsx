import * as React from 'react';
import { FluentProvider, webDarkTheme, webLightTheme, type Theme } from '@fluentui/react-components';
import { definePlaygroundSetup } from '@fluentui/react-playground/setup';

const defaultCode = `import * as React from 'react';
import { Button, Card, CardHeader, Text, Title3 } from '@fluentui/react-components';

export const Default = () => {
  const [count, setCount] = React.useState(0);

  return (
    <Card>
      <CardHeader header={<Title3>Fluent UI Playground</Title3>} />
      <Text>Private packages are compiled by the Storybook Webpack build.</Text>
      <Button appearance="primary" onClick={() => setCount(value => value + 1)}>
        Clicked {count} times
      </Button>
    </Card>
  );
};
`;

export default definePlaygroundSetup<Theme>({
  title: 'Fluent UI Playground',
  subtitle: 'Webpack runtime prototype',
  defaultCode,
  themes: [
    { id: 'web-light', label: 'Web Light', value: webLightTheme },
    { id: 'web-dark', label: 'Web Dark', value: webDarkTheme },
  ],
  render: ({ Component, theme }) => (
    <FluentProvider theme={theme ?? webLightTheme}>
      <Component />
    </FluentProvider>
  ),
});
