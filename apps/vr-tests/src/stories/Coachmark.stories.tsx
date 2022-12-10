import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Coachmark, DirectionalHint, TeachingBubbleContent, Fabric } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

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
  .addDecorator(TestWrapperDecorator)
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
  ))
  .addStory('Rendering Coachmark attached to a rectangle', () => {
    const rectangle = {
      left: 50,
      right: 150,
      top: 50,
      bottom: 100,
    };
    const divStyles: React.CSSProperties = {
      background: 'red',
      position: 'absolute',
      left: rectangle.left,
      top: rectangle.top,
      width: rectangle.right - rectangle.left,
      height: rectangle.bottom - rectangle.top,
    };
    const positioningContainerProps = { directionalHint: DirectionalHint.topCenter };

    return (
      <>
        <div style={divStyles} />
        <Coachmark target={rectangle} positioningContainerProps={positioningContainerProps} />
      </>
    );
  });
