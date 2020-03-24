import * as React from 'react';
import { ImgIconCreateFnParams, ImgIconProps } from './types';
import { ImgIconContext } from './imgIconContext';

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

    const svgUrl = imgContextValue?.urlResolver(imgContextValue?.urlConfig, { name, type, size, sizeModifier });

    return React.createElement('img', { src: svgUrl, height, width, ...rest });
  };

  Component.displayName = displayName;
  return Component;
};

export default createImgIcon;
