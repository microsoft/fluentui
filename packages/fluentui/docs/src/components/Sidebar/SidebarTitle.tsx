import * as React from 'react';
import { TriangleDownIcon, TriangleUpIcon } from '@fluentui/react-icons-northstar';
import { pxToRem } from '@fluentui/react-northstar';

export const renderSidebarTitle = (Component, { content, expanded, open, hasSubtree, styles, ...restProps }) => {
  return (
    <Component
      expanded={expanded}
      hasSubtree={hasSubtree}
      styles={{ ...styles, ...(!hasSubtree && { fontSize: pxToRem(10), marginLeft: pxToRem(16) }) }}
      {...restProps}
    >
      {content}
      {hasSubtree ? expanded ? <TriangleDownIcon /> : <TriangleUpIcon /> : null}
    </Component>
  );
};
