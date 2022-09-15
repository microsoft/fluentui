import { html } from '@microsoft/fast-element';
import { Button, ColumnDefinition, DataGrid, DataGridCell, DataGridRow } from '@microsoft/fast-foundation';
import { GenerateHeaderOptions } from '@microsoft/fast-foundation/dist/esm/data-grid/data-grid.options';
import addons from '@storybook/addons';
import { DOCS_RENDERED } from '@storybook/core-events';
import DataGridTemplate from './fixtures/base.html';
import './index';

/* eslint-disable @typescript-eslint/ban-types */
let defaultGridElement: DataGrid | null = null;
const defaultRowData: object = newDataRow('default');

const columnWidths: string[] = ['1fr', '1fr', '1fr', '1fr'];

const defaultRowItemTemplate = html`
    <fluent-data-grid-row
        :rowData="${x => x}"
        :cellItemTemplate="${(x, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(x, c) => c.parent.headerCellItemTemplate}"
    ></fast-data-grid-row>
`;

const customRowItemTemplate = html`
    <fluent-data-grid-row
        :rowData="${x => x}"
        :cellItemTemplate="${(x, c) => c.parent.cellItemTemplate}"
        :headerCellItemTemplate="${(x, c) => c.parent.headerCellItemTemplate}"
    ></fast-data-grid-row>
    <fluent-divider style="margin-bottom: 6px; margin-top: 6px;"></fast-divider>
`;

const customCellItemTemplate = html`
    <fluent-data-grid-cell
        style="background: brown"
        grid-column="${(x, c) => c.index + 1}"
        :rowData="${(x, c) => c.parent.rowData}"
        :columnDefinition="${x => x}"
    ></fast-data-grid-cell>
`;

const customHeaderCellItemTemplate = html`
    <fluent-data-grid-cell
        style="background: orange"
        cell-type="columnheader"
        grid-column="${(x, c) => c.index + 1}"
        :columnDefinition="${x => x}"
    ></fast-data-grid-header-cell>
`;

