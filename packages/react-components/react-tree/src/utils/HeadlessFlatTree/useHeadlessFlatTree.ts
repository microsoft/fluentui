import { useHeadlessRootFlatTree_unstable } from './useHeadlessRootFlatTree';
import { useHeadlessSubFlatTree_unstable } from './useHeadlessSubFlatTree';
import { useSubtreeContext_unstable } from '../../contexts/index';
import type { HeadlessTreeItemProps } from '../HeadlessTree';
import type {
  HeadlessFlatTree,
  HeadlessFlatTreeOptions,
  HeadlessRootFlatTree,
  HeadlessRootFlatTreeOptions,
  HeadlessSubFlatTree,
  HeadlessSubFlatTreeOptions,
} from './types';
import { headlessTreeRootId } from '../tokens';

/**
 * this hook provides FlatTree API to manage all required mechanisms to convert a list of items into renderable TreeItems
 * in multiple scenarios including virtualization.
 *
 * !! A flat tree is an unofficial spec for tree!!
 *
 * It should be used on cases where more complex interactions with a Tree is required.
 * On simple scenarios it is advised to simply use a nested structure instead.
 *
 * @param props - a list of tree items
 * @param options - in case control over the internal openItems is required
 */
export function useHeadlessFlatTree_unstable<Props extends HeadlessTreeItemProps = HeadlessTreeItemProps>(
  props: Props[],
  options?: HeadlessRootFlatTreeOptions,
): HeadlessRootFlatTree<Props>;
export function useHeadlessFlatTree_unstable<Props extends HeadlessTreeItemProps = HeadlessTreeItemProps>(
  props: Props[],
  options?: HeadlessSubFlatTreeOptions,
): HeadlessSubFlatTree<Props>;
export function useHeadlessFlatTree_unstable<Props extends HeadlessTreeItemProps = HeadlessTreeItemProps>(
  props: Props[],
  options: HeadlessFlatTreeOptions = {},
): HeadlessFlatTree<Props> {
  const { level } = useSubtreeContext_unstable();
  // as level is static, this doesn't break rule of hooks
  if (level > 0) {
    if (!('rootValue' in options) && process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.warn(/* #__DE-INDENT__ */ `
        @fluentui/react-tree [useHeadlessFlatTree_unstable]:
        useHeadlessFlatTree_unstable should be used with "options.rootValue" and "options.rootLevel" when used in a sub tree.
      `);
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useHeadlessSubFlatTree_unstable(props, {
      rootValue: headlessTreeRootId,
      rootLevel: 0,
      ...options,
    });
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useHeadlessRootFlatTree_unstable(props, options);
}
