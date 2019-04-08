import { IButtonProps } from './Button.types';

export interface IButtonVariantProps extends IButtonProps {
  text?: string;
}

export type ButtonVariantsType = (props: IButtonVariantProps) => JSX.Element;
