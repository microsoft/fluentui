import * as React from 'react';
import {
  Image,
  IImageProps,
  ImageFit,
  Label
} from '../../../../index';

export class ImageCoverExample extends React.Component<any, any> {
  public render() {
    let imageProps: IImageProps = {
      src: 'http://placehold.it/700x300',
      imageFit: ImageFit.cover
    };

    return (
      <div>
        <Label>Landscape Crop</Label>
        <Image { ...imageProps } width={ 200 } height={ 200 } />
        <br />
        <Label>Portrait Crop</Label>
        <Image { ...imageProps } width={ 300 } height={ 50 } />
      </div>
    );
  }
}
