import { TextProps } from '../Text/index';

/**
 * Body Props
 */
export interface BodyProps extends Omit<TextProps, 'font' | 'size'> {}
