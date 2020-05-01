import { buildClassMap } from '../utilities/index';
import { AnimationStyles } from '../styles/index';
import { IAnimationStyles } from '../interfaces/index';

/**
 * {@docCategory AnimationClassNames}
 */
export const AnimationClassNames: { [key in keyof IAnimationStyles]?: string } = buildClassMap(AnimationStyles);
