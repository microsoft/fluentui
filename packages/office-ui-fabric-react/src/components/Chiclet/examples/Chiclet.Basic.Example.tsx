import * as React from 'react';
import {
  Chiclet,
  ChicletPreview,
  ChicletTitle,
  IChicletPreviewProps,
  IChicletTitleProps
} from 'office-ui-fabric-react/lib/Chiclet';
import { ImageFit } from 'office-ui-fabric-react/lib/Image';
import { TestImages } from '../../../common/TestImages';

export class ChicletBasicExample extends React.Component<any, any> {
  public render() {
    const previewProps: IChicletPreviewProps = {
      previewImages: [
        {
          name: 'Foo bar',
          url: 'https://bing.com',
          previewImageSrc: TestImages.documentPreview,
          iconSrc: TestImages.iconPpt,
          imageFit: ImageFit.cover,
          width: 318,
          height: 196
        }
      ]
    };

    var styles = {
      "border": "solid",
    }

    return (
      <div style={ styles }>
        <p>Hello, this is a chiclet!</p>
        <Chiclet>
          <ChicletPreview { ...previewProps } />
          <ChicletTitle title='6 files were uploaded' />
        </Chiclet>
      </div>
    );
  }

}