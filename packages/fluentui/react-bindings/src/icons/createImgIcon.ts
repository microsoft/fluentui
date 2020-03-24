import * as React from 'react';
import { ImgIconCreateFnParams, ImgIconProps, ImgUrlConfig } from './types';

const defaultUrlResolver = (urlConfig: ImgUrlConfig, name: string, props: ImgIconProps) => {
  const { type, baseUrl, refreshUrl } = urlConfig;
  const { size = 16, sizeModifier } = props;

  let svgUrl = `${baseUrl}/${size}${
    sizeModifier && type === 'png' ? `_${sizeModifier}` : ''
  }/${name}.${type}?${refreshUrl}`;

  // SVGs scale well, so you can generally use the default image.
  // 1.5x is a special case where both SVGs and PNGs need a different image.
  // Remove if statements when missing image files for 20_1.5x are provided.
  if (size === 20 && sizeModifier === '1.5x') {
    svgUrl = `${baseUrl}/${size}_${sizeModifier}/${name}.${type}?${refreshUrl}`;
  }

  return svgUrl;
};

const createImgIcon = ({ name, displayName, urlConfig, urlResolver = defaultUrlResolver }: ImgIconCreateFnParams) => {
  const Component: React.FC<React.HTMLAttributes<HTMLImageElement> & ImgIconProps> = props => {
    const { size = 16, sizeModifier, ...rest } = props;
    let height = size;
    let width = size;

    if (sizeModifier) {
      const multiplier = sizeModifier.substr(0, sizeModifier.length - 1);
      height = size * +multiplier;
      width = size * +multiplier;
    }

    const {
      type = 'svg',
      baseUrl = 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types', // TODO: read from context
      refreshUrl = '?v6', // TODO: read from context
    } = urlConfig || {};

    const svgUrl = urlResolver({ type, baseUrl, refreshUrl }, name, props);

    return React.createElement('img', { src: svgUrl, height, width, ...rest });
  };

  Component.displayName = displayName;
  return Component;
};

export default createImgIcon;
