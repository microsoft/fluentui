import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsList } from '@fluentui/react/lib/DetailsList';
import { IconButton, PrimaryButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { Dialog, DialogFooter } from '@fluentui/react/lib/Dialog';
import { TextField, ITextField } from '@fluentui/react/lib/TextField';
import { createArray } from '@fluentui/react/lib/Utilities';
import { useConst } from '@fluentui/react-hooks';

const iconButtonStyles: Partial<IButtonStyles> = { root: { float: 'right', height: 'inherit' } };

interface IExampleItem {
  key: number;
  name: string;
}

export const AnnouncedQuickActionsExample: React.FunctionComponent = () => {
  const detailsList = React.useRef<IDetailsList>(null);
  const textField = React.useRef<ITextField>(null);
  const selection = useConst(() => new Selection());
  const [items, setItems] = React.useState<IExampleItem[]>(() =>
    createArray(20, i => ({
      key: i,
      name: 'Item ' + i,
    })),
  );

  const [dialogContent, setDialogContent] = React.useState<JSX.Element | undefined>(undefined);
  const [announced, setAnnounced] = React.useState<JSX.Element | undefined>(undefined);

  const deleteItem = React.useCallback((index: number): void => {
    setItems(prevItems => prevItems.filter((item, i) => i !== index));
    setAnnounced(<Announced message="Item deleted" aria-live="assertive" />);
  }, []);

  const renameItem = React.useCallback((item: IExampleItem, index: number): void => {
    const updateItemName = () => {
      if (textField && textField.current) {
        setItems(prevItems => {
          const renamedItems = [...prevItems];
          renamedItems[index] = { ...prevItems[index], name: textField.current?.value || renamedItems[index].name };
          return renamedItems;
        });
        setDialogContent(undefined);
        setAnnounced(<Announced message="Item renamed" aria-live="assertive" />);
      }
    };

    setDialogContent(
      <>
        <TextField componentRef={textField} label="Rename" defaultValue={item.name} />
        <DialogFooter>
          <PrimaryButton
            // eslint-disable-next-line react/jsx-no-bind
            onClick={updateItemName}
            text="Save"
          />
        </DialogFooter>
      </>,
    );
  }, []);

  const columns = useConst((): IColumn[] => [
    {
      name: 'Name',
      fieldName: 'name',
      key: 'name',
      minWidth: 100,
      maxWidth: 200,
      onRender: (item: IExampleItem, index: number) => (
        <div>
          {item.name}
          <IconButton
            menuIconProps={{ iconName: 'MoreVertical' }}
            role="button"
            aria-haspopup
            aria-label="Show actions"
            styles={iconButtonStyles}
            menuProps={{
              items: [
                {
                  key: 'delete',
                  text: 'Delete',
                  onClick: () => deleteItem(index),
                },
                {
                  key: 'rename',
                  text: 'Rename',
                  onClick: () => renameItem(item, index),
                },
              ],
            }}
          />
        </div>
      ),
    },
  ]);

  const closeRenameDialog = React.useCallback((): void => {
    setDialogContent(undefined);
  }, []);

  return (
    <>
      {announced}
      <DetailsList
        componentRef={detailsList}
        items={items}
        columns={columns}
        layoutMode={DetailsListLayoutMode.fixedColumns}
        selection={selection}
        selectionPreservedOnEmptyClick
        ariaLabelForSelectionColumn="Toggle selection"
        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
        checkButtonAriaLabel="select row"
      />
      <Dialog hidden={!dialogContent} onDismiss={closeRenameDialog} closeButtonAriaLabel="Close">
        {dialogContent}
      </Dialog>
    </>
  );
};
