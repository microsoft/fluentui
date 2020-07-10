import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

export type LabelPosition = 'inline' | 'above' | 'inside';

interface InputLabelOwnProps {
  labelPosition?: LabelPosition;
  required?: boolean;
  inputValue?: boolean;
}

export interface InputLabelProps extends BoxProps, InputLabelOwnProps {}
export type InputLabelStylesProps = Required<Pick<InputLabelOwnProps, 'labelPosition' | 'required' | 'inputValue'>>;

export const inputLabelClassName = 'ui-input__label';

/**
 * An InputLabel provides a slot for label in the Input.
 */
const InputLabel = compose<'label', InputLabelProps, InputLabelStylesProps, BoxProps, {}>(Box, {
  className: inputLabelClassName,
  displayName: 'InputLabel',
  overrideStyles: true,
  mapPropsToStylesProps: ({ labelPosition, required, inputValue }) => ({
    labelPosition,
    required,
    inputValue,
  }),
  handledProps: ['required', 'labelPosition', 'inputValue'],
});

InputLabel.defaultProps = {
  as: 'label',
};

InputLabel.propTypes = commonPropTypes.createCommon();

export default InputLabel;
