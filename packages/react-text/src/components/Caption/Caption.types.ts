import { TextProps } from '../Text/index';

/**
 * Caption Props
 */
export interface CaptionProps extends Omit<TextProps, 'font' | 'size'> {}
