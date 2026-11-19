import { renderTree_unstable } from '@fluentui/react-tree';
import type { JSXElement } from '@fluentui/react-utilities';

import type { TreeContextValues, TreeState } from './Tree.types';

/**
 * Renders the final JSX of the Tree component, given the state and context values.
 *
 * A closed subtree is not rendered.
 */
export const renderTree: (state: TreeState, contextValues: TreeContextValues) => JSXElement = renderTree_unstable;
