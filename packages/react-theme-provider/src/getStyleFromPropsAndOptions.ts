import { tokensToStyleObject } from './tokensToStyleObject';
import { StyleProps, StyleOptions } from './types';

export const getStyleFromPropsAndOptions = <TProps extends StyleProps, TOptions extends StyleOptions<TProps>>(
  props: TProps,
  options: TOptions,
  prefix?: string,
) => {
  let rootSlotStyle: React.CSSProperties = {};
  options.slotProps.forEach(definition => {
    const nextSlotProps = definition(props);
    rootSlotStyle = { ...rootSlotStyle, ...(nextSlotProps.root as any)?.style };
  });
  return { ...props.style, ...rootSlotStyle, ...tokensToStyleObject(props.tokens, prefix) };
};
