import * as React from 'react';
import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  webDarkTheme,
  webLightTheme,
  type Theme,
} from '@fluentui/react-components';

import { definePlaygroundSetup } from './setup';

const defaultCode = `import * as React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardFooter,
  Text,
  Title3,
  makeStyles,
  tokens,
} from '@fluentui/react-components';
import { RocketRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  card: {
    maxWidth: '420px',
  },
  body: {
    color: tokens.colorNeutralForeground2,
  },
});

export const Default = () => {
  const styles = useStyles();
  const [count, setCount] = React.useState(0);

  return (
    <Card className={styles.card}>
      <CardHeader header={<Title3>Fluent UI React v9 Playground</Title3>} />
      <Text className={styles.body}>
        Edit the code on the left and the preview updates automatically. Only pre-installed dependencies can be imported.
      </Text>
      <CardFooter>
        <Button appearance="primary" icon={<RocketRegular />} onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
      </CardFooter>
    </Card>
  );
};
`;

/**
 * Default Fluent UI setup used when the Storybook addon is configured without a custom `setup` module.
 */
export default definePlaygroundSetup<Theme>({
  title: 'Fluent UI Playground',
  subtitle: 'React v9',
  defaultCode,
  themes: [
    { id: 'web-light', label: 'Web Light', value: webLightTheme, dark: false },
    { id: 'web-dark', label: 'Web Dark', value: webDarkTheme, dark: true },
    { id: 'teams-light', label: 'Teams Light', value: teamsLightTheme, dark: false },
    { id: 'teams-dark', label: 'Teams Dark', value: teamsDarkTheme, dark: true },
  ],
  render: ({ Component, theme }) => (
    <FluentProvider theme={theme ?? webLightTheme}>
      <Component />
    </FluentProvider>
  ),
});
