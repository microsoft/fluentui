import { renderListItem_unstable } from '@fluentui/react-list';
import type { JSXElement } from '@fluentui/react-utilities';

import type { ListItemState } from './ListItem.types';

/**
 * Renders the final JSX of the ListItem component, given the state.
 */
export const renderListItem = renderListItem_unstable as (state: ListItemState) => JSXElement;
