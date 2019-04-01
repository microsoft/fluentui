import { styled } from 'office-ui-fabric-react';
import { getStyles } from './NavGroup.styles';
import { INavGroupStyles, INavGroupProps } from './NavGroup.types';
import { NavGroupBase } from './NavGroupBase';

export const NavGroup: (props: INavGroupProps) => JSX.Element = styled<INavGroupProps, {}, INavGroupStyles>(
  NavGroupBase,
  getStyles,
  undefined
);
