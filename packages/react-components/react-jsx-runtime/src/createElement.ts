import * as React from 'react';
import { SlotRenderFunction, UnknownSlotProps, SLOT_RENDER_FUNCTION_SYMBOL } from '@fluentui/react-utilities';

type WithMetadata<Props extends {}> = Props & {
  [SLOT_RENDER_FUNCTION_SYMBOL]: SlotRenderFunction<Props>;
};

export function createElement<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  ...children: React.ReactNode[]
): React.ReactElement<P> | null {
  return hasRenderFunction(props)
    ? createElementFromRenderFunction(type, props, children)
    : React.createElement(type, props, ...children);
}

function createElementFromRenderFunction<P extends UnknownSlotProps>(
  type: React.ElementType<P>,
  props: WithMetadata<P>,
  overrideChildren: React.ReactNode[],
): React.ReactElement<P> | null {
  const { [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction, ...renderProps } = props;

  if (overrideChildren.length > 0) {
    renderProps.children = React.createElement(React.Fragment, {}, ...overrideChildren);
  }

  return React.createElement(
    React.Fragment,
    {},
    renderFunction(type, renderProps as UnknownSlotProps as P),
  ) as React.ReactElement<P>;
}

export function hasRenderFunction<Props extends {}>(props?: Props | null): props is WithMetadata<Props> {
  return Boolean(props?.hasOwnProperty(SLOT_RENDER_FUNCTION_SYMBOL));
}
