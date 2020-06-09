import * as React from 'react';
import { PrimaryButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import {
  IExtendedPersonaProps,
  SelectedPeopleList,
  ISelectedPeopleItemProps,
  ExtendedSelectedItem,
} from 'office-ui-fabric-react/lib/SelectedItemsList';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { people, groupOne, groupTwo } from '@uifabric/example-data';

const primaryButtonStyles: Partial<IButtonStyles> = { root: { display: 'block', marginBottom: 20 } };
const onRenderItem = (props: ISelectedPeopleItemProps): JSX.Element => {
  return <ExtendedSelectedItem {...props} />;
};
const onCopyItems = (items: IExtendedPersonaProps[]): string => {
  return items.map((item: IExtendedPersonaProps) => item.text).join(', ');
};

export const SelectedPeopleListBasicExample: React.FunctionComponent = () => {
  const [nextPersonIndex, setNextPersonIndex] = React.useState(0);
  const selectionList = React.useRef<SelectedPeopleList>(null);
  const onExpandItem = (item: IExtendedPersonaProps): void => {
    const expandedItem = item.text === 'Group One' ? groupOne : item.text === 'Group Two' ? groupTwo : [];
    selectionList.current!.replaceItem(item, expandedItem);
  };
  const onAddItemButtonClicked = (): void => {
    if (selectionList.current) {
      selectionList.current.addItems([people[nextPersonIndex]]);
      setNextPersonIndex(nextPersonIndex + 1);
    }
  };
  return (
    <div>
      <PrimaryButton
        text="Add another item"
        onClick={onAddItemButtonClicked}
        disabled={nextPersonIndex >= people.length}
        styles={primaryButtonStyles}
      />
      <Stack horizontal wrap>
        <SelectedPeopleList
          key="normal"
          removeButtonAriaLabel="Remove"
          defaultSelectedItems={[people[40]]}
          componentRef={selectionList}
          onCopyItems={onCopyItems}
          onExpandGroup={onExpandItem}
          copyMenuItemText="Copy"
          removeMenuItemText="Remove"
          onRenderItem={onRenderItem}
        />
      </Stack>
    </div>
  );
};
