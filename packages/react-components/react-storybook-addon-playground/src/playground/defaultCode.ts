export const DEFAULT_CODE = `import * as React from 'react';
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
