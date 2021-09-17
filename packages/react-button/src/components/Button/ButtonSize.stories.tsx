import * as React from 'react';
import { Button } from '../../Button'; // codesandbox-dependency: @fluentui/react-button ^9.0.0-alpha
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  group: { display: 'flex', flexWrap: 'wrap', gap: '0.5em' },
  header: { width: '100%', margin: 0 },
});

export const Size = () => {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
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
    </div>
  );
};
Size.parameters = {
  docs: {
    description: {
      story: 'A button supports `small`, `medium` and `large` size. Default size is `medium`.',
    },
    source: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      code: __STORY__,
    },
  },
};
