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
    return {
      ':before': {
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
