import type { IRawStyle } from '@fluentui/merge-styles';

export const hiddenContentStyle: IRawStyle = {
  position: 'absolute',
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
};
