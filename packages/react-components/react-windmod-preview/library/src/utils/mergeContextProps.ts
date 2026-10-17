import { mergeCallbacks } from '@fluentui/react-utilities';
import clsx from 'clsx';

/**
 * Folds a component context's published value into a component's own props, so the props a windmod
 * component then destructures already carry the container's defaults. Four merge rules, one per
 * kind of prop:
 *
 * - **Scalars and slots — the local prop wins, the context is the default.** `props[key] ?? ctx[key]`,
 *   so a value the consumer passed is never overwritten by a container, and a `key` the consumer
 *   left `undefined` falls through to the context and then to the component's own destructuring
 *   default. This reproduces Griffel's `size = contextSize ?? 'medium'` spelling exactly.
 * - **Callbacks — both fire, context first.** `mergeCallbacks(ctx[key], props[key])`. A container
 *   that publishes an `onClick` still gets its handler called when the consumer also passes one;
 *   neither silently swallows the other.
 * - **`className` — `clsx(ctx.className, props.className)`.** Context first, local last, so a local
 *   declaration wins the cascade for equal specificity while the container's classes survive.
 * - **`style` — spread in that same direction**, so a local key overwrites the context's.
 *
 * `ref` is deliberately NOT merged — it takes the local-wins branch. Merging two refs requires
 * `useMergedRefs`, which is a hook and cannot live in a pure helper; no context in this library
 * publishes one, and quietly calling a ref with `mergeCallbacks` would break object refs outright.
 *
 * The `className` branch is NOT decorative. MenuItemContext publishes the MenuSplitGroup seam class
 * on it, and that merge — context first, local last — is the whole mechanism by which a split group
 * styles halves it can neither class nor slot. The callback and `style` branches are still unreached
 * by any shipped context; they exist so a later, wider one needs no second helper.
 *
 * Pass a container-owned context (`FieldContext`) already narrowed to the keys the styling layer
 * reads — the wide aria half of that value is the base hooks' business, not this helper's.
 */
export function mergeContextProps<TProps extends object>(
  contextValue: Partial<TProps> | undefined,
  props: TProps,
): TProps {
  if (contextValue === undefined) {
    return props;
  }

  let merged: Record<string, unknown> | undefined;

  for (const key of Object.keys(contextValue)) {
    const fromContext = (contextValue as Record<string, unknown>)[key];

    // A context that publishes `undefined` for a key is publishing nothing for it: the component's
    // own destructuring default has to stay in charge of that key.
    if (fromContext === undefined) {
      continue;
    }

    const local = (props as Record<string, unknown>)[key];

    merged ??= { ...(props as Record<string, unknown>) };
    merged[key] = mergeValue(key, fromContext, local);
  }

  return (merged as TProps | undefined) ?? props;
}

/** React's own naming contract for an event handler prop, which is what `mergeCallbacks` is for. */
const isCallbackKey = (key: string): boolean =>
  key.length > 2 && key.startsWith('on') && key[2] === key[2].toUpperCase();

const mergeValue = (key: string, fromContext: unknown, local: unknown): unknown => {
  if (key === 'className') {
    return clsx(fromContext as string, local as string);
  }

  if (key === 'style') {
    return { ...(fromContext as object), ...(local as object) };
  }

  if (isCallbackKey(key) && typeof fromContext === 'function' && (local === undefined || typeof local === 'function')) {
    return mergeCallbacks(
      fromContext as (...args: unknown[]) => void,
      local as ((...args: unknown[]) => void) | undefined,
    );
  }

  return local ?? fromContext;
};
