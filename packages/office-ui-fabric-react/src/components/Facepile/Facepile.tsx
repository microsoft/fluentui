import { styled } from '../../Utilities';
import { IFacepileProps, IFacepileStyleProps, IFacepileStyles } from './Facepile.types';
import { FacepileBase } from './Facepile.base';
import { styles } from './Facepile.styles';

/**
 * The Facepile shows a list of faces or initials in a horizontal lockup. Each circle represents a person.
 */
export const Facepile: React.StatelessComponent<IFacepileProps> = styled<IFacepileProps, IFacepileStyleProps, IFacepileStyles>(
  FacepileBase,
  styles,
  undefined,
  {
    scope: 'Facepile'
  }
);
