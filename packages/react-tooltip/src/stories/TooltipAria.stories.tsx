import * as React from 'react';
import { Tooltip } from '../Tooltip'; // codesandbox-dependency: @fluentui/react-tooltip ^9.0.0-beta
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  exampleList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '16px 0',
    gap: '16px',
  },
});

export const Aria = () => {
  const styles = useStyles();

  return (
    <>
      Use a screen reader to hear how the tooltip can be used as its target's label or description:
      <div className={styles.exampleList}>
        <Tooltip content="This tooltip is the label for the button" triggerAriaAttribute="label">
          <button>
            <span aria-hidden="true">💬</span>
          </button>
        </Tooltip>
        <Tooltip content="This tooltip describes the button" triggerAriaAttribute="describedby">
          <button>Description</button>
        </Tooltip>
      </div>
    </>
  );
};
