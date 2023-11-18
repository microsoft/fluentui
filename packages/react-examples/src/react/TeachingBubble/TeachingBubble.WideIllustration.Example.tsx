import * as React from 'react';
import { IImageProps } from '@fluentui/react/lib/Image';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { useBoolean, useId } from '@fluentui/react-hooks';

const examplePrimaryButtonProps: IButtonProps = {
  children: 'Try it out',
};

const exampleImageProps: IImageProps = {
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/154x220.png',
  alt: 'Example placeholder image',
};

const CalloutProps = { directionalHint: DirectionalHint.bottomCenter };

export const TeachingBubbleWideIllustrationExample: React.FunctionComponent = () => {
  const buttonId = useId('targetButton');
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
    () => ({
      children: 'Maybe later',
      onClick: toggleTeachingBubbleVisible,
    }),
    [toggleTeachingBubbleVisible],
  );

  return (
    <div>
      <DefaultButton
        id={buttonId}
        onClick={toggleTeachingBubbleVisible}
        text={teachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
      />

      {teachingBubbleVisible && (
        <TeachingBubble
          illustrationImage={exampleImageProps}
          calloutProps={CalloutProps}
          isWide={true}
          hasSmallHeadline={true}
          hasCloseButton={true}
          closeButtonAriaLabel="Close"
          target={`#${buttonId}`}
          primaryButtonProps={examplePrimaryButtonProps}
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
