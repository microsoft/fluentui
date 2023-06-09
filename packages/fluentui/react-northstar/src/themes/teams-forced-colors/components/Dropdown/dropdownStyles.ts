import { ComponentSlotStylesPrepared } from '@fluentui/styles';
import { DropdownStylesProps } from '../../../../components/Dropdown/Dropdown';
import { DropdownVariables } from '../../../teams/components/Dropdown/dropdownVariables';

export const dropdownStyles: ComponentSlotStylesPrepared<DropdownStylesProps, DropdownVariables> = {
  triggerButton: () => ({
    border: 'none', // there is already border around the whole Dropdown
  }),
};
