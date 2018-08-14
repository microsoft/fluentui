import { buildClassMap } from '../utilities/index';
import { AnimationStyles } from '../styles/index';
import { IAnimationStyles } from '../interfaces/index';

export const AnimationClassNames: { [key in keyof IAnimationStyles]?: string } = buildClassMap(AnimationStyles);
