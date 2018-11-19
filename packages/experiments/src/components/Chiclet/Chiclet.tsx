import { styled } from '../../Utilities';
import { IChicletProps, IChicletStyleProps, IChicletStyles } from './Chiclet.types';
import { getStyles } from './Chiclet.styles';
import { ChicletBase } from './Chiclet.base';

export const Chiclet = styled<IChicletProps, IChicletStyleProps, IChicletStyles>(ChicletBase, getStyles, undefined, {
  scope: 'Chiclet'
});
