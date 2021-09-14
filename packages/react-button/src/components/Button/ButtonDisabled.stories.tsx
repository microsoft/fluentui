import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - add link to this comment please  (see https://github.com/microsoft/fluentui/pull/18695)
import { Button } from '@fluentui/react-button';
import { CalendarMonth24Regular } from '@fluentui/react-icons';
import { makeStyles } from '@fluentui/react-make-styles/src';

const useStyles = makeStyles({
  group: { display: 'flex', flexWrap: 'wrap', gap: '0.5em' },
});

export const Disabled = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.group}>
        <Button>Default</Button>
        <Button disabled>Disabled</Button>
        <Button disabledFocusable>Disabled focusable</Button>
      </div>
      <div className={classes.group}>
        <Button primary icon={<CalendarMonth24Regular />}>
          Primary
        </Button>
        <Button primary disabled icon={<CalendarMonth24Regular />}>
          Primary disabled
        </Button>
        <Button primary disabledFocusable>
          Primary disabled focusable
        </Button>
      </div>
    </>
  );
};
Disabled.parameters = {
  docs: {
    description: {
      story: `A button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
