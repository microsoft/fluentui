import * as React from 'react';
import { Tooltip } from './index';
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
    gridTemplateColumns: 'repeat(5, 1fr)',
    gridTemplateRows: 'repeat(5, 64px)',
    gap: '4px',
    margin: '16px 128px',
  },
});

export const Basic = () => {
  const styles = useStyles();

  const [exampleTarget, setExampleTarget] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      Hover or focus the buttons to show their tooltips:
      <div className={styles.exampleList}>
        <Tooltip content="Default tooltip">
          <button>Default</button>
        </Tooltip>
        <Tooltip content="Inverted tooltip" inverted>
          <button>Inverted</button>
        </Tooltip>
        <Tooltip content="Tooltip pointing to its target" pointing>
          <button>Pointing</button>
        </Tooltip>
        <Tooltip
          content={
            <>
              <u>Formatted</u> <i>content</i>
            </>
          }
        >
          <button>Formatted content</button>
        </Tooltip>
        <Tooltip content="Tooltip pointing to a custom target" target={exampleTarget} pointing>
          <button>
            Custom target:{' '}
            <div
              ref={setExampleTarget}
              style={{ display: 'inline-block', width: '8px', height: '8px', background: 'red' }}
            />
          </button>
        </Tooltip>
        <Tooltip content="Trigger button using a render function">
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
          <button style={{ gridArea: '1 / 2' }}>above start</button>
        </Tooltip>
        <Tooltip content="above center" position="above" align="center">
          <button style={{ gridArea: '1 / 3' }}>above center</button>
        </Tooltip>
        <Tooltip content="above end" position="above" align="end">
          <button style={{ gridArea: '1 / 4' }}>above end</button>
        </Tooltip>

        <Tooltip content="before top" position="before" align="top">
          <button style={{ gridArea: '2 / 1' }}>before top</button>
        </Tooltip>
        <Tooltip content="before center" position="before" align="center">
          <button style={{ gridArea: '3 / 1' }}>before center</button>
        </Tooltip>
        <Tooltip content="before bottom" position="before" align="bottom">
          <button style={{ gridArea: '4 / 1' }}>before bottom</button>
        </Tooltip>

        <Tooltip content="after top" position="after" align="top">
          <button style={{ gridArea: '2 / 5' }}>after top</button>
        </Tooltip>
        <Tooltip content="after center" position="after" align="center">
          <button style={{ gridArea: '3 / 5' }}>after center</button>
        </Tooltip>
        <Tooltip content="after bottom" position="after" align="bottom">
          <button style={{ gridArea: '4 / 5' }}>after bottom</button>
        </Tooltip>

        <Tooltip content="below start" position="below" align="start">
          <button style={{ gridArea: '5 / 2' }}>below start</button>
        </Tooltip>
        <Tooltip content="below center" position="below" align="center">
          <button style={{ gridArea: '5 / 3' }}>below center</button>
        </Tooltip>
        <Tooltip content="below end" position="below" align="end">
          <button style={{ gridArea: '5 / 4' }}>below end</button>
        </Tooltip>
      </div>
    </>
  );
};

export const ControlledTooltip = () => {
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  return (
    <>
      <Tooltip content="The visibility of this tooltip is controlled by the parent component" visible={tooltipVisible}>
        <button onClick={() => setTooltipVisible(v => !v)}>Toggle tooltip</button>
      </Tooltip>
    </>
  );
};

export const OnlyIfTruncated = () => {
  const textContainerRef = React.useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = React.useState(false);
  const [wide, setWide] = React.useState(true);
  const text = 'The tooltip only shows if the text is truncated';
  return (
    <>
      <button onClick={() => setWide(w => !w)}>Toggle container width</button>
      <Tooltip
        content={text}
        visible={tooltipVisible}
        position="below"
        onVisibleChange={(_ev, { visible }) => {
          if (
            visible &&
            textContainerRef.current &&
            textContainerRef.current.scrollWidth <= textContainerRef.current.clientWidth &&
            textContainerRef.current.scrollHeight <= textContainerRef.current.clientHeight
          ) {
            // Don't show the tooltip if the textContainer's content is not truncated
            visible = false;
          }

          setTooltipVisible(visible);
        }}
      >
        <div
          ref={textContainerRef}
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
    </>
  );
};

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};
