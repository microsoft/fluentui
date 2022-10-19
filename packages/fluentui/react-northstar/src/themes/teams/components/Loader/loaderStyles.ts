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
    '& > .ui-loader__svg': {
      animation: '3s linear infinite',
      animationName: {
        '0%': {
          transform: 'rotate(0deg)',
        },
        '100%': {
          transform: 'rotate(360deg)',
        },
      },
      width: v.svgWidths[p.size],
      height: v.svgHeights[p.size],
      '& > circle': {
        cx: '50%',
        cy: '50%',
        r: '45',
        fill: 'none',
        strokeWidth: '8px',
        '&.ui-loader__track': {
          stroke: !p.secondary && v.svgTrackColor,
        },
        '&.ui-loader__tail': {
          animation: '1.5s cubic-bezier(0.33,0,0.67,1) infinite',
          strokeLinecap: 'round',
          strokeDasharray: '283',
          strokeDashoffset: '280',
          transformOrigin: '50% 50%',
          stroke: p.secondary ? v.svgSecondaryColor : v.svgTailColor,
          animationName: {
            '0%': {
              strokeDashoffset: '283',
              transform: 'rotate(0)',
            },
            '25%': {
              strokeDashoffset: '283',
              transform: 'rotate(0)',
            },
            '50%': {
              strokeDashoffset: '75',
              transform: 'rotate(45deg)',
            },
            '75%': {
              strokeDashoffset: '75',
              transform: 'rotate(45deg)',
            },
            '100%': {
              strokeDashoffset: '283',
              transform: 'rotate(360deg)',
            },
          },
        },
      },
    },
  }),
  label: () => ({
    margin: pxToRem(10),
  }),
};
