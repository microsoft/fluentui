import { styled } from '../../Utilities';
import { DropdownBase } from './Dropdown.base';
import { getStyles } from './Dropdown.styles';
import { IDropdownProps, IDropdownStyleProps, IDropdownStyles } from './Dropdown.types';

export const Dropdown = styled<IDropdownProps, IDropdownStyleProps, IDropdownStyles>(DropdownBase, getStyles, undefined, {
  scope: 'Dropdown'
});
