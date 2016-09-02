import * as React from 'react';
import {
  Nav,
  INavProps
} from '../../../../index';
import './Nav.Basic.Example.scss';

export class NavBasicExample extends React.Component<any, any> {
  constructor(props: INavProps) {
    super(props);
    this._onClickHandler = this._onClickHandler.bind(this);
  }

  public render() {
    return (
      <div className='ms-NavExample-LeftPane'>
        <Nav
          groups={
            [
              {
                links:
                [
                  {
                  name: 'Home',
                  url: 'http://example.com',
                  links: [{
                    name: 'Activity',
                    url: 'http://msn.com'
                    },
                    {
                      name: 'News',
                      url: 'http://msn.com'
                    }],
                  isExpanded: true
                  },
                  { name: 'Documents', url: 'http://example.com', isExpanded: true },
                  { name: 'Pages', url: 'http://msn.com' },
<<<<<<< 35d0f5a0cc0411fc2ff85f4c83d1b856e0f008b7
                  { name: 'Notebook', url: 'http://msn.com' },
                  { name: 'Long Name Test for elipse', url: 'http://msn.com' },
                  { name: 'Edit Link', url: 'http://example.com', iconClassName: 'ms-Icon--pencil' },
                  {
                    name: 'Edit', url: '#',
                    onClick: this._onClickHandler,
                    iconClassName: 'ms-Icon--pencil'
                  }
=======
                  { name: 'Notebook', url: 'http://msn.com' }
>>>>>>> Adjust Nav with new redline design update
                ]
              }
            ]
          }
          expandedStateText={ 'expanded' }
          collapsedStateText={ 'collapsed' }
          />
       </div>
    );
  }
<<<<<<< 35d0f5a0cc0411fc2ff85f4c83d1b856e0f008b7

  private _onClickHandler(e: React.MouseEvent) {
    alert('test');
    return false;
  }
}
=======
}
>>>>>>> Adjust Nav with new redline design update
