import * as React from 'react';
import { OverflowSet, IOverflowSetItemProps } from '@fluentui/react';

const noOp = () => undefined;

const onRenderItem = (item: IOverflowSetItemProps): JSX.Element => {
  return <div>{item.name}</div>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onRenderOverflowButton = (overflowItems: any[] | undefined): JSX.Element => {
  return <button> ... </button>;
};

const Scenario = () => (
  <OverflowSet
    aria-label="Basic Menu Example"
    role="menubar"
    items={[
      {
        key: 'item1',
        name: 'Link 1',
        onClick: noOp,
      },
      {
        key: 'item2',
        name: 'Link 2',
        onClick: noOp,
      },
      {
        key: 'item3',
        name: 'Link 3',
        onClick: noOp,
      },
    ]}
    overflowItems={[
      {
        key: 'item4',
        name: 'Overflow Link 1',
        onClick: noOp,
      },
      {
        key: 'item5',
        name: 'Overflow Link 2',
        onClick: noOp,
      },
    ]}
    onRenderOverflowButton={onRenderOverflowButton}
    onRenderItem={onRenderItem}
  />
);

export default Scenario;
