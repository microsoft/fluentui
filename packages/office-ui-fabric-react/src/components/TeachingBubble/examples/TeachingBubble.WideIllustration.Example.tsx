import * as React from 'react';
import { IImageProps } from 'office-ui-fabric-react/lib/Image';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean } from '@uifabric/react-hooks';

const examplePrimaryButton: IButtonProps = {
  children: 'Try it out',
};

const exampleImageProps: IImageProps = { src: 'http://placehold.it/154x220', alt: 'Example placeholder image' };

export const TeachingBubbleWideIllustrationExample: React.FunctionComponent = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  const exampleSecondaryButtonProps: IButtonProps = {
    children: 'Maybe later',
    onClick: toggleTeachingBubbleVisible,
  };

  return (
    <div className="ms-TeachingBubbleExample">
      <DefaultButton
        id="targetButton"
        onClick={toggleTeachingBubbleVisible}
        text={teachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
      />

      {teachingBubbleVisible && (
        <TeachingBubble
          illustrationImage={exampleImageProps}
          calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
          isWide={true}
          hasSmallHeadline={true}
          hasCloseButton={true}
          closeButtonAriaLabel="Close"
          target="#targetButton"
          primaryButtonProps={examplePrimaryButton}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline="Discover what’s trending around you"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
          harum non?
        </TeachingBubble>
      )}
    </div>
  );
};
