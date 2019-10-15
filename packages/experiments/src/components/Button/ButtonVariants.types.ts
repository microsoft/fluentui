import { IButtonProps } from './Button.types';
import { IIconProps } from 'office-ui-fabric-react';

export interface IButtonVariantProps extends IButtonProps {
  iconProps?: IIconProps;
  text?: string;
}

export type ButtonVariantsType = (props: IButtonVariantProps) => JSX.Element;
