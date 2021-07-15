import { TextProps } from '../Text/index';

/**
 * Headline Props
 */
export interface HeadlineProps extends Omit<TextProps, 'font' | 'size'> {}
