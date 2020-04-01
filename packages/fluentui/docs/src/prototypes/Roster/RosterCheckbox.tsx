import * as React from 'react';
import { Flex, CustomSelectIndicatorProps } from '@fluentui/react-northstar';

export default function RosterCheckbox({
  selected,
  selectable,
  selectableParent,
  expanded,
  ...props
}: CustomSelectIndicatorProps) {
  return (
    <>
      <Flex {...props}>{selectableParent && expanded && 'custom select all'}</Flex>
      {selectable && <input data-is-focusable={false} type="checkbox" readOnly checked={selected} {...props} />}
    </>
  );
}
