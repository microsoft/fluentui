import * as React from 'react';
import { styled } from '../../Utilities';
import { FacepileBase } from './Facepile.base';
import { styles } from './Facepile.styles';
import type { IFacepileProps, IFacepileStyleProps, IFacepileStyles } from './Facepile.types';

/**
 * The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person.
 */
export const Facepile: React.FunctionComponent<IFacepileProps> = styled<
  IFacepileProps,
  IFacepileStyleProps,
  IFacepileStyles
>(FacepileBase, styles, undefined, {
  scope: 'Facepile',
});
