import { pxToRem } from '../../../../utils';
import type { SizeValue } from '../../../../utils';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { AvatarStylesProps } from '../../../../components/Avatar/Avatar';
import type { AvatarVariables } from './avatarVariables';

const sizeToPxValue: Record<SizeValue, number> = {
  smallest: 20,
  smaller: 24,
  small: 28,
  medium: 32,
  large: 44,
  larger: 64,
  largest: 96,
};

export const avatarStyles: ComponentSlotStylesPrepared<AvatarStylesProps, AvatarVariables> = {
  root: ({ props: { size } }): ICSSInJSStyle => {
    const sizeInRem = pxToRem(sizeToPxValue[size]);

    return {
      position: 'relative',
      backgroundColor: 'inherit',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: sizeInRem,
      width: sizeInRem,
    };
  },
};
