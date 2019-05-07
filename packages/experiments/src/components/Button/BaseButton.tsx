import * as React from 'react';
import { Button } from './Button';
import { IButtonComponent, IButtonStylesReturnType, IButtonTokenReturnType } from './Button.types';
import { ButtonVariantsType } from './ButtonVariants.types';

const baseTokens: IButtonComponent['tokens'] = {
  backgroundColor: undefined,
  backgroundColorHovered: undefined,
  backgroundColorPressed: undefined,
  borderColor: undefined,
  borderColorHovered: undefined,
  borderColorPressed: undefined,
  borderRadius: undefined,
  borderWidth: 2,
  color: undefined,
  colorHovered: undefined,
  colorPressed: undefined,
  contentPadding: 0,
  cursor: 'default',
  minHeight: undefined,
  minWidth: undefined,
  textFamily: 'Arial',
  textSize: 13.3333,
  textWeight: 400
};

const disabledTokens: IButtonComponent['tokens'] = {
  color: 'grayText',
  colorHovered: 'grayText',
  colorPressed: 'grayText'
};

const BaseButtonTokens: IButtonComponent['tokens'] = (props, theme): IButtonTokenReturnType => [
  baseTokens,
  props.disabled && disabledTokens
];

const BaseButtonStyles: IButtonComponent['styles'] = (props, theme, tokens): IButtonStylesReturnType => {
  const { disabled } = props;

  return {
    root: {
      borderStyle: 'outset',
      overflow: 'visible',
      padding: '1px 6px',

      selectors: {
        ':active': {
          borderStyle: disabled ? 'outset' : 'inset',
          outline: 'none'
        }
      }
    }
  };
};

export const BaseButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button content={text} icon={iconProps} tokens={BaseButtonTokens} styles={BaseButtonStyles} {...rest} />;
};
