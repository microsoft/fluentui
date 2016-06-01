import * as React from 'react';
import {
  Image
} from '../../../../index';

export class ImageBasicExample extends React.Component<any, any> {
  public render() {
    return (
      <Image src='http://placehold.it/350x150' />
    );
  }
}
