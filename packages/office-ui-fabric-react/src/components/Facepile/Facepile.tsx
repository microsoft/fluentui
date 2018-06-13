import { styled } from '../../Utilities';
import { IFacepileProps, IFacepileStyleProps, IFacepileStyles } from './Facepile.types';
import { FacepileBase } from './Facepile.base';
import { getStyles } from './Facepile.styles';

/**
 * Facepile description
 */
export const Facepile = styled<IFacepileProps, IFacepileStyleProps, IFacepileStyles>(FacepileBase, getStyles);
