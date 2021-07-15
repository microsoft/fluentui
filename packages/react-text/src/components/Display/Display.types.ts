import { TextProps } from '../Text/index';

/**
 * Display Props
 */
export interface DisplayProps extends Omit<TextProps, 'font' | 'size'> {}
