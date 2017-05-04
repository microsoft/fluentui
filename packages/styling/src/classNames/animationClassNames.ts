import { getClassNames, IClassNames } from '../utilities/index';
import { AnimationStyles } from '../styles/index';
import { IAnimationStyles } from '../interfaces/index';

export interface IAnimationClassNames extends IClassNames<IAnimationStyles> { }
export const AnimationClassNames: IAnimationClassNames = getClassNames(AnimationStyles);
