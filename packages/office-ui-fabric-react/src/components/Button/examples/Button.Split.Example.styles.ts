import { memoizeFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';

export const getCustomSplitButtonStyles = memoizeFunction((): IButtonStyles => {
  return {
    splitButtonMenuButton: { backgroundColor: 'white', width: '10px' },
    splitButtonMenuIcon: { fontSize: '7px' },
    splitButtonDivider: { borderLeft: '1px solid #c8c8c8' }
  }
});