addons.getChannel().addListener(DOCS_RENDERED, (name: string) => {
  if (name.toLowerCase().includes('data-grid')) {
    defaultGridElement = document.getElementById('defaultGrid') as DataGrid;
    reset();

    const defaultGridRow = document.getElementById('defaultGridRow') as DataGridRow;
    if (defaultGridRow) {
      defaultGridRow.rowData = defaultRowData;
    }

    const defaultRow = document.getElementById('defaultRow') as DataGridRow;
    if (defaultRow) {
      defaultRow.columnDefinitions = baseColumns;
      defaultRow.rowData = defaultRowData;
    }

    const defaultHeader = document.getElementById('defaultHeader') as DataGridRow;
    if (defaultHeader) {
      defaultHeader.columnDefinitions = baseColumns;
    }

    const rowWithCellTemplate = document.getElementById('cellTemplateRow') as DataGridRow;
    if (rowWithCellTemplate) {
      rowWithCellTemplate.columnDefinitions = templateColumns;
      rowWithCellTemplate.rowData = defaultRowData;
    }

    const headerWithCellTemplate = document.getElementById('headerTemplateRow') as DataGridRow;
    if (headerWithCellTemplate) {
      headerWithCellTemplate.columnDefinitions = templateColumns;
    }

    const defaultCell = document.getElementById('defaultCell') as DataGridCell;
    if (defaultCell) {
      defaultCell.columnDefinition = { columnDataKey: 'rowId' };
      defaultCell.rowData = defaultRowData;
    }

    const headerCell = document.getElementById('headerCell') as DataGridCell;
    if (headerCell) {
      headerCell.columnDefinition = {
        columnDataKey: 'name',
        title: 'Components/Name',
      };
    }

    const resetButton = document.getElementById('btnreset') as Button;
    if (resetButton) {
      resetButton.onclick = reset;
    }

    const defaultColsButton = document.getElementById('btndefaultcols') as Button;
    if (defaultColsButton) {
      defaultColsButton.onclick = setDefaultCols;
    }

    const templateColsButton = document.getElementById('btntemplatecols') as Button;
    if (templateColsButton) {
      templateColsButton.onclick = setTemplateCols;
    }

    const addRowButton = document.getElementById('btnaddrow') as Button;
    if (addRowButton) {
      addRowButton.onclick = addRow;
    }

    const removeRowButton = document.getElementById('btnremoverow') as Button;
    if (removeRowButton) {
      removeRowButton.onclick = removeRow;
    }

    const noHeaderButton = document.getElementById('btnnoheader') as Button;
    if (noHeaderButton) {
      noHeaderButton.onclick = setNoHeader;
    }

    const defaultHeaderButton = document.getElementById('btndefaultheader') as Button;
    if (defaultHeaderButton) {
      defaultHeaderButton.onclick = setDefaultHeader;
    }

    const stickyHeaderButton = document.getElementById('btnstickyheader') as Button;
    if (stickyHeaderButton) {
      stickyHeaderButton.onclick = setStickyHeader;
    }

    const defaultRowTemplateButton = document.getElementById('btndefaultrowtemplate') as Button;
    if (defaultRowTemplateButton) {
      defaultRowTemplateButton.onclick = setDefaultRowItemTemplate;
    }

    const customRowTemplateButton = document.getElementById('btncustomrowtemplate') as Button;
    if (customRowTemplateButton) {
      customRowTemplateButton.onclick = setCustomRowItemTemplate;
    }

    const defaultCellTemplateButton = document.getElementById('btndefaultcelltemplate') as Button;
    if (defaultCellTemplateButton) {
      defaultCellTemplateButton.onclick = setDefaultCellItemTemplate;
    }

    const customCellTemplateButton = document.getElementById('btncustomcelltemplate') as Button;
    if (customCellTemplateButton) {
      customCellTemplateButton.onclick = setCustomCellItemTemplate;
    }

    const defaultHeaderCellTemplateButton = document.getElementById('btndefaultheadercelltemplate') as Button;
    if (defaultHeaderCellTemplateButton) {
      defaultHeaderCellTemplateButton.onclick = setDefaultHeaderCellItemTemplate;
    }

    const customHeaderCellTemplateButton = document.getElementById('btncustomheadercelltemplate') as Button;
    if (customHeaderCellTemplateButton) {
      customHeaderCellTemplateButton.onclick = setCustomHeaderCellItemTemplate;
    }

    // note: we use mouse enter because clicking to move focus seems to confuse focus-visible
    const focusLeftButton = document.getElementById('btnfocusleft') as Button;
    if (focusLeftButton) {
      focusLeftButton.onmouseenter = moveFocus;
    }

    const focusRightButton = document.getElementById('btnfocusright') as Button;
    if (focusRightButton) {
      focusRightButton.onmouseenter = moveFocus;
    }

    const focusUpButton = document.getElementById('btnfocusup') as Button;
    if (focusUpButton) {
      focusUpButton.onmouseenter = moveFocus;
    }

    const focusDownButton = document.getElementById('btnfocusdown') as Button;
    if (focusDownButton) {
      focusDownButton.onmouseenter = moveFocus;
    }
  }
});

const buttonCellTemplate = html<DataGridCell>`
    <template>
        <fluent-button @click="${x => cellTemplateButtonClick(x)}" style="width: 100%;">
            ${x =>
              x.rowData === null || x.columnDefinition === null || x.columnDefinition.columnDataKey === null
                ? null
                : x.rowData[x.columnDefinition.columnDataKey]}
        </fast-button>
    </template>
`;

const buttonHeaderCellTemplate = html<DataGridCell>`
    <template>
        <fluent-button
            @click="${x => headerTemplateButtonClick(x)}"
            style="width: 100%; background: green"
        >
            ${x =>
              x.columnDefinition === null
                ? null
                : x.columnDefinition.title === undefined
                ? x.columnDefinition.columnDataKey
                : x.columnDefinition.title}
        </fast-button>
    </template>
`;

function reset(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.columnDefinitions = null;
  defaultGridElement.rowsData = newDataSet(10);
}

function setDefaultCols(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.columnDefinitions = baseColumns;
}

function setTemplateCols(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.columnDefinitions = templateColumns;
}

function addRow(): void {
  if (defaultGridElement === null || defaultGridElement.rowsData === null) {
    return;
  }
  defaultGridElement.rowsData.push(newDataRow(`${defaultGridElement.rowsData.length + 1}`));
}

function removeRow(): void {
  if (defaultGridElement === null || defaultGridElement.rowsData === null || defaultGridElement.rowsData.length === 0) {
    return;
  }
  defaultGridElement.rowsData.pop();
}

function setNoHeader(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.generateHeader = GenerateHeaderOptions.none;
}

function setDefaultHeader(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.generateHeader = GenerateHeaderOptions.default;
}

function setDefaultRowItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.rowItemTemplate = defaultRowItemTemplate;
}

function setCustomRowItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.rowItemTemplate = customRowItemTemplate;
}

function setDefaultCellItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.cellItemTemplate = undefined;
}

function setCustomCellItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.cellItemTemplate = customCellItemTemplate;
}

function setDefaultHeaderCellItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.headerCellItemTemplate = undefined;
}

function setCustomHeaderCellItemTemplate(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.headerCellItemTemplate = customHeaderCellItemTemplate;
}

function moveFocus(e: MouseEvent): void {
  if (defaultGridElement === null) {
    return;
  }
  switch ((e.target as HTMLElement).id) {
    case 'btnfocusleft':
      defaultGridElement.focusColumnIndex = defaultGridElement.focusColumnIndex - 1;
      break;

    case 'btnfocusright':
      defaultGridElement.focusColumnIndex = defaultGridElement.focusColumnIndex + 1;
      break;

    case 'btnfocusup':
      defaultGridElement.focusRowIndex = defaultGridElement.focusRowIndex - 1;
      break;

    case 'btnfocusdown':
      defaultGridElement.focusRowIndex = defaultGridElement.focusRowIndex + 1;
      break;
  }
}

function headerTemplateButtonClick(cell: DataGridCell): void {
  if (cell.columnDefinition === null || defaultGridElement === null || defaultGridElement.columnDefinitions === null) {
    return;
  }

  const index: number = defaultGridElement.columnDefinitions.indexOf(cell.columnDefinition);

  if (columnWidths[index] === '1fr') {
    columnWidths.splice(index, 1, '2fr');
  } else {
    columnWidths.splice(index, 1, '1fr');
  }

  defaultGridElement.gridTemplateColumns = `${columnWidths[0]} ${columnWidths[1]} ${columnWidths[2]} ${columnWidths[3]}`;
}

function cellTemplateButtonClick(cell: DataGridCell): void {
  if (cell.columnDefinition === null || cell.rowData === null || defaultGridElement === null) {
    return;
  }
  const newRowData: object = { ...cell.rowData };
  newRowData[cell.columnDefinition.columnDataKey] = 'clicked';

  const rowIndex: number = defaultGridElement.rowsData.indexOf(cell.rowData);

  if (rowIndex > -1) {
    defaultGridElement.rowsData.splice(rowIndex, 1, newRowData);
  }
}

function setStickyHeader(): void {
  if (defaultGridElement === null) {
    return;
  }
  defaultGridElement.generateHeader = GenerateHeaderOptions.sticky;
}

function newDataSet(rowCount: number): object[] {
  const newRows: object[] = [];
  for (let i = 0; i <= rowCount; i++) {
    newRows.push(newDataRow(`${i + 1}`));
  }
  return newRows;
}

function newDataRow(id: string): object {
  return {
    rowId: `rowid-${id}`,
    item1: `value 1-${id}`,
    item2: `value 2-${id}`,
    item3: `value 3-${id}`,
    item4: `value 4-${id}`,
    item5: `value 5-${id}`,
    item6: `value 6-${id}`,
  };
}

const baseColumns: ColumnDefinition[] = [
  { columnDataKey: 'rowId' },
  { columnDataKey: 'item1' },
  { columnDataKey: 'item2' },
  { columnDataKey: 'item3' },
];

const templateColumns: ColumnDefinition[] = [
  {
    title: 'Components/RowID',
    columnDataKey: 'rowId',
    cellTemplate: buttonCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: buttonHeaderCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    title: 'Components/Column 1',
    columnDataKey: 'item1',
    cellTemplate: buttonCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: buttonHeaderCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    title: 'Components/Column 2',
    columnDataKey: 'item2',
    cellTemplate: buttonCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: buttonHeaderCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
  {
    title: 'Components/Column 3',
    columnDataKey: 'item3',
    cellTemplate: buttonCellTemplate,
    cellFocusTargetCallback: getFocusTarget,
    headerCellTemplate: buttonHeaderCellTemplate,
    headerCellFocusTargetCallback: getFocusTarget,
  },
];

function getFocusTarget(cell: DataGridCell): HTMLElement {
  return cell.querySelector('fast-button') as HTMLElement;
}

/* eslint-enable @typescript-eslint/ban-types */

export default {
  title: 'Components/Data Grid',
};

export const dataGrid = () => DataGridTemplate;

const example = `
<fluent-data-grid id="defaultGrid" style="max-height: 400px; overflow-y: auto"></fluent-data-grid>
`;

dataGrid.parameters = {
  docs: {
    source: {
      code: example,
    },
  },
};
