import { styled } from 'office-ui-fabric-react';
import { NavLinkBase } from './NavLinkBase';
import { getStyles } from './NavLink.styles';
import { INavLinkProps, INavLinkStyleProps, INavLinkStyles } from './NavLink.types';

export const NavLink: (props: INavLinkProps) => JSX.Element = styled<INavLinkProps, INavLinkStyleProps, INavLinkStyles>(
  NavLinkBase,
  getStyles,
  undefined
);
