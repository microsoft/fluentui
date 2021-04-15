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
      <h2>Position</h2>
      Each of these buttons places the tooltip in a different location relative to its trigger button.
      <div className={styles.targetContainer}>
        <TooltipTrigger tooltip="above start" type="label" position="above" align="start">
          <button className={styles.target} style={{ gridColumn: 2, gridRow: 1 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="above center" type="label" position="above" align="center">
          <button className={styles.target} style={{ gridColumn: 3, gridRow: 1 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="above end" type="label" position="above" align="end">
          <button className={styles.target} style={{ gridColumn: 4, gridRow: 1 }} />
        </TooltipTrigger>

        <TooltipTrigger tooltip="before top" type="label" position="before" align="top">
          <button className={styles.target} style={{ gridColumn: 1, gridRow: 2 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="before center" type="label" position="before" align="center">
          <button className={styles.target} style={{ gridColumn: 1, gridRow: 3 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="before bottom" type="label" position="before" align="bottom">
          <button className={styles.target} style={{ gridColumn: 1, gridRow: 4 }} />
        </TooltipTrigger>

        <TooltipTrigger tooltip="after top" type="label" position="after" align="top">
          <button className={styles.target} style={{ gridColumn: 5, gridRow: 2 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="after center" type="label" position="after" align="center">
          <button className={styles.target} style={{ gridColumn: 5, gridRow: 3 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="after bottom" type="label" position="after" align="bottom">
          <button className={styles.target} style={{ gridColumn: 5, gridRow: 4 }} />
        </TooltipTrigger>

        <TooltipTrigger tooltip="below start" type="label" position="below" align="start">
          <button className={styles.target} style={{ gridColumn: 2, gridRow: 5 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="below center" type="label" position="below" align="center">
          <button className={styles.target} style={{ gridColumn: 3, gridRow: 5 }} />
        </TooltipTrigger>
        <TooltipTrigger tooltip="below end" type="label" position="below" align="end">
          <button className={styles.target} style={{ gridColumn: 4, gridRow: 5 }} />
        </TooltipTrigger>
      </div>
    </div>
  );
};
