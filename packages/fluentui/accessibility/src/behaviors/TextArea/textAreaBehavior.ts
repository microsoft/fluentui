import { Accessibility } from '../../types';
/**
 * @specification
 * Adds attribute 'aria-disabled=true' based on the property 'disabled'.
 */
const textAreaBehavior: Accessibility<TextAreaBehaviorProps> = props => ({
  attributes: {
    root: {
      'aria-disabled': props.disabled,
    },
  },
});

export default textAreaBehavior;

type TextAreaBehaviorProps = {
  disabled?: boolean;
};
