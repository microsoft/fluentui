import * as React from 'react';
import { Button } from './Button';
import { ButtonVariantsType } from './ButtonVariants.types';

export const DefaultButton: ButtonVariantsType = props => {
  const { text, iconProps, ...rest } = props;

  return <Button content={text} icon={iconProps} {...rest} />;
};
