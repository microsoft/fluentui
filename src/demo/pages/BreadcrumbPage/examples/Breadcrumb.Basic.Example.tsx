import * as React from 'react';
import {
  Breadcrumb
} from '../../../../index';

export class BreadcrumbBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Breadcrumb breadcrumbs={ [
        {text: 'Files', 'key': 'Files'},
        {text: 'Folder 1', 'key': 'Folder 1'},
        {text: 'Folder 2', 'key': 'Folder 2'},
        {text: 'Folder 3', 'key': 'Folder 3'},
        {text: 'Folder 4', 'key': 'Folder 4'},
        {text: 'Folder 5', 'key': 'Folder 5'},
      ] }
      maxDisplayedBreadcrumbs={ 3 } />
    );
  }

}
