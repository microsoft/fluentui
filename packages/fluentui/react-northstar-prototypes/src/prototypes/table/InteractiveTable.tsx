import {
  Popup,
  Table,
  gridNestedBehavior,
  gridHeaderCellBehavior,
  gridRowBehavior,
  gridCellBehavior,
  MenuButton,
} from '@fluentui/react-northstar';
import * as React from 'react';
import { InfoIcon } from '@fluentui/react-icons-northstar';

const columnDescription = 'ID uniquely identifies a uniquely indetifiable item';

const InteractiveTable = () => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const handleFocus = () => setPopupOpen(true);
  const handleBlur = () => {
    setPopupOpen(false);
  };

  const contextMenuItems = ['Add to selection', 'Remove', 'Download'];

  const withContextMenu = tableRow => <MenuButton contextMenu trigger={tableRow} menu={contextMenuItems} />;

  return (
    <>
      <div id="columnDescription" style={{ display: 'none' }} aria-hidden="true">
        {columnDescription}
      </div>
      <Table aria-label="table" accessibility={gridNestedBehavior}>
        <Table.Row header accessibility={gridRowBehavior}>
          <Table.Cell
            content={
              <>
                <span>Id</span>
                <Popup
                  trigger={<InfoIcon xSpacing="before" />}
                  content={columnDescription}
                  onOpenChange={(e, { open }) => setPopupOpen(open)}
                  on="hover"
                  open={popupOpen}
                />
              </>
            }
            accessibility={gridHeaderCellBehavior}
            aria-describedby="columnDescription"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Table.Cell content="Name" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Picture" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Age" accessibility={gridHeaderCellBehavior} />
        </Table.Row>
        {withContextMenu(
          <Table.Row accessibility={gridRowBehavior}>
            <Table.Cell content="1" accessibility={gridCellBehavior} />
            <Table.Cell content="Roman van von der Longername" accessibility={gridCellBehavior} />
            <Table.Cell content="None" accessibility={gridCellBehavior} />
            <Table.Cell content="30 years" accessibility={gridCellBehavior} />
          </Table.Row>,
        )}
        {withContextMenu(
          <Table.Row accessibility={gridRowBehavior}>
            <Table.Cell content="2" accessibility={gridCellBehavior} />
            <Table.Cell content="Alex" accessibility={gridCellBehavior} />
            <Table.Cell content="None" accessibility={gridCellBehavior} />
            <Table.Cell content="1 year" accessibility={gridCellBehavior} />
          </Table.Row>,
        )}
        {withContextMenu(
          <Table.Row accessibility={gridRowBehavior}>
            <Table.Cell content="3" accessibility={gridCellBehavior} />
            <Table.Cell content="Ali" accessibility={gridCellBehavior} />
            <Table.Cell content="None" accessibility={gridCellBehavior} />
            <Table.Cell content="30000000000000 years" accessibility={gridCellBehavior} />
          </Table.Row>,
        )}
      </Table>
    </>
  );
};

export default InteractiveTable;
