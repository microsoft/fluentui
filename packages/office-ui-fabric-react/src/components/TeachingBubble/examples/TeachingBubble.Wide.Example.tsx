import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean } from '@uifabric/react-hooks';

export const TeachingBubbleWideExample: React.FunctionComponent = () => {
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);

  return (
    <div>
      <DefaultButton
        id="targetButton"
        onClick={toggleTeachingBubbleVisible}
        text={teachingBubbleVisible ? 'Hide TeachingBubble' : 'Show TeachingBubble'}
      />

      {teachingBubbleVisible && (
        <TeachingBubble
          calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
          target="#targetButton"
          isWide={true}
          hasCloseButton={true}
          closeButtonAriaLabel="Close"
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
