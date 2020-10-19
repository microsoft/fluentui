import { ICheckStyleProps, ICheckStyles } from '@fluentui/react/lib/Check';
import {
  IDetailsRowStyleProps,
  IDetailsRowStyles,
  IDetailsRowCheckStyleProps,
  IDetailsRowCheckStyles,
  IDetailsHeaderStyles,
} from '@fluentui/react/lib/DetailsList';
import { FontWeights } from '@fluentui/react/lib/Styling';

export const CheckStyles = (props: ICheckStyleProps): Partial<ICheckStyles> => {
  const { theme, checked } = props;
  const { palette } = theme;

  return {
    circle: [!checked && { color: palette.neutralTertiaryAlt }],
    check: [!checked && { color: palette.neutralTertiaryAlt }],
  };
};

export const DetailsRowCheckStyles = (props: IDetailsRowCheckStyleProps): Partial<IDetailsRowCheckStyles> => {
  const { isHeader, compact } = props;
  const height = isHeader ? 32 : compact ? 32 : 42;

  return {
    check: {
      height: height,
    },
  };
};

export const DetailsHeaderStyles: Partial<IDetailsHeaderStyles> = {
  root: {
    height: 32,
    lineHeight: '32px',
  },
  check: {
    height: 32,
  },
  cellIsCheck: {
    height: 32,
  },
  cellIsGroupExpander: {
    height: 32,
  },
};

export const DetailsRowStyles = (props: IDetailsRowStyleProps): Partial<IDetailsRowStyles> => {
  const { isSelected } = props;

  return {
    isRowHeader: [
      isSelected && {
        fontWeight: FontWeights.regular,
      },
    ],
  };
};
