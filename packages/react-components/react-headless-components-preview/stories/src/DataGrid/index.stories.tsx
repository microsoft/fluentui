import {
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  DataGridSelectionCell,
} from '@fluentui/react-headless-components-preview/data-grid';

import descriptionMd from './DataGridDescription.md';
import { getBrowserSupportNotice } from '../shared/browserSupportNotice';

import './data-grid.module.css';

export { Default } from './DataGridDefault.stories';
export { Sortable } from './DataGridSortable.stories';
export { Multiselect } from './DataGridMultiselect.stories';
export { SingleSelection } from './DataGridSingleSelection.stories';
export { RowFocus } from './DataGridRowFocus.stories';

export default {
  title: 'Components/DataGrid',
  component: DataGrid,
  subcomponents: {
    DataGridBody,
    DataGridCell,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridRow,
    DataGridSelectionCell,
  },
  parameters: {
    docs: {
      description: {
        component: [descriptionMd, getBrowserSupportNotice('DataGrid')].join('\n'),
      },
    },
  },
};
