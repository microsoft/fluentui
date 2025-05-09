import * as React from 'react';
import { Text, TextProvider, makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: '1rem',
    flexDirection: 'column',
  },
});

export const Provider = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Text size={500} weight="bold">
        This is a really long text that is going to be used to showcase the text component. Among those words, we have a
        few styled ones, like <Text underline>this underlined</Text>, <Text italic>this italic</Text>,{' '}
        <Text strikethrough>this strikethrough</Text>, and <Text size={100}>this small</Text>. Notice that all of the
        styled ones lost the size and bold formatting.
      </Text>

      <TextProvider value={{ size: 500, weight: 'bold' }}>
        <Text>
          This is a really long text that is going to be used to showcase the text component. Among those words, we have
          a few styled ones, like <Text underline>this underlined</Text>, <Text italic>this italic</Text>,{' '}
          <Text strikethrough>this strikethrough</Text>, and <Text size={100}>this small</Text>. Notice that now
          everything is formmatted correctly.
        </Text>
      </TextProvider>
    </div>
  );
};

Provider.parameters = {
  docs: {
    description: {
      story:
        'By default, the `Text` component uses default styles to keep consistency no matter where it is placed, preventing any inheritance. But sometimes this is not the desired behavior. To avoid this issue, the `TextProvider` component can be used to provide default values for `Text` components used within it.',
    },
  },
};
