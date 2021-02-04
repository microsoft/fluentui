import * as React from 'react';
import { tokensToStyleObject } from './tokensToStyleObject';
import { StyleProps, StyleOptions } from './types';

export const getStyleFromPropsAndOptions = <TProps extends StyleProps, TOptions extends StyleOptions<TProps>>(
  props: TProps,
  options: TOptions,
  prefix?: string,
): React.CSSProperties => {
  let rootSlotStyle: React.CSSProperties = {};
  options.slotProps.forEach(definition => {
    const nextSlotProps = definition(props);
    rootSlotStyle = { ...rootSlotStyle, ...(nextSlotProps.root as { style?: React.CSSProperties })?.style };
  });
  return { ...props.style, ...rootSlotStyle, ...tokensToStyleObject(props.tokens, prefix) };
};
