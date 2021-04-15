import * as React from 'react';
import { TooltipTrigger } from '@fluentui/react-tooltip-trigger';
import { TooltipProvider } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';

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

export const TooltipTriggerExample = () => (
  <ThemeProvider theme={webLightTheme}>
    <TooltipProvider>
      <TooltipTriggerExampleCore />
    </TooltipProvider>
  </ThemeProvider>
);

const TooltipOnlyIfTruncatedExample = () => {
  const text = 'This will only show a tooltip if the content is truncated';

  const [wide, setWide] = React.useState(false);

  return (
    <div>
      <button onClick={() => setWide(!wide)}>Toggle Width</button>
      <TooltipTrigger tooltip={text} type="label" onlyIfTruncated>
        <div
          style={{
            width: wide ? '500px' : '100px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            border: '1px solid lightgray',
          }}
          tabIndex={0}
        >
          {text}
        </div>
      </TooltipTrigger>
    </div>
  );
};

const TooltipTriggerExampleCore = () => {
  const styles = useStyles();

  const targetRef1 = React.useRef<HTMLDivElement>(null);

  return (
    <div className={styles.root}>
      <h2>Basic examples</h2>
      Hover or focus the buttons to show their tooltips:
      <div className={styles.exampleList}>
        <TooltipTrigger tooltip="This is a default tooltip">
          <button>Default</button>
        </TooltipTrigger>
        <TooltipTrigger tooltip="This is a subtle tooltip" subtle>
          <button>Subtle</button>
        </TooltipTrigger>
        <TooltipTrigger tooltip="This tooltip has no arrow" noArrow>
          <button>No arrow</button>
        </TooltipTrigger>
        <TooltipTrigger
          tooltip={
            <>
              This <i>tooltip</i> has <u>JSX</u> content
            </>
          }
        >
          <button>JSX content</button>
        </TooltipTrigger>
        <TooltipTrigger tooltip="This tooltip targets the red square" targetRef={targetRef1}>
          <button>
            Custom target:{' '}
            <div ref={targetRef1} style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }} />
          </button>
        </TooltipTrigger>
        <TooltipTrigger tooltip="The trigger button was rendered by a render function">
          {triggerProps => (
            <div>
              <button {...triggerProps}>Custom trigger</button>
            </div>
          )}
        </TooltipTrigger>
      </div>
      <h2>Only if truncated</h2>
      <div>
        <TooltipOnlyIfTruncatedExample />
      </div>
      <h2>Position</h2>
      Each of these buttons places the tooltip in a different location relative to its trigger button.
      <div className={styles.targetContainer}>
        <TooltipTrigger type="label" tooltip="above start" position="above" align="start">
          <button className={styles.target} style={{ gridArea: '1 / 2' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="above center" position="above" align="center">
          <button className={styles.target} style={{ gridArea: '1 / 3' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="above end" position="above" align="end">
          <button className={styles.target} style={{ gridArea: '1 / 4' }} />
        </TooltipTrigger>

        <TooltipTrigger type="label" tooltip="before top" position="before" align="top">
          <button className={styles.target} style={{ gridArea: '2 / 1' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="before center" position="before" align="center">
          <button className={styles.target} style={{ gridArea: '3 / 1' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="before bottom" position="before" align="bottom">
          <button className={styles.target} style={{ gridArea: '4 / 1' }} />
        </TooltipTrigger>

        <TooltipTrigger type="label" tooltip="after top" position="after" align="top">
          <button className={styles.target} style={{ gridArea: '2 / 5' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="after center" position="after" align="center">
          <button className={styles.target} style={{ gridArea: '3 / 5' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="after bottom" position="after" align="bottom">
          <button className={styles.target} style={{ gridArea: '4 / 5' }} />
        </TooltipTrigger>

        <TooltipTrigger type="label" tooltip="below start" position="below" align="start">
          <button className={styles.target} style={{ gridArea: '5 / 2' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="below center" position="below" align="center">
          <button className={styles.target} style={{ gridArea: '5 / 3' }} />
        </TooltipTrigger>
        <TooltipTrigger type="label" tooltip="below end" position="below" align="end">
          <button className={styles.target} style={{ gridArea: '5 / 4' }} />
        </TooltipTrigger>
      </div>
    </div>
  );
};
