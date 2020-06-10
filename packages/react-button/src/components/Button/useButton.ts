import { ButtonProps } from './Button.types';
import { ComposeOptions } from '@fluentui/react-compose';
/**
 * The useButton hook processes the Button component props and returns state.
 * @param props
 */
export const useButton: ComposeOptions<ButtonProps, ButtonProps, {}, {}>['state'] = props => props;
