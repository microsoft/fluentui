import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Tooltip } from '@fluentui/react-tooltip';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';
import { makeStyles, shorthands } from '@fluentui/react-make-styles';
import { tokens } from '@fluentui/react-theme';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    ...shorthands.gap('5px'),
    ...shorthands.padding('50px', '120px'),
    backgroundColor: tokens.colorNeutralBackground1,

    '& button, & .target': {
      color: tokens.colorNeutralForeground1,
      backgroundColor: tokens.colorNeutralBackground1,
      ...shorthands.border('1px', 'solid', tokens.colorNeutralStroke1),
    },
  },
});

storiesOf('Tooltip Converged', module)
  .addDecorator(TestWrapperDecorator)
  .addStory(
    'basic',
    () => (
      <div className={useStyles().wrapper}>
        <Tooltip visible content="This is a tooltip" relationship="description">
          <button>Target</button>
        </Tooltip>
      </div>
    ),
    { includeDarkMode: true, includeHighContrast: true },
  )
  .addStory(
    'inverted',
    () => (
      <div className={useStyles().wrapper}>
        <Tooltip
          visible
          appearance="inverted"
          content="Inverted tooltip"
          relationship="description"
        >
          <button>Target</button>
        </Tooltip>
      </div>
    ),
    { includeDarkMode: true },
  )
  .addStory(
    'withArrow',
    () => (
      <div className={useStyles().wrapper}>
        <Tooltip visible withArrow content="Tooltip with an arrow" relationship="description">
          <button>Target</button>
        </Tooltip>
      </div>
    ),
    { includeDarkMode: true, includeHighContrast: true },
  )
  .addStory(
    'inverted withArrow',
    () => (
      <div className={useStyles().wrapper}>
        <Tooltip
          visible
          appearance="inverted"
          withArrow
          content="Inverted tooltip with an arrow"
          relationship="description"
        >
          <button>Target</button>
        </Tooltip>
      </div>
    ),
    { includeDarkMode: true },
  )
  .addStory('text-wrapping', () => (
    <div className={useStyles().wrapper}>
      <Tooltip
        visible
        content="This tooltip's text is long enough to wrap to a new line"
        relationship="description"
      >
        <button>Target</button>
      </Tooltip>
    </div>
  ))
  .addStory(
    'positioning',
    () => {
      const positions = [
        ['above', 'start'],
        ['above', 'center'],
        ['above', 'end'],
        ['below', 'start'],
        ['below', 'center'],
        ['below', 'end'],
        ['before', 'top'],
        ['before', 'center'],
        ['before', 'bottom'],
        ['after', 'top'],
        ['after', 'center'],
        ['after', 'bottom'],
      ] as const;
      const [target, setTarget] = React.useState<HTMLDivElement | null>(null);
      return (
        <div className={useStyles().wrapper}>
          <div ref={setTarget} className="target" style={{ width: '300px', height: '150px' }}>
            {...positions.map(([position, align]) => (
              <Tooltip
                key={position + align}
                content={position + ' ' + align}
                relationship="label"
                positioning={{ position, align, target }}
                withArrow
                visible
              />
            ))}
          </div>
        </div>
      );
    },
    { includeRtl: true, includeHighContrast: true },
  );
