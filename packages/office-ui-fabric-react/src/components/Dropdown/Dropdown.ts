import { styled } from '../../Utilities';
import { DropdownBase } from './Dropdown.base';
import { getStyles } from './Dropdown.styles';
import { IDropdownStyleProps } from './Dropdown.types';

export const OverflowSet: (props: IDropdownStyleProps) => JSX.Element = styled(DropdownBase, getStyles);
