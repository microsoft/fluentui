import { clsx } from 'clsx';
import { slot } from '@fluentui/react-utilities';

import { componentMarkers } from '../../utils/groupMarker';
import type { ListItemState } from './ListItem.types';
import { ListItemCheckmark } from './ListItemCheckmark';

import styles from './ListItem.module.css';

export const listItemClassNames: { root: string } = {
  root: componentMarkers('list-item'),
};

export const useListItemStyles = (state: ListItemState): ListItemState => ({
  ...state,
  // Both channels must agree; assertSlots restores the components entry in development.
  // eslint-disable-next-line @typescript-eslint/no-deprecated -- preserve the headless root element type
  components: { ...state.components, checkmark: ListItemCheckmark },
  root: { ...state.root, className: clsx(listItemClassNames.root, styles.root, state.root.className) },
  checkmark: state.checkmark && slot.always(state.checkmark, { elementType: ListItemCheckmark }),
});
