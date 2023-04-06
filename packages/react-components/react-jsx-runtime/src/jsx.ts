import * as React from 'react';
import {
  SlotRenderFunction,
  UnknownSlotProps,
  SLOT_EXTERNAL_CHILDREN_SYMBOL,
  SLOT_INTERNAL_CHILDREN_SYMBOL,
} from '@fluentui/react-utilities';

type WithMetadata<Props extends {}> = Props & {
  [SLOT_EXTERNAL_CHILDREN_SYMBOL]: React.ReactNode | SlotRenderFunction<Props>;
  [SLOT_INTERNAL_CHILDREN_SYMBOL]: React.ReactNode | SlotRenderFunction<Props>;
};

/**
 * Equivalent to React.createElement but supporting v9 slot API
 */
export function jsx<P extends {}>(
  type: React.ElementType<P>,
  props?: P | null,
  ...children: React.ReactNode[]
): React.ReactElement<P> | null {
  return isSlotComponent(props)
    ? jsxFromSlotComponent(type, props, ...children)
    : React.createElement(type, props, ...children);
}

function jsxFromSlotComponent<Props extends UnknownSlotProps>(
  type: React.ElementType<Props>,
  propsWithMetadata: WithMetadata<Props>,
  ...overrideChildren: React.ReactNode[]
): React.ReactElement<Props> | null {
  const { children, renderFn, props } = normalizeChildren(propsWithMetadata, overrideChildren);
  if (renderFn) {
    return React.createElement(React.Fragment, {}, renderFn(type, { ...props, children })) as React.ReactElement<Props>;
  }

  return React.createElement<Props>(type, { ...props, children } as Props);
}

export function extractChildrenFromProps<Props extends React.PropsWithChildren<{}>>(
  props?: Props | null,
): React.ReactNode[] {
  if (!props) {
    return [];
  }
  return Array.isArray(props.children) ? props.children : [props.children];
}

function normalizeChildren<Props extends UnknownSlotProps>(
  propsWithMetadata: WithMetadata<Props>,
  overrideChildren: React.ReactNode[] = [],
): {
  props: Props;
  children: React.ReactNode;
  renderFn?: SlotRenderFunction<Props>;
} {
  const {
    [SLOT_EXTERNAL_CHILDREN_SYMBOL]: slotExternalChildren,
    [SLOT_INTERNAL_CHILDREN_SYMBOL]: slotInternalChildren,
    ...props
  } = propsWithMetadata;
  const isRenderFn = typeof slotExternalChildren === 'function';
  const notNormalizedChildren: React.ReactNode | React.ReactNode[] =
    (overrideChildren.length > 0 ? overrideChildren : undefined) ??
    (isRenderFn ? slotInternalChildren : slotExternalChildren) ??
    slotInternalChildren ??
    propsWithMetadata.children;
  const normalizedChildren = Array.isArray(notNormalizedChildren)
    ? React.createElement(React.Fragment, {}, ...notNormalizedChildren)
    : notNormalizedChildren;
  const renderFn = isRenderFn ? (slotExternalChildren as SlotRenderFunction<Props>) : undefined;
  if (isRenderFn) {
    const { children: _, ...propsWithoutChildren } = props as UnknownSlotProps;
    return {
      children: normalizedChildren,
      renderFn,
      props: propsWithoutChildren as Props,
    };
  }
  return {
    children: normalizedChildren,
    renderFn,
    props: props as UnknownSlotProps as Props,
  };
}

export function isSlotComponent<Props extends {}>(props?: Props | null): props is WithMetadata<Props> {
  return Boolean(props?.hasOwnProperty(SLOT_INTERNAL_CHILDREN_SYMBOL));
}
