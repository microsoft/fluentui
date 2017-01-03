import * as React from 'react';
import { IconName } from './IconName';
import { IconType } from './IconType';
import { IImageProps } from '../Image/Image.Props';
export interface IIconProps extends React.HTMLProps<HTMLElement> {
  iconName: IconName;
  iconType?: IconType;
  imageProps?: IImageProps;
}