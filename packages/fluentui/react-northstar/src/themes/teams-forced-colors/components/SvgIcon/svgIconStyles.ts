import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { SvgIconStylesProps } from '../../../../components/SvgIcon/SvgIcon';
import { SvgIconVariables } from '../../../teams/components/SvgIcon/svgIconVariables';

export const svgIconStyles: ComponentSlotStylesPrepared<SvgIconStylesProps, SvgIconVariables> = {
  root: () => ({
    '& svg': {
      forcedColorAdjust: 'auto',
    },
  }),
};
