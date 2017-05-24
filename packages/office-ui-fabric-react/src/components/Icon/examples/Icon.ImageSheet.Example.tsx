/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Icon, IconType } from 'office-ui-fabric-react/lib/Icon';
import './IconExample.scss';
import { TestImages } from '../../../common/TestImages';

export class IconImageSheetExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-one' }
          imageProps={ {
            src: TestImages.iconOne,
            className: 'ms-IconImageSheetExample-one-image'
          } }
        />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-check' }
          imageProps={ {
            src: TestImages.iconOne,
            className: 'ms-IconImageSheetExample-check-image'
          } }
        />
        <Icon
          iconName={ 'None' }
          iconType={ IconType.image }
          className={ 'ms-IconImageSheetExample-lock' }
          imageProps={ {
            src: TestImages.iconOne,
            className: 'ms-IconImageSheetExample-lock-image'
          } }
        />
      </div>
    );
  }
}
