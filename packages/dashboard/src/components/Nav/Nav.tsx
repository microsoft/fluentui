import { styled } from 'office-ui-fabric-react';
import { getStyles } from './Nav.styles';
import { NavBase } from './NavBase';
import { INavProps, INavStyleProps, INavStyles } from './Nav.types';

export const Nav: (props: INavProps) => JSX.Element = styled<INavProps, INavStyleProps, INavStyles>(NavBase, getStyles, undefined);
