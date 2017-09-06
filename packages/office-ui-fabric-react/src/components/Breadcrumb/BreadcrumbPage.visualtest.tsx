import { Breadcrumb } from './index';

/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class BreadcrumbVPage extends React.Component<any, any> {
  public render() {
    return <div style={ { width: '600px' } }>
      <Breadcrumb
        className='Breadcrumb'

        items={ [
          { text: 'Files', 'key': 'Files' },
          { text: 'This is folder 1', 'key': 'f1', onClick: () => { return; } },
          { text: 'This is folder 2', 'key': 'f2', onClick: () => { return; } },
          { text: 'This is folder 3', 'key': 'f3', onClick: () => { return; } },
          { text: 'This is folder 4', 'key': 'f4', onClick: () => { return; } },
          { text: 'This is folder 5', 'key': 'f5', onClick: () => { return; } },
        ] }
        maxDisplayedItems={ 3 }
      />
    </div>;
  }
}