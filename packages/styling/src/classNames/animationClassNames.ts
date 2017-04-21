import { getClassNames, IClassNames } from '../utilities/getClassNames';
import { animationStyles, IAnimationStyles } from '../styles/animationStyles';

export interface IAnimationClassNames extends IClassNames<IAnimationStyles> { }
export const animationClassNames: IAnimationClassNames = getClassNames(animationStyles);
