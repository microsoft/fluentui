import { ComponentSlotStylesPrepared, ComponentStyleFunctionParam, ICSSInJSStyle } from '@fluentui/styles';
import { Property } from 'csstype';
import { LoaderStylesProps } from '../../../../components/Loader/Loader';
import { LoaderVariables } from './loaderVariables';
import { pxToRem } from '../../../../utils';
import { ObjectOf } from '../../../../types';

const rootFlexDirections: ObjectOf<Property.FlexDirection> = {
  above: 'column-reverse',
  below: 'column',
  start: 'row-reverse',
  end: 'row',
};

export const loaderStyles: ComponentSlotStylesPrepared<LoaderStylesProps, LoaderVariables> = {
  root: ({ props: p }: ComponentStyleFunctionParam<LoaderStylesProps, LoaderVariables>): ICSSInJSStyle => ({
    alignItems: 'center',
    display: p.inline ? 'inline-flex' : 'flex',
    justifyContent: 'center',
    flexDirection: rootFlexDirections[p.labelPosition],
  }),
  indicator: ({
    props: p,
    variables: v,
  }: ComponentStyleFunctionParam<LoaderStylesProps, LoaderVariables>): ICSSInJSStyle => ({
    height: v.containerHeights[p.size],
    width: v.containerWidths[p.size],
    overflow: 'hidden',
  }),
  svg: ({ props: p, theme: t, variables: v }: ComponentStyleFunctionParam<LoaderStylesProps, LoaderVariables>) => {
    const outerAnimation: ICSSInJSStyle = {
      animationName: {
        to: {
          opacity: 1,
        },
      },
      animationDelay: '1.5s',
      animationDirection: 'normal',
      animationDuration: '.3s',
      animationFillMode: 'both',
      animationIterationCount: '1',
      animationPlayState: 'running',
      animationTimingFunction: 'ease-out',
      display: 'block',
      overflow: 'hidden',
      position: 'relative',
    };
    const svgAnimation: ICSSInJSStyle = {
      animationName: {
        to: {
          transform: `translate3d(0, ${v.svgTranslatePosition[p.size]}, 0)`,
        },
      },
      animationDelay: '0s',
      animationDirection: 'normal',
      animationDuration: '2s',
      animationFillMode: 'both',
      animationPlayState: 'running',
      animationTimingFunction: 'steps(60, end)',
      animationIterationCount: 'infinite',
    };

    return {
      ...outerAnimation,

      ':before': {
        ...svgAnimation,

        backgroundImage: p.secondary ? v.secondarySvgContent : v.svgContent,
        content: '" "',
        display: 'block',
        overflow: 'hidden',

        height: v.svgHeights[p.size],
        width: v.svgWidths[p.size],
      },
    };
  },
  label: () => ({
    margin: pxToRem(10),
  }),
};
