import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../../utilities/TestWrapperDecorator';
import { Steps, StoryWright } from 'storywright';
import { ILegend, Legends } from '@fluentui/react-charting';

storiesOf('react-charting/Legend', module)
  .addDecorator((story, context) => TestWrapperDecorator(story, context))
  .addDecorator((story, context) => {
    const steps = context.name.includes('Overflow')
      ? new Steps()
          .snapshot('default', { cropTo: '.testWrapper' })
          .executeScript(
            // eslint-disable-next-line @fluentui/max-len
            `document.querySelectorAll('div[class^="overflowIndicationTextStyle"]')[0].click()`,
          )
          .snapshot('expanded', { cropTo: '.testWrapper' })
          .end()
      : new Steps().snapshot('default', { cropTo: '.testWrapper' }).end();
    return <StoryWright steps={steps}>{story()}</StoryWright>;
  })
  .addStory(
    'Basic',
    () => {
      const legends: ILegend[] = [
        {
          title: 'fsd 1',
          color: '#0078d4',
          action: () => {
            console.log('click from LegendsPage');
            alert('Legend1 clicked');
          },
          onMouseOutAction: () => {
            console.log('On mouse out action');
          },
          hoverAction: () => {
            console.log('hover action');
          },
        },
        {
          title: 'Legend 2',
          color: '#e81123',
          action: () => {
            alert('Legend2 clicked');
          },
          hoverAction: () => {
            console.log('hover action');
          },
        },
        {
          title: 'Legend 3',
          color: '#107c10',
          action: () => {
            alert('Legend3 clicked');
          },
          hoverAction: () => {
            console.log('hover action');
          },
          shape: 'diamond',
        },
        {
          title: 'Legend 4',
          color: '#ffb900',
          shape: 'triangle',
          action: () => {
            alert('Legend4 clicked');
          },
          hoverAction: () => {
            console.log('hover action');
          },
        },
      ];

      return (
        <div style={{ padding: 10, width: 400 }}>
          <Legends legends={legends} />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  )
  .addStory(
    'Overflow',
    () => {
      const legends: ILegend[] = [
        {
          title: 'Legend 1',
          color: '#e81123',
          action: () => {
            console.log('Legend1 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend1');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 2',
          color: '#107c10',
          action: () => {
            console.log('Legend2 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend2');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 3',
          color: '#ffb900',
          action: () => {
            console.log('Legend3 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend3');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 4',
          color: '#0078d4',
          action: () => {
            console.log('Legend4 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend4');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 5',
          color: '#b4a0ff',
          action: () => {
            console.log('Legend5 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend5');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 6',
          color: '#ea4300',
          action: () => {
            console.log('Legend6 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend6');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 7',
          color: '#b4009e',
          action: () => {
            console.log('Legend7 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend7');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 8',
          color: '#005a9e',
          action: () => {
            console.log('Legend8 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend8');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 9',
          color: '#a4262c',
          action: () => {
            console.log('Legend9 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend9');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 10',
          color: '#00188f',
          action: () => {
            console.log('Legend10 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend10');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 11',
          color: 'rgba(0,0,0,.4)',
          action: () => {
            console.log('Legend11 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend11');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 12',
          color: '#004b1c',
          action: () => {
            console.log('Legend12 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend12');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 13',
          color: '#fff100',
          action: () => {
            console.log('Legend13 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend13');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 14',
          color: '#e3008c',
          action: () => {
            console.log('Legend14 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend14');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 15',
          color: '#32145a',
          action: () => {
            console.log('Legend15 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend15');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 16',
          color: '#00188f',
          action: () => {
            console.log('Legend16 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend16');
          },
          onMouseOutAction: () => undefined,
        },
        {
          title: 'Legend 17',
          color: '#0078d4',
          action: () => {
            console.log('Legend17 clicked');
          },
          hoverAction: () => {
            console.log('Hover action for legend17');
          },
          onMouseOutAction: () => undefined,
        },
      ];

      return (
        <div style={{ width: 400, height: 600, padding: 10, display: 'flex' }}>
          <Legends
            legends={legends}
            overflowText={'Overflow Items'}
            allowFocusOnLegends={true}
            canSelectMultipleLegends={false}
          />
        </div>
      );
    },
    { includeDarkMode: true, includeRtl: true },
  );
