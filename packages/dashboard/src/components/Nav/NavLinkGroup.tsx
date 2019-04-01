import { styled } from 'office-ui-fabric-react';
import { NavLinkGroupBase } from './NavLinkGroupBase';
import { getStyles } from './NavLinkGroup.styles';
import { INavLinkGroupProps, INavLinkGroupStyleProps, INavLinkGroupStyles } from './NavLinkGroup.types';

export const NavLinkGroup: (props: INavLinkGroupProps) => JSX.Element = styled<
  INavLinkGroupProps,
  INavLinkGroupStyleProps,
  INavLinkGroupStyles
>(NavLinkGroupBase, getStyles, undefined);
