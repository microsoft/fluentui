import * as React from 'react';
import { IImageProps } from '@fluentui/react/lib/Image';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean, useId } from '@fluentui/react-hooks';

const exampleImageProps: IImageProps = {
  src: 'https://fabricweb.azureedge.net/fabric-website/placeholders/364x180.png',
  alt: 'Example placeholder image',
};

const examplePrimaryButtonProps: IButtonProps = {
  children: 'Try it out',
};

export const TeachingBubbleIllustrationExample: React.FunctionComponent = () => {
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
          target={`#${buttonId}`}
          illustrationImage={exampleImageProps}
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
