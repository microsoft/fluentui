import * as React from 'react';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { useBoolean } from '@uifabric/react-hooks';

const examplePrimaryButton: IButtonProps = {
  children: 'Next',
};
export const TeachingBubbleMultiStepExample: React.FunctionComponent = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

  const exampleSecondaryButtonProps: IButtonProps = {
    children: 'Previous',
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
          target="#targetButton"
          primaryButtonProps={examplePrimaryButton}
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          footerContent="2 of 3"
          headline="Discover what’s trending around you"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
          harum non?
        </TeachingBubble>
      )}
    </div>
  );
};
