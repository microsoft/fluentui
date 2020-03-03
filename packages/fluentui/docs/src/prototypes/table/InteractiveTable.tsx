import { Icon, Popup, Table, gridNestedBehavior, gridHeaderCellBehavior, gridRowBehavior, gridCellBehavior } from '@fluentui/react';
import * as React from 'react';

const columnDescription = 'ID uniquely identifies a uniquely indetifiable item';

const InteractiveTable = () => {
  const [popupOpen, setPopupOpen] = React.useState(false);
  const handleFocus = () => setPopupOpen(true);
  const handleBlur = () => {
    setPopupOpen(false);
  };

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
                  trigger={<Icon name="info" xSpacing="before" />}
                  content={columnDescription}
                  onOpenChange={(e, { open }) => setPopupOpen(open)}
                  on="hover"
                  open={popupOpen}
                />
              </>
            }
            key="id"
            accessibility={gridHeaderCellBehavior}
            aria-describedby="columnDescription"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <Table.Cell content="Name" key="name" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Picture" key="pic" accessibility={gridHeaderCellBehavior} />
          <Table.Cell content="Age" key="age" accessibility={gridHeaderCellBehavior} />
        </Table.Row>
        <Table.Row key="1" accessibility={gridRowBehavior}>
          <Table.Cell content="1" key="1-1" accessibility={gridCellBehavior} />
          <Table.Cell content="Roman van von der Longername" key="1-2" accessibility={gridCellBehavior} />
          <Table.Cell content="None" key="1-3" accessibility={gridCellBehavior} />
          <Table.Cell content="30 years" key="1-4" accessibility={gridCellBehavior} />
        </Table.Row>
        <Table.Row key="2" accessibility={gridRowBehavior}>
          <Table.Cell content="2" key="1-1" accessibility={gridCellBehavior} />
          <Table.Cell content="Alex" key="1-2" accessibility={gridCellBehavior} />
          <Table.Cell content="None" key="1-3" accessibility={gridCellBehavior} />
          <Table.Cell content="1 year" key="1-4" accessibility={gridCellBehavior} />
        </Table.Row>
        <Table.Row key="3" accessibility={gridRowBehavior}>
          <Table.Cell content="3" key="1-1" accessibility={gridCellBehavior} />
          <Table.Cell content="Ali" key="1-2" accessibility={gridCellBehavior} />
          <Table.Cell content="None" key="1-3" accessibility={gridCellBehavior} />
          <Table.Cell content="30000000000000 years" key="1-4" accessibility={gridCellBehavior} />
        </Table.Row>
      </Table>
    </>
  );
};

export default InteractiveTable;
