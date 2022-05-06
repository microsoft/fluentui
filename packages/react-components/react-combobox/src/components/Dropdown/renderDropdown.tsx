import { renderComboboxBase_unstable } from '../ComboboxBase/renderComboboxBase';
import type { DropdownState } from './Dropdown.types';

/**
 * Render the final JSX of Dropdown
 */
export const renderDropdown_unstable = (state: DropdownState) => {
  return renderComboboxBase_unstable(state);
};
