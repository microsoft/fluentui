import * as React from 'react';
import {
  Callout
} from '../../../../components/index';

export default class CalloutBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Callout
        title='All of your favorite people'
        subText='Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.'
      />
    );
  }

}
