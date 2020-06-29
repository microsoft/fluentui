import * as React from 'react';
import {
  Shimmer,
  IShimmerStyleProps,
  IShimmerStyles,
  ShimmerElementsGroup,
  ShimmerElementType,
} from 'office-ui-fabric-react/lib/Shimmer';
import { mergeStyleSets, ITheme, createTheme } from 'office-ui-fabric-react/lib/Styling';
import { Customizer } from 'office-ui-fabric-react/lib/Utilities';

// Custom theme passed to Customizer
const customThemeForShimmer: ITheme = createTheme({
  palette: {
    // palette slot used in Shimmer for main background
    neutralLight: '#bdd4ed',
    // palette slot used in Shimmer for tip of the moving wave
    neutralLighter: '#7AAFE7',
    // palette slot used in Shimmer for all the space around the shimmering elements
    white: '#0078D4',
  },
});

const shimmerElements = [
  { type: ShimmerElementType.circle, height: 24 },
  { type: ShimmerElementType.gap, width: '2%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '5%' },
  { type: ShimmerElementType.line, height: 16, width: '20%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16, width: '15%' },
  { type: ShimmerElementType.gap, width: '10%' },
  { type: ShimmerElementType.line, height: 16 },
];

const classNames = mergeStyleSets({
  wrapper: {
    selectors: {
      '& > .ms-Shimmer-container': {
        margin: '10px 0',
      },
    },
  },
  themedBackgroundWrapper: {
    padding: 20,
    margin: '10px 0',
    height: 100,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    // using the palette color to match the gaps and borders of the shimmer.
    background: customThemeForShimmer.palette.white,
    selectors: {
      '& > .ms-Shimmer-container': {
        flexGrow: 1,
      },
    },
  },
  themedBackgroundWrapper2: {
    width: 400,
    height: 100,
    margin: '10px 0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // using the palette color to match the gaps and borders of the shimmer.
    background: customThemeForShimmer.palette.white,
    outline: `1px solid ${customThemeForShimmer.palette.neutralPrimary}`,
    outlineOffset: '-10px',
  },
  indent: {
    paddingLeft: 18,
  },
});

// Passing a color to match the background color of the containing div.
const getCustomElements = (backgroundColor?: string) => {
  return (
    <div style={{ display: 'flex' }}>
      <ShimmerElementsGroup
        backgroundColor={backgroundColor}
        shimmerElements={[
          { type: ShimmerElementType.circle, height: 40 },
          { type: ShimmerElementType.gap, width: 16, height: 40 },
        ]}
      />
      <ShimmerElementsGroup
        backgroundColor={backgroundColor}
        flexWrap
        width="100%"
        shimmerElements={[
          { type: ShimmerElementType.line, width: '100%', height: 10, verticalAlign: 'bottom' },
          { type: ShimmerElementType.line, width: '90%', height: 8 },
          { type: ShimmerElementType.gap, width: '10%', height: 20 },
        ]}
      />
    </div>
  );
};

const getShimmerStyles = (props: IShimmerStyleProps): IShimmerStyles => {
  return {
    shimmerWrapper: [
      {
        backgroundColor: '#deecf9',
      },
    ],
    shimmerGradient: [
      {
        backgroundColor: '#deecf9',
        backgroundImage:
          'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, #c7e0f4 50%, rgba(255, 255, 255, 0) 100%)',
      },
    ],
  };
};

export const ShimmerStylingExample: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <div>
        Style overrides of shimmering wave and space around in cases where Shimmer is placed on backgrounds different
        than the main background of the app. There are several scenarios that can be considered bellow:
      </div>
      <div>
        <b>1.</b> The recommended way by using the <b>shimmerColors</b> prop which in turn has 2 sub-scenarios:
      </div>
      <div className={classNames.indent}>
        <b>a. </b>When using
        <b>shimmerElements</b> prop to build the placeholder you can pass all 3 possible colors to
        <b>shimmerColors</b> prop.
      </div>
      <div className={classNames.themedBackgroundWrapper}>
        <Shimmer
          shimmerColors={{
            shimmer: customThemeForShimmer.palette.themeTertiary,
            shimmerWave: customThemeForShimmer.palette.themeSecondary,
            background: customThemeForShimmer.palette.white,
          }}
          shimmerElements={shimmerElements}
        />
      </div>
      <div className={classNames.indent}>
        <b>b. </b>When using <b>customElementsGroup</b> prop to build the placeholder:
      </div>
      <div className={classNames.themedBackgroundWrapper2}>
        <Shimmer
          customElementsGroup={getCustomElements(customThemeForShimmer.palette.white)}
          width="300"
          shimmerColors={{
            shimmer: customThemeForShimmer.palette.themeTertiary,
            shimmerWave: customThemeForShimmer.palette.themeSecondary,
          }}
        />
      </div>
      <div>
        <b>2. </b>Another way of doing it by using <b>Customizer</b> component wrapper.
      </div>
      <Customizer settings={{ theme: { ...customThemeForShimmer } }}>
        <div className={classNames.themedBackgroundWrapper2}>
          <Shimmer customElementsGroup={getCustomElements()} width="300" />
        </div>
      </Customizer>
      <div>
        <b>3. </b>Style overrides of shimmering wave using <b>styles</b> prop.
      </div>
      <div className={classNames.wrapper}>
        <Shimmer width="75%" styles={getShimmerStyles} />
        <Shimmer width="75%" styles={getShimmerStyles} />
        <Shimmer width="75%" styles={getShimmerStyles} />
        <Shimmer width="75%" styles={getShimmerStyles} />
        <Shimmer width="75%" styles={getShimmerStyles} />
      </div>
    </React.Fragment>
  );
};
