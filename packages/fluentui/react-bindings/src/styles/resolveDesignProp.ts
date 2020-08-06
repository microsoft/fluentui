import { Interpolation, serializeStyles } from '@emotion/serialize';
import { ComponentStyleFunctionParam } from '@fluentui/styles';
// @ts-ignore This module does not have typings
import cssjanus from 'cssjanus';

import { ComponentDesignProp } from '../styles/types';

export function resolveDesignProp(
  design: ComponentDesignProp,
  styleParam: ComponentStyleFunctionParam,
): { className: string; css: string } {
  const { rtl } = styleParam;

  const styles: Interpolation[] = Array.isArray(design)
    ? ((design as unknown) as Interpolation[])
    : [(design as unknown) as Interpolation];
  const serializedValue = serializeStyles(styles, {}, styleParam);

  const className = `design-${rtl ? 'rtl-' : ''}${serializedValue.name}`;
  const css = rtl ? cssjanus.transform(serializedValue.styles) : serializedValue.styles;

  return { className, css };
}
