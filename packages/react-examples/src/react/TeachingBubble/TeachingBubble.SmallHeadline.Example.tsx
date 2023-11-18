import * as React from 'react';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { TeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean, useId } from '@fluentui/react-hooks';

export const TeachingBubbleSmallHeadlineExample: React.FunctionComponent = () => {
  const buttonId = useId('targetButton');
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  const examplePrimaryButtonProps: IButtonProps = {
    children: 'Try it out',
    onClick: toggleTeachingBubbleVisible,
  };

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
          primaryButtonProps={examplePrimaryButtonProps}
          hasSmallHeadline={true}
          onDismiss={toggleTeachingBubbleVisible}
          headline="Discover what’s trending around you"
          closeButtonAriaLabel="Close"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
          harum non?
        </TeachingBubble>
      )}
    </div>
  );
};
