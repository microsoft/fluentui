import { isValidElement } from 'react';
import type { AsIntrinsicElement, SlotComponent, SlotShorthandValue, UnknownSlotProps } from './types';
import { SLOT_COMPONENT_SYMBOL } from './constants';
import * as React from 'react';

export type SlotOptions<Props extends UnknownSlotProps> = {
  defaultProps?: Partial<Props>;
  overrides?: Partial<Props>;
  componentType:
    | React.ComponentType<Props>
    | (Props extends AsIntrinsicElement<infer As> ? As : keyof JSX.IntrinsicElements);
};

export function slot<Props extends UnknownSlotProps = UnknownSlotProps>(
  shorthand: Props | SlotShorthandValue | undefined,
  options: SlotOptions<Props> & { required: true },
): SlotComponent<Props>;
export function slot<Props extends UnknownSlotProps = UnknownSlotProps>(
  shorthand: Props | SlotShorthandValue | null | undefined,
  options: SlotOptions<Props> & { required?: boolean },
): SlotComponent<Props> | undefined;
export function slot<Props extends UnknownSlotProps = UnknownSlotProps>(
  shorthand: Props | SlotShorthandValue | null | undefined,
  options: SlotOptions<Props> & { required?: boolean },
): SlotComponent<Props> | undefined {
  const { required = false, defaultProps, overrides, componentType } = options;

  if (shorthand === null || (shorthand === undefined && !required)) {
    return undefined;
  }

  const props = { ...defaultProps };
  let renderFunction: Function | undefined;

  if (
    typeof shorthand === 'string' ||
    typeof shorthand === 'number' ||
    Array.isArray(shorthand) ||
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    isValidElement<any>(shorthand)
  ) {
    props.children = shorthand;
  } else if (typeof shorthand === 'object') {
    Object.assign(props, shorthand);
    if (typeof shorthand.children === 'function') {
      renderFunction = shorthand.children;
      props.children = defaultProps?.children;
    }
  }

  return {
    componentType,
    renderFunction,
    $$typeof: SLOT_COMPONENT_SYMBOL,
    props: Object.assign(props, overrides),
  } as SlotComponent<Props>;
}

export function isSlot<P extends {}>(element: React.ElementType<P>): element is SlotComponent<P> {
  return Boolean((element as React.ExoticComponent).$$typeof === SLOT_COMPONENT_SYMBOL);
}
