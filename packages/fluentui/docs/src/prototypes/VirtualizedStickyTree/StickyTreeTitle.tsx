import * as React from 'react';
import { TreeTitleProps, TriangleDownIcon, TriangleEndIcon } from '@fluentui/react-northstar';

const StickyTreeTitle = (
  Component: React.ElementType<TreeTitleProps>,
  { content, expanded, hasSubtree, ...restProps }: TreeTitleProps,
) => (
  <Component expanded={expanded} hasSubtree={hasSubtree} {...restProps}>
    {hasSubtree && (expanded ? <TriangleDownIcon /> : <TriangleEndIcon />)}
    {content}
  </Component>
);
export default StickyTreeTitle;
