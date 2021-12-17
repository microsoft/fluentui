import * as React from 'react';
import Screener, { Steps } from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { Tooltip, TooltipProps } from '@fluentui/react-tooltip';
import { TestWrapperDecorator } from '../utilities/TestWrapperDecorator';

const PositioningStory = (props: Partial<TooltipProps>) => {
  const [target, setTarget] = React.useState<HTMLDivElement | null>(null);
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
  return (
    <div style={{ width: '300px', height: '150px', border: '1px solid gray' }} ref={setTarget}>
      {...positions.map(([position, align]) => (
        <Tooltip
          key={position + align}
          content={position + ' ' + align}
          positioning={{ position, align, target }}
          visible
          {...props}
        />
      ))}
    </div>
  );
};

storiesOf('Tooltip Converged', module)
  .addDecorator(story => <div style={{ padding: '50px 150px' }}>{story()}</div>)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story => (
    <Screener steps={new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>
      {story()}
    </Screener>
  ))
  .addStory('basic', () => (
    <Tooltip visible content="This is a tooltip">
      <button>Target</button>
    </Tooltip>
  ))
  .addStory('text-wrapping', () => (
    <Tooltip visible content="This tooltip's text is long enough to wrap to a new line">
      <button>Target</button>
    </Tooltip>
  ))
  .addStory('inverted', () => (
    <Tooltip visible appearance="inverted" content="Inverted tooltip">
      <button>Target</button>
    </Tooltip>
  ))
  .addStory('withArrow', () => (
    <Tooltip visible withArrow content="Tooltip with an arrow">
      <button>Target</button>
    </Tooltip>
  ))
  .addStory('inverted withArrow', () => (
    <Tooltip visible appearance="inverted" withArrow content="Inverted tooltip with an arrow">
      <button>Target</button>
    </Tooltip>
  ))
  .addStory('positioning', () => <PositioningStory />)
  .addStory('positioning inverted withArrow', () => (
    <PositioningStory appearance="inverted" withArrow />
  ));

storiesOf('Tooltip Converged', module)
  .addDecorator(story => (
    <Screener
      steps={new Steps()
        .hover('.hoverTarget')
        .wait(251)
        .snapshot('hover', { cropTo: '.testWrapper' })
        .focus('.focusTarget')
        .snapshot('focus', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  ))
  .addStory('activation', () => (
    <div style={{ display: 'flex', gap: '5px' }}>
      <Tooltip content="This tooltip appeared on hover">
        <button className="hoverTarget">Hover</button>
      </Tooltip>
      <Tooltip content="This tooltip appeared on focus">
        <button className="focusTarget">Focus</button>
      </Tooltip>
    </div>
  ));
