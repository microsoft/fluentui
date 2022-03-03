import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { CompoundButton } from '@fluentui/react-button';
import { Story } from '@storybook/react';

const steps = new Screener.Steps()
  .snapshot('default', { cropTo: '.testWrapper' })
  .hover('#button-id')
  .snapshot('hover', { cropTo: '.testWrapper' })
  .mouseDown('#button-id')
  .snapshot('pressed', { cropTo: '.testWrapper' })
  .end();

const buttonId = 'button-id';

const decorators = [(story: any) => <Screener steps={steps}>{story()}</Screener>];

export default {
  title: 'CompoundButton Converged',
  component: CompoundButton,
};

export const Default = () => {
  return (
    <CompoundButton id={buttonId} secondaryContent="This is some secondary text">
      Hello, world
    </CompoundButton>
  );
};

Default.decorators = decorators;

// storiesOf('CompoundButton Converged', module)
//   .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
//   .addStory(
//     'Default',
//     () => (
//       <CompoundButton id={buttonId} secondaryContent="This is some secondary text">
//         Hello, world
//       </CompoundButton>
//     ),
//     { includeRtl: true },
//   )
//   .addStory('Circular', () => (
//     <CompoundButton shape="circular" id={buttonId} secondaryContent="This is some secondary text">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Outline', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Primary', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Subtle', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Transparent', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Disabled', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Outline Disabled', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="outline" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Primary Disabled', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="primary" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Subtle Disabled', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="subtle" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Transparent Disabled', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" appearance="transparent" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Size small', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" size="small">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Size large', () => (
//     <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" size="large">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory(
//     'With icon before content',
//     () => (
//       <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X">
//         Hello, world
//       </CompoundButton>
//     ),
//     { includeRtl: true },
//   )
//   .addStory(
//     'With icon after content',
//     () => (
//       <CompoundButton id={buttonId} secondaryContent="This is some secondary text" icon="X" iconPosition="after">
//         Hello, world
//       </CompoundButton>
//     ),
//     { includeRtl: true },
//   )
//   .addStory('Icon only', () => <CompoundButton id={buttonId} icon="X" />)
//   .addStory('Circular and icon only', () => <CompoundButton id={buttonId} shape="circular" icon="X" />, {
//     includeRtl: true,
//   });

// storiesOf('CompoundButton Block Converged', module)
//   .addDecorator(story => <Screener steps={steps}>{story()}</Screener>)
//   .addStory(
//     'Default',
//     () => (
//       <CompoundButton id={buttonId} block secondaryContent="This is some secondary text">
//         Hello, world
//       </CompoundButton>
//     ),
//     { includeRtl: true },
//   )
//   .addStory('Circular', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" shape="circular">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Outline', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="outline">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Primary', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="primary">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Subtle', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="subtle">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Transparent', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" appearance="transparent">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Disabled', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" disabled>
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Size small', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" icon="X" size="small">
//       Hello, world
//     </CompoundButton>
//   ))
//   .addStory('Size large', () => (
//     <CompoundButton id={buttonId} block secondaryContent="This is some secondary text" icon="X" size="large">
//       Hello, world
//     </CompoundButton>
//   ));
