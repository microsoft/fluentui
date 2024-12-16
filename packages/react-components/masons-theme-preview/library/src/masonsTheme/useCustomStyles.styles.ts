import { CustomStyleHooksContextValue } from '../../../../react-shared-contexts/library/src/CustomStyleHooksContext';
import { useCustomMenuGroupHeaderStyles } from '../componentStyles/MenuGroupHeader.styles';
import { useCustomMenuItemStyles } from '../componentStyles/MenuItem.styles';
import { useCustomMenuPopoverStyles } from '../componentStyles/MenuPopover.styles';

export const MasonsCustomStyleHooks: CustomStyleHooksContextValue = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useMenuPopoverStyles_unstable: useCustomMenuPopoverStyles,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  useMenuItemStyles_unstable: useCustomMenuItemStyles,

  // eslint-disable-next-line @typescript-eslint/naming-convention
  useMenuGroupHeaderStyles_unstable: useCustomMenuGroupHeaderStyles,
};
