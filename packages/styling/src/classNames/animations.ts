import { getClassNames, IClassNames } from '../utilities/getClassNames';
import { animations as animationStyles, IAnimations } from '../styles/animations';

export interface IAnimationClassNames extends IClassNames<IAnimations> { }
export const animations: IAnimationClassNames = getClassNames(animationStyles);
