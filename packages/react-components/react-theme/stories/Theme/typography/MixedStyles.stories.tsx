import * as React from 'react';
import { makeStyles, typographyStyles, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  title: typographyStyles.title2,

  paragraph: {
    ...typographyStyles.body1,
    letterSpacing: '0.0675em',
    fontStyle: 'italic',
  },
});

export const MixedStyles = () => {
  const styles = useStyles();

  return (
    <div className={styles.container}>
      <Text as="h1" className={styles.title}>
        Using Title 2 tokens
      </Text>

      <Text as="p" className={styles.paragraph}>
        I'm a paragraph using Body 1 tokens and customized styles
      </Text>
    </div>
  );
};
