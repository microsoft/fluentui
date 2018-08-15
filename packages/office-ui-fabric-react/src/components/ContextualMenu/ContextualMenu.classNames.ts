import { getDividerClassNames } from '../Divider/VerticalDivider.classNames';
import { ITheme, mergeStyleSets } from '../../Styling';
import { IVerticalDividerClassNames } from '../Divider/VerticalDivider.types';
import { memoizeFunction } from '../../Utilities';

export interface IMenuItemClassNames {
  item: string;
  divider: string;
  root: string;
  linkContent: string;
  icon: string;
  checkmarkIcon: string;
  subMenuIcon: string;
  label: string;
  secondaryText: string;
  splitContainer: string;
  splitPrimary: string;
  splitMenu: string;
  linkContentMenu: string;
}

export const getSplitButtonVerticalDividerClassNames = memoizeFunction(
  (theme: ITheme): IVerticalDividerClassNames => {
    return mergeStyleSets(getDividerClassNames(theme), {
      divider: {
        height: 16,
        width: 1
      }
    });
  }
);
