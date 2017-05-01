/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';

export class IconImageSheetExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-one' }
          imageProps={ {
            src: './images/icon-one.png',
            className: 'ms-IconImageSheetExample-one-image'
          } }
        />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-check' }
          imageProps={ {
            src: './images/icon-one.png',
            className: 'ms-IconImageSheetExample-check-image'
          } }
        />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-lock' }
          imageProps={ {
            src: './images/icon-one.png',
            className: 'ms-IconImageSheetExample-lock-image'
          } }
        />
      </div>
    );
  }
}
