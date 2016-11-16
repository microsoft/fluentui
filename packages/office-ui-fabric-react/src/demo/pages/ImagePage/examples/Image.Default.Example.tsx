import * as React from 'react';
import {
  Image,
  Label
} from '../../../../index';

export class ImageDefaultExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Label>For all of the examples below, no imageFit property has been provided.</Label>
        <Label>Without a width or height specified, the frame will fit the image. The image will not be scaled.</Label>
        <Image src='http://placehold.it/350x150' />
        <br />
        <Label>If only a width is provided, the image will scale proportionally to fill that width.</Label>
        <Image src='http://placehold.it/350x150' width={ 600 } />
        <br />
        <Label>If only a height is provided, the image will scale proportionally to fill that height.</Label>
        <Image src='http://placehold.it/350x150' height={ 100 } />
        <br />
        <Label>If both width and height are provided, the image will be scaled to fit the frame. This may result in a distorted image.</Label>
        <Image src='http://placehold.it/350x150' width={ 100 } height={ 100 } />
      </div>
    );
  }
}
