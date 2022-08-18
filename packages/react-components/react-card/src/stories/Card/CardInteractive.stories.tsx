import * as React from 'react';
import { makeStyles, shorthands } from '@fluentui/react-components';

import { Title } from './SampleCard.stories';
import { SampleCardSmall } from './SampleCardSmall.stories';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('30px'),
  },
});

const onClickEvent = () => {
  console.log('Interactive when has onClick event');
};

export const Interactive = () => {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Title title="As a link" />
        <SampleCardSmall as="a" href="#" />
      </div>

      <div>
        <Title title="As a button" />
        <SampleCardSmall as="button" type="button" />
      </div>

      <div>
        <Title title="With a MouseEvent" />
        <SampleCardSmall onClick={onClickEvent} />
      </div>
    </div>
  );
};
