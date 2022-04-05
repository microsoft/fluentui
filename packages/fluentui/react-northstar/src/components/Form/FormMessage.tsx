import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';

interface FormMessageOwnProps {
  error?: boolean;
}

export interface FormMessageProps extends BoxProps, FormMessageOwnProps {}

export type FormMessageStylesProps = Required<Pick<FormMessageOwnProps, 'error'>>;

export const formMessageClassName = 'ui-form__message';

/**
 * An FormMessage provides a slot for message in the FormField.
 */
export const FormMessage = compose<'span', FormMessageProps, FormMessageStylesProps, BoxProps, {}>(Box, {
  className: formMessageClassName,
  displayName: 'FormMessage',

  mapPropsToStylesProps: ({ error }) => ({ error }),
  handledProps: ['error'],

  overrideStyles: true,
  shorthandConfig: {
    mappedProp: 'content',
  },
});

FormMessage.defaultProps = {
  as: 'span',
};
FormMessage.propTypes = commonPropTypes.createCommon();
