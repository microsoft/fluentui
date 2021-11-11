import { resolveShorthand } from '@fluentui/react-utilities';
import { CompoundButtonProps, CompoundButtonState } from '@fluentui/react-button';
import { useButtonState } from '../Button/useButtonState';

/**
 * Takes props and returns state for eventually rendering a CompoundButton.
 * @param props - User provided props to the CompoundButton component.
 */
export const useCompoundButtonState = ({
  contentContainer,
  secondaryContent,
  ...buttonProps
}: CompoundButtonProps): CompoundButtonState => ({
  ...useButtonState(buttonProps),

  components: {
    root: 'button',
    icon: 'span',
    contentContainer: 'span',
    secondaryContent: 'span',
  },
  contentContainer: resolveShorthand(contentContainer, { required: true }),
  secondaryContent: resolveShorthand(secondaryContent),
});
