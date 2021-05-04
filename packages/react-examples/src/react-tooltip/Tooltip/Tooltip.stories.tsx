import * as React from 'react';
import { Tooltip } from '@fluentui/react-tooltip';
import { webLightTheme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';
import { FluentProvider } from '@fluentui/react-provider';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  exampleList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '16px 0',
    gap: '16px',
  },

  targetContainer: {
    display: 'grid',
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

export const TooltipExample = () => (
  <FluentProvider theme={webLightTheme}>
    <TooltipExampleCore />
  </FluentProvider>
);

const TooltipOnlyIfTruncatedExample = () => {
  const text = 'The tooltip will only show if the text is truncated.';

  const [wide, setWide] = React.useState(true);

  return (
    <div>
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
    </div>
  );
};

const TooltipExampleCore = () => {
  const styles = useStyles();

  const targetRef1 = React.useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <h2>Tooltip Styles</h2>
      Hover or focus the buttons to show their tooltips:
      <div className={styles.exampleList}>
        <Tooltip content="This is a default tooltip" type="description">
          <button>Default</button>
        </Tooltip>
        <Tooltip content="This is a subtle tooltip" subtle type="description">
          <button>Subtle</button>
        </Tooltip>
        <Tooltip content="This tooltip has no arrow" noArrow type="description">
          <button>No arrow</button>
        </Tooltip>
        <Tooltip
          content={
            <>
              This <i>tooltip</i> has <u>formatted</u> content
            </>
          }
          type="description"
        >
          <button>Formatted content</button>
        </Tooltip>
        <Tooltip content="This tooltip targets the red square" targetRef={targetRef1} type="description">
          <button>
            Custom target:{' '}
            <div ref={targetRef1} style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }} />
          </button>
        </Tooltip>
        <Tooltip content="The trigger button was rendered by a render function" type="description">
          {triggerProps => (
            <div>
              <button {...triggerProps}>Custom trigger</button>
            </div>
          )}
        </Tooltip>
      </div>
      <h2>Aria roles</h2>
      <div className={styles.exampleList}>
        <Tooltip content="This tooltip describes the button" type="description">
          <button>Description</button>
        </Tooltip>
        <Tooltip content="This tooltip is the label for the button" type="label">
          {/* eslint-disable-next-line jsx-a11y/accessible-emoji */}
          <button>💬</button>
        </Tooltip>
      </div>
      <h2>Position</h2>
      Each of these buttons places the tooltip in a different location relative to its trigger button.
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
      <h2>Only if truncated</h2>
      <div>
        <TooltipOnlyIfTruncatedExample />
      </div>
    </div>
  );
};
