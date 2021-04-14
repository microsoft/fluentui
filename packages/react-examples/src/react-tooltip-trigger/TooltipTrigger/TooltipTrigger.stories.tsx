import * as React from 'react';
import { TooltipTrigger } from '@fluentui/react-tooltip-trigger';
import { TooltipProvider } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  exampleList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    margin: '64px',
    gap: '64px',
  },

  target: {
    width: '128px',
    height: '128px',
    margin: '64px',
    background: 'lightgray',
    border: '1px solid darkgray',
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
    <div className={styles.exampleList}>
      Hover or focus the buttons to show their tooltips:
      <TooltipTrigger tooltip="A simple tooltip">
        <button>Default</button>
      </TooltipTrigger>
      <TooltipTrigger tooltip="This is a subtle tooltip" subtle>
        <button>Subtle</button>
      </TooltipTrigger>
      <TooltipTrigger tooltip="This tooltip has no arrow" noArrow>
        <button>No arrow</button>
      </TooltipTrigger>
      <TooltipTrigger tooltip="The tooltip targets the red square" targetRef={targetRef1}>
        <button>
          Custom target:{' '}
          <div ref={targetRef1} style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }} />
        </button>
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
    </div>
  );
};
