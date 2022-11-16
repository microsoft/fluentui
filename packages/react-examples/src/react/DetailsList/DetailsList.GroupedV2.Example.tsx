import * as React from 'react';
import {
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderProps,
  IDetailsList,
  IGroup,
  IRenderFunction,
  IToggleStyles,
  mergeStyles,
  Toggle,
  GroupedListV2_unstable as GroupedListV2,
} from '@fluentui/react';
import { DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';

const margin = '0 20px 20px 0';
const controlWrapperClass = mergeStyles({
  display: 'flex',
  flexWrap: 'wrap',
});
const toggleStyles: Partial<IToggleStyles> = {
  root: { margin },
  label: { marginLeft: 10 },
};
const addItemButtonStyles: Partial<IButtonStyles> = { root: { margin } };

export interface IDetailsListGroupedExampleItem {
  key: string;
  name: string;
  color: string;
}

export interface IDetailsListGroupedExampleState {
  items: IDetailsListGroupedExampleItem[];
  groups: IGroup[];
  showItemIndexInView: boolean;
  isCompactMode: boolean;
}
const _blueGroupIndex = 2;

const onRenderColumn = (item: IDetailsListGroupedExampleItem, index: number, column: IColumn) => {
  const value =
    item && column && column.fieldName ? item[column.fieldName as keyof IDetailsListGroupedExampleItem] || '' : '';

  return <div data-is-focusable={true}>{value}</div>;
};

const onRenderDetailsHeader = (props: IDetailsHeaderProps, _defaultRender?: IRenderFunction<IDetailsHeaderProps>) => {
  return <DetailsHeader {...props} ariaLabelForToggleAllGroupsButton={'Expand collapse groups'} />;
};

// export class DetailsListGroupedV2Example extends React.Component<{}, IDetailsListGroupedExampleState> {
export const DetailsListGroupedV2Example: React.FC = () => {
  const root = React.useRef<IDetailsList>(null);
  const [columns] = React.useState<IColumn[]>([
    { key: 'name', name: 'Name', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'color', name: 'Color', fieldName: 'color', minWidth: 100, maxWidth: 200 },
  ]);

  const [items, setItems] = React.useState<IDetailsListGroupedExampleItem[]>([
    { key: 'a', name: 'a', color: 'red' },
    { key: 'b', name: 'b', color: 'red' },
    { key: 'c', name: 'c', color: 'blue' },
    { key: 'd', name: 'd', color: 'blue' },
    { key: 'e', name: 'e', color: 'blue' },
  ]);

  const [groups, setGroups] = React.useState<IGroup[]>([
    { key: 'groupred0', name: 'Color: "red"', startIndex: 0, count: 2, level: 0 },
    { key: 'groupgreen2', name: 'Color: "green"', startIndex: 2, count: 0, level: 0 },
    { key: 'groupblue2', name: 'Color: "blue"', startIndex: 2, count: 3, level: 0 },
  ]);

  const [isCompactMode, setIsCompactMode] = React.useState<boolean>(false);

  React.useEffect(() => {
    root.current?.focusIndex(items.length - 1, true);
  }, [items]);

  const addItem = React.useCallback((): void => {
    const newGroups = [...groups];
    newGroups[_blueGroupIndex].count++;

    setItems(
      items.concat([
        {
          key: 'item-' + items.length,
          name: 'New item ' + items.length,
          color: 'blue',
        },
      ]),
    );

    setGroups(newGroups);
  }, [items, groups]);

  const onChangeCompactMode = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    setIsCompactMode(checked);
  };

  return (
    <div>
      <div className={controlWrapperClass}>
        <DefaultButton onClick={addItem} text="Add an item" styles={addItemButtonStyles} />
        <Toggle
          label="Compact mode"
          inlineLabel
          checked={isCompactMode}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={onChangeCompactMode}
          styles={toggleStyles}
        />
      </div>
      <DetailsList
        componentRef={root}
        items={items}
        groups={groups}
        columns={columns}
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        ariaLabelForSelectionColumn="Toggle selection"
        checkButtonAriaLabel="select row"
        checkButtonGroupAriaLabel="select section"
        onRenderDetailsHeader={onRenderDetailsHeader}
        groupProps={{
          showEmptyGroups: true,
          groupedListAs: GroupedListV2,
        }}
        onRenderItemColumn={onRenderColumn}
        compact={isCompactMode}
      />
    </div>
  );
};

// @ts-expect-error Storybook
DetailsListGroupedV2Example.storyName = 'V2 Grouped';
