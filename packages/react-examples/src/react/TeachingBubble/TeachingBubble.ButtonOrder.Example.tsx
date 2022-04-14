import * as React from 'react';
import { DefaultButton, IButtonProps } from '@fluentui/react/lib/Button';
import { TeachingBubble, ITeachingBubbleStyles } from '@fluentui/react/lib/TeachingBubble';
import { useBoolean, useId } from '@fluentui/react-hooks';

const examplePrimaryButtonProps: IButtonProps = {
  children: 'Try it out',
};

export const TeachingBubbleButtonOrderExample: React.FunctionComponent = () => {
  const buttonId = useId('targetButton');
  const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);
  const exampleSecondaryButtonProps: IButtonProps = React.useMemo(
    () => ({
      children: 'Maybe later',
      onClick: toggleTeachingBubbleVisible,
    }),
    [toggleTeachingBubbleVisible],
  );

  const styles: Partial<ITeachingBubbleStyles> = {
    footer: {
      [`& > .ms-StackItem`]: {
        display: 'flex',
        flexDirection: 'row-reverse',
      },
      [`& > .ms-StackItem > .ms-Button:not(:first-child)`]: {
        margin: '0 15px 0 0',
      },
    },
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
          secondaryButtonProps={exampleSecondaryButtonProps}
          onDismiss={toggleTeachingBubbleVisible}
          headline="Discover what’s trending around you"
          styles={styles}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere, nulla, ipsum? Molestiae quis aliquam magni
          harum non?
        </TeachingBubble>
      )}
    </div>
  );
};
