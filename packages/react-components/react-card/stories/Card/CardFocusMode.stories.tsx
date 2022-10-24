import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';
import { SampleCard as Card, Title } from './SampleCard.stories';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),
  },
});

export const FocusMode = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title
          title="'off' (Default)"
          description={`The contents might still be focusable,
          but the Card won't manage the focus of its contents or be focusable.`}
        />
        <Card />
      </div>
      <div>
        <Title
          title="'no-tab'"
          description={`The Card will be focusable and trap the focus.
          You can use Tab to navigate between the contents and escaping focus only by pressing the Esc key.`}
        />
        <Card focusMode="no-tab" />
      </div>
      <div>
        <Title
          title="'tab-exit'"
          description="The Card will be focusable and trap the focus, but release it on an Esc or Tab key press."
        />
        <Card focusMode="tab-exit" />
      </div>
      <div>
        <Title
          title="'tab-only'"
          description={`The Card will not trap focus
          but will still be focusable and allow Tab navigation of its contents.`}
        />
        <Card focusMode="tab-only" />
      </div>
    </div>
  );
};

FocusMode.parameters = {
  docs: {
    description: {
      story:
        'Cards can be focusable and manage the focus of their contents in several different strategies. ' +
        'Using the `focusMode` prop, we can achieve the following:',
    },
  },
};
