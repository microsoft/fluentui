import { Accessibility, AccessibilityDefinition } from '../../types';

/**
 * @specification
 */
const formFieldBehavior: Accessibility<FormFieldBehaviorProps> = props => {
  const definition: AccessibilityDefinition = {
    attributes: {
      root: {},
      control: {
        ...(props.hasErrorMessage && { 'aria-invalid': true }),
      },
    },
  };

  return definition;
};

export default formFieldBehavior;

export type FormFieldBehaviorProps = {
  /** Field has error message */
  hasErrorMessage?: boolean;
};
