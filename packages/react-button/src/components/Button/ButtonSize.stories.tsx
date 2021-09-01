import * as React from 'react';
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles/src';

const useStyles = makeStyles({
  group: { display: 'flex', flexWrap: 'wrap', gap: '0.5em' },
  header: { width: '100%', margin: 0 },
});

export const Size = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.group}>
        <h4 className={classes.header}>small</h4>
        <Button size="small">Text</Button>
        <Button size="small" icon={<CalendarMonth24Regular />}>
          Text
        </Button>
        <Button size="small" icon={<CalendarMonth24Regular />} />
      </div>
      <div className={classes.group}>
        <h4 className={classes.header}>medium</h4>
        <Button>Text</Button>
        <Button icon={<CalendarMonth24Regular />}>Text</Button>
        <Button icon={<CalendarMonth24Regular />} />
      </div>
      <div className={classes.group}>
        <h4 className={classes.header}>large</h4>
        <Button size="large">Text</Button>
        <Button size="large" icon={<CalendarMonth24Regular />}>
          Text
        </Button>
        <Button size="large" icon={<CalendarMonth24Regular />} />
      </div>
    </>
  );
};
Size.parameters = {
  docs: {
    description: {
      story: 'A button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
  },
};
