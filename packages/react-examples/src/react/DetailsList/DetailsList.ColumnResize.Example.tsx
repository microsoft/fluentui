import * as React from 'react';
import {
  IColumn,
  SpinButton,
  DetailsList,
  ConstrainMode,
  DetailsListLayoutMode,
  SelectionMode,
  Separator,
  Text,
} from '@fluentui/react';

function createTableData(rows: number, columns: number) {
  const data: Record<string, string>[] = [];
  const charCode = 'A'.charCodeAt(0);

  for (let r = 0; r < rows; r++) {
    const row: Record<string, string> = {};
    for (let c = 0; c < columns; c++) {
      row[`${c}`] = `${String.fromCharCode(charCode + r)}-${c}`;
    }
    data.push(row);
  }
  return data;
}

export const DetailsListColumnResizeExample: React.FC<{}> = (props: {}): JSX.Element => {
  const [rows, setRowCount] = React.useState<number>(1);
  const [columns, setColumns] = React.useState<number>(4);

  const allTablesData = React.useMemo(() => {
    const temp: Record<string, string>[][] = [];
    for (let x = 0; x < 2; x++) {
      temp.push(createTableData(rows, columns));
    }
    return temp;
  }, [columns, rows]);

  const tableColumns = React.useMemo(() => {
    const temp: IColumn[][] = [];

    for (let t = 0; t < 2; t++) {
      const tableCols: IColumn[] = [];
      for (let c = 0; c < columns /* - t*/; c++) {
        const colVal = `${c}`;
        tableCols.push({
          key: colVal,
          fieldName: colVal,
          minWidth: 100,
          maxWidth: 300,
          name: colVal,
          isResizable: true,
        });
      }
      temp.push(tableCols);
    }

    return temp;
  }, [columns]);

  const adjustRows =
    (modifier = 1) =>
    (val: string) => {
      const num = Number(val);
      console.log('num: ', num);
      setRowCount(num + modifier);
    };

  const adjustColumns =
    (modifier = 1) =>
    (val: string) => {
      const num = Number(val);
      console.log('num: ', num);
      setColumns(num + modifier);
    };

  const validate = React.useCallback((val: string) => val, []);

  return (
    <>
      <SpinButton
        value={'' + rows}
        label={'Rows per table: '}
        min={0}
        step={1}
        onIncrement={adjustRows()}
        onDecrement={adjustRows(-1)}
        onValidate={validate}
      />
      <SpinButton
        value={'' + columns}
        label={'Columns per table: '}
        min={0}
        step={1}
        onIncrement={adjustColumns()}
        onDecrement={adjustColumns(-1)}
        onValidate={validate}
      />
      <div>
        <Text block variant="xLarge">
          {'Table without columns provided'}
        </Text>
        <DetailsList
          items={allTablesData[0]}
          constrainMode={ConstrainMode.unconstrained}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
        />
        <Separator />
        <Text block variant="xLarge">
          {'Table with columns provided'}
        </Text>
        <DetailsList
          items={allTablesData[1]}
          columns={tableColumns[1]}
          constrainMode={ConstrainMode.unconstrained}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
        />
      </div>
    </>
  );
};
