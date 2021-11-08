import * as React from 'react';
import { Tooltip } from '../Tooltip'; // codesandbox-dependency: @fluentui/react-tooltip ^9.0.0-beta
import { makeStyles } from '@fluentui/react-make-styles'; // codesandbox-dependency: @fluentui/react-make-styles ^9.0.0-beta

const useStyles = makeStyles({
  exampleList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    margin: '16px 0',
    gap: '16px',
  },
});

export const Default = () => {
  const styles = useStyles();

  const [exampleTarget, setExampleTarget] = React.useState<HTMLDivElement | null>(null);

  return (
    <>
      Hover or focus the buttons to show their tooltips:
      <div className={styles.exampleList}>
        <Tooltip content="Default tooltip">
          <button>Default</button>
        </Tooltip>
        <Tooltip content="Inverted tooltip" appearance="inverted">
          <button>Inverted</button>
        </Tooltip>
        <Tooltip content="Tooltip pointing to its target" withArrow>
          <button>With an arrow</button>
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
        <Tooltip content="Tooltip pointing to a custom target" positioning={{ target: exampleTarget }} withArrow>
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
