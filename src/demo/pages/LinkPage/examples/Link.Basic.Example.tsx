import * as React from 'react';
import {
  Link
} from '../../../../components/index';

export default class LinkBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Link text='I am a link' url='http://dev.office.com/fabric/components/link' />
    );
  }

}
