/*! Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license. */
import * as React from 'react';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import {
  Coachmark,
  DefaultButton,
  DirectionalHint,
  TeachingBubbleContent,
  Fabric,
} from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';

const CoachmarkUsage = ({ isCollapsed = true }: { isCollapsed?: boolean }) => {
  const targetId = useId();
  return (
    <>
      <div id={targetId}>
        <DefaultButton />
      </div>
      <Coachmark
        target={`#${targetId}`}
        positioningContainerProps={{
          directionalHint: DirectionalHint.bottomCenter,
          doNotLayer: false,
        }}
        ariaAlertText="A Coachmark has appeared"
        ariaDescribedBy={'coachmark-desc1'}
        ariaLabelledBy={'coachmark-label1'}
        ariaDescribedByText={'Press enter or alt + C to open the Coachmark notification'}
        ariaLabelledByText={'Coachmark notification'}
        isCollapsed={isCollapsed}
      >
        <TeachingBubbleContent
          headline="Example Title"
          hasCloseButton={true}
          closeButtonAriaLabel="Close"
          primaryButtonProps={{
            text: 'Try it',
          }}
          secondaryButtonProps={{
            text: 'Try it',
          }}
          ariaDescribedBy={'example-description1'}
          ariaLabelledBy={'example-label1'}
        >
          Welcome to the land of Coachmarks!
        </TeachingBubbleContent>
      </Coachmark>
    </>
  );
};

storiesOf('Coachmark', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>,
  )
  .addStory('Collapsed', () => (
    <Fabric>
      <CoachmarkUsage />
    </Fabric>
  ))
  .addStory('Expanded', () => (
    <Fabric>
      <CoachmarkUsage isCollapsed={false} />
    </Fabric>
  ));
