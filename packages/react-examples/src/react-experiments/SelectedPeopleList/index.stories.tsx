import * as React from 'react';

import { SelectedPeopleListBasicDragDropExample } from './SelectedPeopleList.Basic.DragDrop.Example';
import { SelectedPeopleListBasicExample } from './SelectedPeopleList.Basic.Example';
import { SelectedPeopleListDragDropBetweenWellsExample } from './SelectedPeopleList.DragDropBetweenWells.Example';
import { SelectedPeopleListWithContextMenuExample } from './SelectedPeopleList.WithContextMenu.Example';
import { SelectedPeopleListWithEditExample } from './SelectedPeopleList.WithEdit.Example';
import { SelectedPeopleListWithEditInContextMenuExample } from './SelectedPeopleList.WithEditInContextMenu.Example';
import { SelectedPeopleListWithGroupExpandExample } from './SelectedPeopleList.WithGroupExpand.Example';

export const BasicDragDrop = () => <SelectedPeopleListBasicDragDropExample />;

export const Basic = () => <SelectedPeopleListBasicExample />;

export const DragDropBetweenWells = () => <SelectedPeopleListDragDropBetweenWellsExample />;

export const WithContextMenu = () => <SelectedPeopleListWithContextMenuExample />;

export const WithEdit = () => <SelectedPeopleListWithEditExample />;

export const WithEditInContextMenu = () => <SelectedPeopleListWithEditInContextMenuExample />;

export const WithGroupExpand = () => <SelectedPeopleListWithGroupExpandExample />;

export default {
  title: 'Components/SelectedPeopleList',
};
