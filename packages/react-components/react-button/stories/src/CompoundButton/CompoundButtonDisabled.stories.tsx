import * as React from 'react';
import { makeStyles, CompoundButton } from '@fluentui/react-components';

const useStyles = makeStyles({
  innerWrapper: {
    columnGap: '15px',
    display: 'flex',
    minWidth: 'min-content',
  },
  outerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '15px',
  },
});

export const Disabled = () => {
  const styles = useStyles();

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.innerWrapper}>
        <CompoundButton secondaryContent="Secondary content">Enabled state</CompoundButton>
        <CompoundButton disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
      <div className={styles.innerWrapper}>
        <CompoundButton appearance="primary" secondaryContent="Secondary content">
          Enabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabled secondaryContent="Secondary content">
          Disabled state
        </CompoundButton>
        <CompoundButton appearance="primary" disabledFocusable secondaryContent="Secondary content">
          Disabled focusable state
        </CompoundButton>
      </div>
    </div>
  );
};

Disabled.parameters = {
  docs: {
    description: {
      story: `A compound button can be \`disabled\` or \`disabledFocusable\`.
              \`disabledFocusable\` is used in scenarios where it is important to keep a consistent tab order
              for screen reader and keyboard users. The primary example of this pattern is when
              the disabled compound button is in a menu or a commandbar and is seldom used for standalone buttons.`,
    },
  },
};
