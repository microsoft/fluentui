import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class ImageDefaultExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <p>With no imageFit property set, the width and height props control the size of the frame. Depending on which of those props is used, the image may scale to fit the frame.</p>
        <Label>Without a width or height specified, the frame remains at its natural size and the image will not be scaled.</Label>
        <Image src='http://placehold.it/350x150' />
        <br />
        <Label>If only a width is provided, the frame will be set to that width. The image will scale proportionally to fill the available width.</Label>
        <Image src='http://placehold.it/350x150' width={ 600 } />
        <br />
        <Label>If only a height is provided, the frame will be set to that height. The image will scale proportionally to fill the available height.</Label>
        <Image src='http://placehold.it/350x150' height={ 100 } />
        <br />
        <Label>If both width and height are provided, the frame will be set to that width and height. The image will scale to fill both the available width and height. <strong>This may result in a distorted image.</strong></Label>
        <Image src='http://placehold.it/350x150' width={ 100 } height={ 100 } />
      </div>
    );
  }
}
