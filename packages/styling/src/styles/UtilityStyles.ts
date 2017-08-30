import { IExtendedRawStyle } from '@uifabric/merge-styles/lib/index';

export const hideText: IExtendedRawStyle = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  opacity: .0001,
  border: '0'
};
