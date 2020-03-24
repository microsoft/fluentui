import * as React from 'react';
import { ImgIconCreateFnParams, ImgIconProps } from './types';

const createImgIcon = ({
  name,
  displayName,
  type = 'svg',
  baseUrl = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types',
  refreshUrl = '?v6',
}: ImgIconCreateFnParams) => {
  const Component: React.FC<React.HTMLAttributes<HTMLSpanElement> & ImgIconProps> = props => {
    const { size = 16, sizeModifier, ...rest } = props;
    let height = size;
    let width = size;
    let svgUrl = `${baseUrl}/${size}${
      sizeModifier && type === 'png' ? `_${sizeModifier}` : ''
    }/${name}.${type}?${refreshUrl}`;

    if (sizeModifier) {
      const multiplier = sizeModifier.substr(0, sizeModifier.length - 1);
      height = size * +multiplier;
      width = size * +multiplier;
    }

    // SVGs scale well, so you can generally use the default image.
    // 1.5x is a special case where both SVGs and PNGs need a different image.
    // Remove if statements when missing image files for 20_1.5x are provided.
    if (size === 20 && sizeModifier === '1.5x') {
      svgUrl = `${baseUrl}/${size}_${sizeModifier}/${name}.${type}?${refreshUrl}`;
    }

    return React.createElement('img', { src: svgUrl, height, width, ...rest });
  };

  Component.displayName = displayName;
  return Component;
};

export default createImgIcon;
