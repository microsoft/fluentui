import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

interface FormLabelOwnProps {
  inline?: boolean;
  required?: boolean;
}

export interface FormLabelProps extends BoxProps, FormLabelOwnProps {}
export type FormLabelStylesProps = Required<Pick<FormLabelOwnProps, 'inline' | 'required'>>;

export const FormLabelClassName = 'ui-form-label';

/**
 * An FormLabel provides a slot for label in the FormField.
 */
const FormLabel = compose<'label', FormLabelProps, FormLabelStylesProps, BoxProps, {}>(Box, {
  className: FormLabelClassName,
  displayName: 'FormLabel',
  overrideStyles: true,
  mapPropsToStylesProps: ({ inline, required }) => ({
    inline,
    required,
  }),
  handledProps: ['required', 'inline'],
});

FormLabel.defaultProps = {
  as: 'label',
};

FormLabel.propTypes = commonPropTypes.createCommon();

export default FormLabel;
