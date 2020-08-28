import { Accessibility, AccessibilityDefinition } from '../../types';

/**
 * @specification
 */
export const formFieldBehavior: Accessibility<FormFieldBehaviorProps> = props => {
  const definition: AccessibilityDefinition = {
    attributes: {
      root: {},
      control: {
        ...(props.hasErrorMessage && { 'aria-invalid': true }),
        'aria-labelledby': `${props.labelId}`,
        ...(props.messageId && { 'aria-labelledby': `${props.labelId} ${props.messageId}` }),
      },
      message: {
        ...(props.hasErrorMessage && { role: 'alert' }),
      },
    },
  };

  return definition;
};

export type FormFieldBehaviorProps = {
  /** Field has error message */
  hasErrorMessage?: boolean;

  /** Field message have a id */
  messageId?: string;

  labelId?: string;
};
