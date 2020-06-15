import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

interface FormMessageOwnProps {
  error?: boolean;
}

export interface FormMessageProps extends BoxProps, FormMessageOwnProps {}

export type FormMessageStylesProps = Required<Pick<FormMessageOwnProps, 'error'>>;

export const FormMessageClassName = 'ui-form-mesage';

const FormMessage = compose<'span', FormMessageProps, FormMessageStylesProps, BoxProps, {}>(Box, {
  className: FormMessageClassName,
  displayName: 'FormMessage',
  mapPropsToStylesProps: ({ error }) => ({ error }),
  handledProps: ['error'],
  overrideStyles: true,
}) as ComponentWithAs<'span', FormMessageProps> & { shorthandConfig: ShorthandConfig<FormMessageProps> };

FormMessage.defaultProps = {
  as: 'span',
};
FormMessage.propTypes = commonPropTypes.createCommon();

FormMessage.shorthandConfig = {
  mappedProp: 'content',
};

export default FormMessage;
