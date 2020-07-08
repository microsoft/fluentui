import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import Box, { BoxProps } from '../Box/Box';

type LabelPosition = 'inline' | 'above' | 'internal';

interface InputLabelOwnProps {
  labelPosition?: LabelPosition;
  required?: boolean;
}

export interface InputLabelProps extends BoxProps, InputLabelOwnProps {}
export type InputLabelStylesProps = Required<Pick<InputLabelOwnProps, 'labelPosition' | 'required'>>;

export const InputLabelClassName = 'ui-input__label';

/**
 * An InputLabel provides a slot for label in the Input.
 */
const InputLabel = compose<'label', InputLabelProps, InputLabelStylesProps, BoxProps, {}>(Box, {
  className: InputLabelClassName,
  displayName: 'InputLabel',
  overrideStyles: true,
  mapPropsToStylesProps: ({ labelPosition, required }) => ({
    labelPosition,
    required,
  }),
  handledProps: ['required', 'labelPosition'],
});

InputLabel.defaultProps = {
  as: 'label',
};

InputLabel.propTypes = commonPropTypes.createCommon();

export default InputLabel;
