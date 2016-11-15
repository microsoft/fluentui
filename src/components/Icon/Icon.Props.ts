import * as React from 'react';
import { IconName } from './IconName';
export interface IIconProps extends React.HTMLProps<HTMLElement> {
  iconName: IconName;
}