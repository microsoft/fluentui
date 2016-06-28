import * as React from 'react';
import {
  Image,
  Label
} from '../../../../index';

export class ImageDefaultExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Label>If no imageFit property is provided, the frame will fit the image. The image will not be scaled.</Label>
        <Image src='http://placehold.it/350x150' />
        <br />
        <Label>If no imageFit property is provided, but a height and width are, then the scale method (see below) will be used.</Label>
        <Image src='http://placehold.it/350x150' width={ 100 } height={ 100 } />
      </div>
    );
  }
}
