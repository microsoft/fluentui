import { compose, ComponentWithAs, ShorthandConfig } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

interface FormLabelOwnProps {
  inline?: boolean;
  required?: boolean;
  type?: string;
}

export interface FormLabelProps extends BoxProps, FormLabelOwnProps {}
export type FormLabelStylesProps = Required<Pick<FormLabelOwnProps, 'inline' | 'required' | 'type'>>;

export const FormLabelClassName = 'ui-form-label';

const FormLabel = compose<'label', FormLabelProps, FormLabelStylesProps, BoxProps, {}>(Box, {
  className: FormLabelClassName,
  displayName: 'FormLabel',
  overrideStyles: true,
  mapPropsToStylesProps: ({ inline, required, type }) => ({
    inline,
    required,
    type,
  }),
  handledProps: ['required', 'inline'],
}) as ComponentWithAs<'label', FormLabelProps> & { shorthandConfig: ShorthandConfig<FormLabelProps> };

FormLabel.defaultProps = {
  as: 'label',
};
FormLabel.propTypes = commonPropTypes.createCommon();

FormLabel.shorthandConfig = {
  mappedProp: 'content',
};

export default FormLabel;
