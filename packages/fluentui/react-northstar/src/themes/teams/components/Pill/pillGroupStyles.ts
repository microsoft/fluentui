import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { PillIconStylesProps } from '../../../../components/Pill/PillIcon';
import { PillVariables } from './pillVariables';

export const pillGroupStyles: ComponentSlotStylesPrepared<PillIconStylesProps, PillVariables> = {
  root: (): ICSSInJSStyle => ({
    display: 'flex',
  }),
};
