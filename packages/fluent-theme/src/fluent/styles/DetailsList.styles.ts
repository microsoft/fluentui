import { ICheckStyleProps, ICheckStyles } from 'office-ui-fabric-react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsRowCheckStyleProps,
  IDetailsRowCheckStyles
} from 'office-ui-fabric-react/lib/DetailsList';
import { detailsRowCheckWidth, groupIndentSpacerWidth } from './styleConstants';

export const CheckStyles = (props: ICheckStyleProps): Partial<ICheckStyles> => {
  const { theme, checked } = props;
  const { palette } = theme;

  return {
    circle: [!checked && { color: palette.neutralSecondary }],
    check: [!checked && { color: palette.neutralSecondary }]
  };
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps): Partial<IDetailsRowStyles> => {
  const { theme, isSelected } = props;
  const { palette } = theme;

  return {
    root: [
      {
        selectors: {
          ':focus $check': {
            opacity: 1
          }
        }
      },
      isSelected && [
        {
          background: palette.neutralLight,
          selectors: {
            ':hover': {
              background: palette.neutralQuaternaryAlt
            },
            ':focus': {
              background: palette.neutralLight
            },
            ':focus:hover': {
              background: palette.neutralQuaternaryAlt
            }
          }
        }
      ]
    ]
    // TODO: check with designer if needed according to relines.
    // checkCell: {
    //   // Move the next cell after check to the left to align to redlines.
    //   // Temporary using a hard coded value until fluent becomes default and we can access the value from the default constant.
    //   marginRight: -12
    // }
  };
};

export const DetailsRowCheckStyles = (props: IDetailsRowCheckStyleProps): Partial<IDetailsRowCheckStyles> => {
  return {
    check: {
      // Currently this causes a vertical scroll due to column width calculation logic
      // in the DetailsList which takes into account the 40px default Check width vs the 48px fluent variation.
      // When the fluent styles are to become the default ones this will be fixed in the logic.
      width: detailsRowCheckWidth
    }
  };
};

// Using here any because those specific interfaces are missing from the public API. Consider tightening them in a separate PR.
// tslint:disable-next-line:no-any
export const DetailsHeaderStyles = (props: any): any => {
  return {
    // TODO: check with designer if needed according to relines.
    // cellIsCheck: {
    //   // Move the next cell after check to the left to align to redlines.
    //   // Temporary using a hard coded value until fluent becomes default and we can access the value from the default constant.
    //   marginRight: -12
    // }
    cellIsGroupExpander: {
      // Currently this causes a vertical scroll due to column width calculation logic
      // in the DetailsList which takes into account the 40px default Check width vs the 48px fluent variation.
      // When the fluent styles are to become the default ones this will be fixed in the logic.
      width: groupIndentSpacerWidth
    }
  };
};
