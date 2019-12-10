import * as React from 'react';
import { BaseButton } from './../BaseButton';
import { ProviderContext } from '../Provider';
import { mergeCss } from '@uifabric/merge-styles';

export const FluentButton: React.FunctionComponent<any> = props => {
  const theme = (React.useContext(ProviderContext) as any)!;
  const rootClassName = mergeCss({
    fontFamily: theme.typography.fontFace,
    fontSize: theme.typography.ramp[5],
    backgroundColor: theme.colors.brand.strongest(),
    color: theme.colors.neutral.weakest()
  });
  const baseButtonProps = {
    ...props,
    slotProps: {
      ...(props.slotProps || {}),
      root: {
        className: rootClassName
      }
    }
  };
  return <BaseButton {...baseButtonProps} />;
};
