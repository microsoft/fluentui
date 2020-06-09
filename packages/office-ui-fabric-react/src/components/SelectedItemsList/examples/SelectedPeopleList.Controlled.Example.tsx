import * as React from 'react';
import { PrimaryButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import {
  IExtendedPersonaProps,
  SelectedPeopleList,
  ISelectedPeopleItemProps,
  ExtendedSelectedItem,
} from 'office-ui-fabric-react/lib/SelectedItemsList';
import { Stack, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { people, groupOne, groupTwo } from '@uifabric/example-data';

const primaryButtonStyles: Partial<IButtonStyles> = { root: { display: 'block', marginBottom: 20 } };
const stackStyles: Partial<IStackStyles> = { root: { maxWidth: '100%' } };
const onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
  return <ExtendedSelectedItem {...props} />;
};
const onCopyItems = (items: IExtendedPersonaProps[]): string => {
  return items.map((item: IExtendedPersonaProps) => item.text).join(', ');
};

export const SelectedPeopleListControlledExample: React.FunctionComponent = () => {
  const [nextPersonIndex, setNextPersonIndex] = React.useState(0);
  const [currentSelectedItems, setCurrentSelectedItems] = React.useState<any[]>([people[40]]);
  const selectionList = React.useRef<SelectedPeopleList>(null);

  const onAddItemButtonClicked = (): void => {
    setCurrentSelectedItems([...currentSelectedItems, people[nextPersonIndex]]);
    setNextPersonIndex(nextPersonIndex + 1);
  };

  const onExpandItem = (item: IExtendedPersonaProps): void => {
    const expandedItem = item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
    const indexToExpand = currentSelectedItems.indexOf(item);
    setCurrentSelectedItems(
      currentSelectedItems
        .slice(0, indexToExpand)
        .concat(expandedItem)
        .concat(currentSelectedItems.slice(indexToExpand + 1)),
    );
  };

  const onItemDeleted = (item: IExtendedPersonaProps): void => {
    const indexToRemove = currentSelectedItems.indexOf(item);
    const newSelectedItems = [...currentSelectedItems];
    newSelectedItems.splice(indexToRemove, 1);
    setCurrentSelectedItems(newSelectedItems);
  };

  return (
    <div>
      <PrimaryButton
        text="Add another item"
        onClick={onAddItemButtonClicked}
        disabled={nextPersonIndex >= people.length}
        styles={primaryButtonStyles}
      />
      <Stack horizontal wrap styles={stackStyles}>
        <SelectedPeopleList
          key="normal"
          removeButtonAriaLabel="Remove"
          selectedItems={currentSelectedItems}
          componentRef={selectionList}
          onCopyItems={onCopyItems}
          onExpandGroup={onExpandItem}
          copyMenuItemText="Copy"
          removeMenuItemText="Remove"
          onRenderItem={onRenderItem}
          onItemDeleted={onItemDeleted}
        />
      </Stack>
    </div>
  );
};
