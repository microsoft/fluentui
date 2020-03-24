import * as React from 'react';
import { ImgIconCreateFnParams, ImgIconProps } from './types';
import { ImgIconContext } from './imgIconContext';

const defaultUrlResolver = (
  urlConfig: { [key: string]: any } | undefined,
  name: string,
  props: { [key: string]: any },
) => {
  const { baseUrl, refreshUrl } = urlConfig || {};
  const { size = 16, sizeModifier, type } = props || {};

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

const createImgIcon = ({ name, displayName, type = 'svg' }: ImgIconCreateFnParams) => {
  const Component: React.FC<React.HTMLAttributes<HTMLImageElement> & ImgIconProps> = props => {
    const imgContextValue = React.useContext(ImgIconContext);
    const { size = 16, sizeModifier, ...rest } = props;
    let height = size;
    let width = size;

    if (sizeModifier) {
      const multiplier = sizeModifier.substr(0, sizeModifier.length - 1);
      height = size * +multiplier;
      width = size * +multiplier;
    }

    const urlResolver = imgContextValue?.urlResolver || defaultUrlResolver;

    const svgUrl = urlResolver(imgContextValue?.urlConfig, name, { ...props, type });

    return React.createElement('img', { src: svgUrl, height, width, ...rest });
  };

  Component.displayName = displayName;
  return Component;
};

export default createImgIcon;
