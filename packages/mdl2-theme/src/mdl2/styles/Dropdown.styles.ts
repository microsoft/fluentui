import { IStyle } from 'office-ui-fabric-react/lib/Styling';

const ITEM_HEIGHT = 32;

const commonItemStyles: IStyle = {
  minHeight: ITEM_HEIGHT,
  padding: '4px 16px'
};

export const DropdownStyles = {
  title: {
    padding: `0 32px 0 12px`
  },
  caretDownWrapper: {
    right: 12
  },
  dropdownItemHeader: {
    padding: '0 16px',
    height: ITEM_HEIGHT,
    lineHeight: ITEM_HEIGHT
  },
  dropdownItem: { ...commonItemStyles },
  dropdownItemSelected: { ...commonItemStyles },
  dropdownItemDisabled: { ...commonItemStyles },
  dropdownItemSelectedAndDisabled: { ...commonItemStyles }
};
