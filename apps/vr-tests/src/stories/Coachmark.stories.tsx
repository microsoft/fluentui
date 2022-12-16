import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { FabricDecorator } from '../utilities';
import { Coachmark, DirectionalHint, TeachingBubbleContent, Fabric } from 'office-ui-fabric-react';
import { useId } from '@uifabric/react-hooks';
import { DefaultButton } from 'office-ui-fabric-react';

const CoachmarkUsage = ({ isCollapsed = true }: { isCollapsed?: boolean }) => {
  const targetId = useId();
  return (
    <>
      <div id={targetId}>
        <DefaultButton text="Click me!" />
      </div>
      <Coachmark
        target={`#${targetId}`}
        positioningContainerProps={{
          directionalHint: DirectionalHint.rightTopEdge,
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
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.ms-PositioningContainer' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Collapsed', () => (
    <Fabric>
      <CoachmarkUsage />
    </Fabric>
  ));
