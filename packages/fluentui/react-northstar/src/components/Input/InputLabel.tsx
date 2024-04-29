import { compose } from '@fluentui/react-bindings';
import { commonPropTypes } from '../../utils';
import { Box, BoxProps } from '../Box/Box';
import * as PropTypes from 'prop-types';

export type LabelPosition = 'inline' | 'above' | 'inside';

interface InputLabelOwnProps {
  labelPosition?: LabelPosition;
  required?: boolean;
  hasValue?: boolean;
}

export interface InputLabelProps extends BoxProps, InputLabelOwnProps {}
export type InputLabelStylesProps = Required<Pick<InputLabelOwnProps, 'labelPosition' | 'required' | 'hasValue'>>;

export const inputLabelClassName = 'ui-input__label';

/**
 * An InputLabel provides a slot for label in the Input.
 */
export const InputLabel = compose<'label', InputLabelProps, InputLabelStylesProps, BoxProps, {}>(Box, {
  className: inputLabelClassName,
  displayName: 'InputLabel',
  overrideStyles: true,
  mapPropsToStylesProps: ({ labelPosition, required, hasValue }) => ({
    labelPosition,
    required,
    hasValue,
  }),
  handledProps: ['required', 'labelPosition', 'hasValue'],
  shorthandConfig: {
    mappedProp: 'content',
  },
});

InputLabel.defaultProps = {
  as: 'label',
};

InputLabel.propTypes = {
  ...commonPropTypes.createCommon(),
  labelPosition: PropTypes.oneOf<LabelPosition>(['inline', 'above', 'inside']),
  required: PropTypes.bool,
  hasValue: PropTypes.bool,
};
