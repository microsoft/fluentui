// tslint:disable:jsx-no-lambda

import * as React from 'react';
import { IStyle, registerIcons, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { Icon, IconType, IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { TestImages } from '../../../common/TestImages';
import { IImageProps, Image, ImageFit } from '../../../Image';

const getImageProps = (width: number, height: number, marginLeft: number): IImageProps => ({
  src: TestImages.iconOne,
  imageFit: ImageFit.none,
  width,
  height,
  getStyles: () => ({
    root: {
      margin: '0 25px'
    },
    image: {
      marginLeft
    }
  })
});

const oneImageProps = getImageProps(57, 53, 0);
const checkImageProps = getImageProps(43, 53, -55);
const lockImageProps = getImageProps(53, 53, -108);

const enum ExampleIcons {
  One = 'ExampleIcon-One',
  Check = 'ExampleIcon-Check',
  Lock = 'ExampleIcon-Lock'
}

/**
 * Registering icons allows you to specify how icons should render when referenced.
 */
registerIcons({
  icons: {
    [ExampleIcons.One]: <Image { ...oneImageProps } />,
    [ExampleIcons.Check]: <Image { ...checkImageProps } />,
    [ExampleIcons.Lock]: <Image { ...lockImageProps } />,
  }
});

export class IconImageSheetExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <Icon iconName={ ExampleIcons.One } />
        <Icon iconName={ ExampleIcons.Check } />
        <Icon iconName={ ExampleIcons.Lock } />
      </div>
    );
  }
}
