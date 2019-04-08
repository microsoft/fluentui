import * as React from 'react';
import { Button } from './Button';
import { ButtonVariantsType } from './ButtonVariants.types';

export const PrimaryButton: ButtonVariantsType = props => {
  const { text, ...rest } = props;

  return <Button primary content={text} {...rest} />;
};
