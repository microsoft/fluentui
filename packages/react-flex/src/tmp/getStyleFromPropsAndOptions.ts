import * as React from 'react';
import { tokensToStyleObject } from './tokensToStyleObject';
import { StyleProps, StyleOptions } from './types';
import { ColorTokenSet } from '@fluentui/theme';

// StyleProps has a generic type parameter defaulting to ColorTokenSet.
// If we don't specify the generic here, TProps emits like this in the .d.ts:
//   TProps extends StyleProps<import("@fluentui/theme").ColorTokenSet>
// and the import() causes issues for API Extractor.
export const getStyleFromPropsAndOptions = <
  TProps extends StyleProps<ColorTokenSet>,
  TOptions extends StyleOptions<TProps>
>(
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
