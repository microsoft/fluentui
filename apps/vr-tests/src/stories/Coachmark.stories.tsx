import * as React from 'react';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { TestWrapperDecorator } from '../utilities/index';
import { Coachmark, DirectionalHint, TeachingBubbleContent, Fabric } from '@fluentui/react';
import { useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

const directionalHints = [
  DirectionalHint.topLeftEdge,
  DirectionalHint.topCenter,
  DirectionalHint.topRightEdge,
  DirectionalHint.rightTopEdge,
  DirectionalHint.rightCenter,
  DirectionalHint.rightBottomEdge,
  DirectionalHint.bottomRightEdge,
  DirectionalHint.bottomCenter,
  DirectionalHint.bottomLeftEdge,
  DirectionalHint.leftBottomEdge,
  DirectionalHint.leftCenter,
  DirectionalHint.leftTopEdge,
];

const CoachmarkUsage = ({
  isCollapsed = true,
  directionalHint = DirectionalHint.rightTopEdge,
}: {
  isCollapsed?: boolean;
  directionalHint?: DirectionalHint;
}) => {
  const targetId = useId();
  return (
    <>
      <div id={targetId}>
        <DefaultButton text="Click me!" />
      </div>
      <Coachmark
        target={`#${targetId}`}
        positioningContainerProps={{
          directionalHint,
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
  })
  .addStory('Positioning', () => {
    return (
      <div style={gridStyles}>
        {directionalHints.map((directionalHint, index) => (
          <div style={{ gridArea: index }} key={index}>
            <CoachmarkUsage isCollapsed={false} directionalHint={directionalHint} />
          </div>
        ))}
      </div>
    );
  });

const gridStyles: React.CSSProperties = {
  display: 'grid',
  gridTemplateAreas: `". 1 2 3 ."
                      "12 . . . 4"
                      "11 . . . 5"
                      "10 . . . 6"
                      ". 9 8 7 ."`,
  gap: '20px',
};
