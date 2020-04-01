import * as React from 'react';
import { Flex, CustomSelectIndicatorProps } from '@fluentui/react-northstar';

export default function RosterCheckbox({
  selectGroup,
  selectItem,
  selected,
  selectable,
  ...props
}: CustomSelectIndicatorProps) {
  return (
    <>
      <Flex {...props}>{selectGroup && 'custom select all'}</Flex>
      {selectItem && <input data-is-focusable={false} type="checkbox" readOnly checked={selected} {...props} />}
    </>
  );
}
