/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Breadcrumb
} from '../../../../Breadcrumb';

export const BreadcrumbBasicExample = () => (
  <Breadcrumb
    items={ [
      {text: 'Files', 'key': 'Files'},
      {text: 'This is folder 1', 'key': 'f1'},
      {text: 'This is folder 2', 'key': 'f2'},
      {text: 'This is folder 3', 'key': 'f3'},
      {text: 'This is folder 4', 'key': 'f4'},
      {text: 'This is folder 5', 'key': 'f5'},
    ] }
    maxDisplayedItems={ 3 } />
);
