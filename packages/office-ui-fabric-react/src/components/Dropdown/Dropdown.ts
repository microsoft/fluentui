import { styled } from '../../Utilities';
import { DropdownBase } from './Dropdown.base';
import { getStyles } from './Dropdown.styles';
import { IDropdownProps } from './Dropdown.types';

export const Dropdown: (props: IDropdownProps) => JSX.Element = styled(DropdownBase, getStyles);
