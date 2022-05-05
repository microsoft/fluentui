import * as React from 'react';

import { Title3, Text } from '@fluentui/react-text';

import { makeStyles, shorthands } from '@griffel/react';
import { SampleCard } from './SampleCard.stories';

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
        <Title3 block>'off' (Default)</Title3>
        <Text block>
          The contents might still be focusable, but the Card won't manage the focus of its contents or be focusable.
        </Text>
      </div>
      <SampleCard />
      <div>
        <Title3 block>'no-tab'</Title3>
        <Text block>
          The Card will be focusable and trap the focus. You can use Tab to navigate between the contents and escaping
          focus only by pressing the Esc key.
        </Text>
      </div>
      <SampleCard focusMode="no-tab" />
      <div>
        <Title3 block>'tab-exit'</Title3>
        <Text block>The Card will be focusable and trap the focus, but release it on an Esc or Tab key press.</Text>
      </div>
      <SampleCard focusMode="tab-exit" />
      <div>
        <Title3 block>'tab-only'</Title3>
        <Text block>
          The Card will not trap focus but will still be focusable and allow Tab navigation of its contents.
        </Text>
      </div>
      <SampleCard focusMode="tab-only" />
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
