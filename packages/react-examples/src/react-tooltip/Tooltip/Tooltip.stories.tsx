import * as React from 'react';
import { Tooltip, TooltipImperativeHandle } from '@fluentui/react-tooltip';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { webLightTheme } from '@fluentui/react-theme';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  target: {
    width: '128px',
    height: '128px',
    margin: '64px',
    background: 'lightgray',
    border: '1px solid darkgray',
  },
});

export const TooltipExample = () => (
  <ThemeProvider theme={webLightTheme}>
    <TooltipExampleCore />
  </ThemeProvider>
);

const TooltipExampleCore = () => {
  const styles = useStyles();

  const refs = [
    { tooltip: React.useRef<TooltipImperativeHandle>(null), target: React.useRef<HTMLDivElement>(null) },
    { tooltip: React.useRef<TooltipImperativeHandle>(null), target: React.useRef<HTMLDivElement>(null) },
    { tooltip: React.useRef<TooltipImperativeHandle>(null), target: React.useRef<HTMLDivElement>(null) },
  ];

  React.useLayoutEffect(() => {
    refs.forEach(ref => {
      if (ref.tooltip.current && ref.target.current) {
        ref.tooltip.current.show(ref.target.current);
      }
    });
  });

  return (
    <div>
      <h1>Basic tooltips</h1>
      <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
        <div className={styles.target} ref={refs[0].target} />
        <Tooltip componentRef={refs[0].tooltip}>Default</Tooltip>
        <div className={styles.target} ref={refs[1].target} />
        <Tooltip componentRef={refs[1].tooltip} noArrow>
          No arrow
        </Tooltip>
        <div className={styles.target} ref={refs[2].target} />
        <Tooltip componentRef={refs[2].tooltip} subtle>
          Subtle
        </Tooltip>
      </div>
    </div>
  );
};
