import { IEffects } from '../types/index';
import { Depths } from './FluentDepths';

export const DefaultEffects: IEffects = {
  elevation4: Depths.depth4,
  elevation8: Depths.depth8,
  elevation16: Depths.depth16,
  elevation64: Depths.depth64,

  roundedCorner2: '2px',
  roundedCorner4: '4px',
  roundedCorner6: '6px',
};
