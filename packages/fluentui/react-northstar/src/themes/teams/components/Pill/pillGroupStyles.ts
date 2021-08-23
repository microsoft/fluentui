import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { PillIconStylesProps } from '../../../../components/Pill/PillIcon';
import type { PillVariables } from './pillVariables';

export const pillGroupStyles: ComponentSlotStylesPrepared<PillIconStylesProps, PillVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
  }),
};
