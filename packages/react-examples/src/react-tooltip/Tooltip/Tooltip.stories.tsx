import * as React from 'react';
import { Tooltip } from '@fluentui/react-tooltip';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  exampleList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '16px 0',
    gap: '16px',
  },

  targetContainer: {
    display: 'inline-grid',
    alignItems: 'center',
    justifyItems: 'center',
    gap: '4px',
    margin: '16px 128px',
  },

  target: {
    width: '48px',
    height: '48px',
  },
});

export const Basic = () => {
  const styles = useStyles();

  const targetRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      Hover or focus the buttons to show their tooltips:
      <div className={styles.exampleList}>
        <Tooltip content="This is a default tooltip" triggerAriaAttribute="describedby">
          <button>Default</button>
        </Tooltip>
        <Tooltip content="This is a subtle tooltip" subtle triggerAriaAttribute="describedby">
          <button>Subtle</button>
        </Tooltip>
        <Tooltip content="This tooltip has no arrow" noArrow triggerAriaAttribute="describedby">
          <button>No arrow</button>
        </Tooltip>
        <Tooltip
          triggerAriaAttribute="describedby"
          content={
            <>
              This <i>tooltip</i> has <u>formatted</u> content
            </>
          }
        >
          <button>Formatted content</button>
        </Tooltip>
        <Tooltip content="This tooltip targets the red square" targetRef={targetRef} triggerAriaAttribute="describedby">
          <button>
            Custom target:{' '}
            <div ref={targetRef} style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }} />
          </button>
        </Tooltip>
        <Tooltip content="The trigger button was rendered by a render function" triggerAriaAttribute="describedby">
          {triggerProps => (
            <div>
              <button {...triggerProps}>Custom trigger</button>
            </div>
          )}
        </Tooltip>
      </div>
    </>
  );
};

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

export const Positioning = () => {
  const styles = useStyles();

  return (
    <>
      <div>Each of these buttons places the tooltip in a different location relative to its trigger button.</div>
      <div className={styles.targetContainer}>
        <Tooltip content="above start" position="above" align="start">
          <button className={styles.target} style={{ gridArea: '1 / 2' }} />
        </Tooltip>
        <Tooltip content="above center" position="above" align="center">
          <button className={styles.target} style={{ gridArea: '1 / 3' }} />
        </Tooltip>
        <Tooltip content="above end" position="above" align="end">
          <button className={styles.target} style={{ gridArea: '1 / 4' }} />
        </Tooltip>

        <Tooltip content="before top" position="before" align="top">
          <button className={styles.target} style={{ gridArea: '2 / 1' }} />
        </Tooltip>
        <Tooltip content="before center" position="before" align="center">
          <button className={styles.target} style={{ gridArea: '3 / 1' }} />
        </Tooltip>
        <Tooltip content="before bottom" position="before" align="bottom">
          <button className={styles.target} style={{ gridArea: '4 / 1' }} />
        </Tooltip>

        <Tooltip content="after top" position="after" align="top">
          <button className={styles.target} style={{ gridArea: '2 / 5' }} />
        </Tooltip>
        <Tooltip content="after center" position="after" align="center">
          <button className={styles.target} style={{ gridArea: '3 / 5' }} />
        </Tooltip>
        <Tooltip content="after bottom" position="after" align="bottom">
          <button className={styles.target} style={{ gridArea: '4 / 5' }} />
        </Tooltip>

        <Tooltip content="below start" position="below" align="start">
          <button className={styles.target} style={{ gridArea: '5 / 2' }} />
        </Tooltip>
        <Tooltip content="below center" position="below" align="center">
          <button className={styles.target} style={{ gridArea: '5 / 3' }} />
        </Tooltip>
        <Tooltip content="below end" position="below" align="end">
          <button className={styles.target} style={{ gridArea: '5 / 4' }} />
        </Tooltip>
      </div>
    </>
  );
};

export const OnlyIfTruncated = () => {
  const [wide, setWide] = React.useState(true);
  const text = 'The tooltip will only show if the text is truncated.';

  return (
    <>
      <Tooltip content={text} onlyIfTruncated>
        <div
          tabIndex={0}
          style={{
            width: !wide ? '100px' : undefined,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            border: '1px solid gray',
            padding: '4px',
          }}
        >
          {text}
        </div>
      </Tooltip>
      <button onClick={() => setWide(w => !w)}>Toggle width</button>
    </>
  );
};
