import { makeStyles } from '@fluentui/react-components';

const gapValues = {
  smaller: '8px',
  small: '10px',
  medium: '15px',
  large: '30px',
};

const paddingValues = {
  medium: '10px',
};

export const useFlexStyles = makeStyles({
  flex: {
    display: 'flex',
  },
  inline: {
    display: 'inline-flex',
  },
  column: {
    flexDirection: 'column',
  },
  alignItemsFlexStart: {
    alignItems: 'flex-start',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsFlexEnd: {
    alignItems: 'flex-end',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  justifyContentFlexStart: {
    justifyContent: 'flex-start',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentFlexEnd: {
    justifyContent: 'flex-end',
  },
  justifyContentStretch: {
    justifyContent: 'stretch',
  },
  justifyContentSpaceAround: {
    justifyContent: 'space-around',
  },
  justifyContentSpaceBetween: {
    justifyContent: 'space-between',
  },
  justifyContentSpaceEvenly: {
    justifyContent: 'space-evenly',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  fill: {
    width: '100%',
    height: '100%',
  },
  gapForColumnFlexSmall: {
    rowGap: gapValues.small,
  },
  gapForColumnFlexSmaller: {
    rowGap: gapValues.smaller,
  },
  gapForColumnFlexMedium: {
    rowGap: gapValues.medium,
  },
  gapForColumnFlexLarge: {
    rowGap: gapValues.large,
  },
  gapForRowFlexSmall: {
    columnGap: gapValues.small,
  },
  gapForRowFlexSmaller: {
    columnGap: gapValues.smaller,
  },
  gapForRowFlexMedium: {
    columnGap: gapValues.medium,
  },
  gapForRowFlexLarge: {
    columnGap: gapValues.large,
  },
  paddingMedium: {
    padding: paddingValues.medium,
  },
});
