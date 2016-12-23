import * as React from 'react';
import { IconName } from './IconName';
import { IconType } from './IconType';
export interface IIconProps extends React.HTMLProps<HTMLElement | HTMLImageElement> {
  iconName: IconName;
  iconType?: IconType;
  imageClassName?: string;
}