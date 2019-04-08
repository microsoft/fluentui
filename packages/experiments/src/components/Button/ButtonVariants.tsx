import * as React from 'react';
import { Button } from './Button';
import { IButtonProps } from './Button.types';

export interface IButtonVariantProps extends IButtonProps {
  text?: string;
}

export type ButtonVariantsType = (props: IButtonVariantProps) => JSX.Element;

export const DefaultButton: ButtonVariantsType = props => {
  const { text, ...rest } = props;

  return <Button content={text} {...rest} />;
};

export const PrimaryButton: ButtonVariantsType = props => {
  const { text, ...rest } = props;

  return <Button primary content={text} {...rest} />;
};
