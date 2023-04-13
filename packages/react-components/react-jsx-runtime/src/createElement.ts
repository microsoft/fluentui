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
  if (!isSlotComponent(props)) {
    return React.createElement(type, props, ...children);
  }

  const result = normalizeRenderFunction(props, children);
  return React.createElement(
    React.Fragment,
    {},
    result.renderFunction(type, { ...result.props, children: result.children }),
  ) as React.ReactElement<P>;
}

function normalizeRenderFunction<Props extends UnknownSlotProps>(
  propsWithMetadata: WithMetadata<Props>,
  overrideChildren?: React.ReactNode[],
): {
  props: Props;
  children: React.ReactNode;
  renderFunction: SlotRenderFunction<Props>;
} {
  const { [SLOT_RENDER_FUNCTION_SYMBOL]: renderFunction, children: externalChildren, ...props } = propsWithMetadata;

  const children: React.ReactNode =
    Array.isArray(overrideChildren) && overrideChildren.length > 0
      ? React.createElement(React.Fragment, {}, ...overrideChildren)
      : externalChildren;

  return {
    children,
    renderFunction,
    props: props as UnknownSlotProps as Props,
  };
}

export function isSlotComponent<Props extends {}>(props?: Props | null): props is WithMetadata<Props> {
  return Boolean(props?.hasOwnProperty(SLOT_RENDER_FUNCTION_SYMBOL));
}
