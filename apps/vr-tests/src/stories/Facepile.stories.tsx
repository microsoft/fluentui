import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import {
  Facepile,
  PersonaInitialsColor,
  PersonaSize,
  OverflowButtonType,
  IFacepileProps,
} from '@fluentui/react';

import { TestImages } from '@fluentui/example-data';

const facepilePersonas = [
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Annie Lindqvist',
    data: '50%',
  },
  {
    imageUrl: TestImages.personaFemale,
    personaName: 'Aaron Reid',
    data: '$1,000',
  },
  {
    personaName: 'Alex Lundberg',
    data: '75%',
  },
  {
    personaName: 'Roko Kolar',
    data: '4 hrs',
  },
  {
    imageInitials: 'CB',
    personaName: 'Christian Bergqvist',
    initialsColor: PersonaInitialsColor.green,
    data: '25%',
  },
  {
    imageUrl: TestImages.personaFemale,
    imageInitials: 'VL',
    personaName: 'Valentina Lovric',
    initialsColor: PersonaInitialsColor.lightBlue,
    data: 'Emp1234',
  },
];

const facepileProps: IFacepileProps = {
  personas: facepilePersonas,
  ariaDescription: 'To move through the items use left and right arrow keys.',
};

storiesOf('Facepile', module)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Root', () => <Facepile {...facepileProps} />, { includeRtl: true })
  .addStory('Extra extra small', () => (
    <Facepile {...facepileProps} personaSize={PersonaSize.size24} />
  ))
  .addStory('Overflow', () => (
    <Facepile
      {...facepileProps}
      maxDisplayablePersonas={3}
      overflowButtonType={OverflowButtonType.downArrow}
      overflowButtonProps={{
        ariaLabel: 'More users',
      }}
    />
  ))
  .addStory('Add face', () => <Facepile {...facepileProps} showAddButton={true} />)
  .addStory('Custom button styles', () => (
    <Facepile
      {...facepileProps}
      showAddButton
      overflowButtonType={OverflowButtonType.descriptive}
      maxDisplayablePersonas={3}
      overflowButtonProps={{
        styles: {
          root: { background: 'yellow' },
        },
      }}
      addButtonProps={{
        styles: {
          root: { boxShadow: '0px 0px 5px 5px gray' },
        },
      }}
      styles={{
        descriptiveOverflowButton: {
          background: 'red', // overridden by overflowButtonProps
          boxShadow: '0px 0px 5px 5px gray', // not overridden
          marginLeft: 8, // not overridden
        },
        addButton: {
          boxShadow: '0px 0px 5px 5px red', // overridden by addButtonProps
          marginRight: 8, // not overridden
        },
      }}
    />
  ));
