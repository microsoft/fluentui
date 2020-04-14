import { forwardRef, RefObject } from 'react';
import { assign, merge } from '@uifabric/utilities';
import { useStylesheet } from './useStylesheet';

const OPTIONS_NAME = '__options__';

export type ComposeRender<TProps, TOptions> = (
  props: TProps,
  ref?: React.RefObject<HTMLElement>,
  options?: TOptions,
) => JSX.Element;

// tslint:disable-next-line:no-any
export type ClassDictionary = any;

export interface ComposeOptions<TProps, TSlots, TSlotProps, TStatics> {
  render: ComposeRender<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>;
  defaultProps: TProps;
  classes: ClassDictionary;
  stylesheet: string;
  slots: { [key in keyof TSlots]?: TSlots[key] | null };
  slotProps: TSlotProps;
  statics: TStatics;
}

export type ComposedComponent<TProps, TOptions> = React.ForwardRefExoticComponent<TProps> & {
  [OPTIONS_NAME]: TOptions;
};

export interface ComposeStandardStatics {
  displayName?: string;
  handledProp?: string;
}

// tslint:disable-next-line:no-any
export const extractStylesFromSass = (classes: any) => {
  return {
    classes: classes.locals,
    stylesheet: classes && classes[0] && classes[0][1],
  };
};

export function compose<TProps = {}, TSlots = {}, TSlotProps = {}, TStatics = ComposeStandardStatics>(
  render:
    | ComposeRender<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>
    | ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>,
  options: Partial<ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>,
): ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>> {
  // tslint:disable-next-line:no-any
  const parentOptions = (render as any)[OPTIONS_NAME] || {};

  // const { classes, ...rest } = options;

  // const classDefinition = {
  //   // tslint:disable-next-line:no-any
  //   classes: classes && (classes as any).locals,
  //   // tslint:disable-next-line:no-any
  //   stylesheet: classes && (classes as any)[0][1],
  // };

  // Initial merge of options.
  const mergedOptions = merge<ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>(
    {},
    parentOptions,
    options,
    // rest,
    // classDefinition,
    {
      render: parentOptions.render || render,
    },
  );

  // Build the component.
  const ComposedComponentImpl = forwardRef((userProps: TProps, ref: RefObject<HTMLElement>) => {
    // Register styles as needed.
    if (mergedOptions.stylesheet) {
      // TODO!!!!!!!!!!!
      // =============================================================
      // Expected: The order of stylesheet registrations should be leafs then parents.
      // Results: Parents first, then children.
      //
      // We'd want to go recurse through any slots and build up a
      // child to parent order of stylesheet registrations.
      // As this code sits, stylesheet registration depends on the
      // order components are rendered, which means parents first,
      // then children. This means parent rules "overriding" child rules
      // would fight specificity constantly.
      useStylesheet(mergedOptions.stylesheet);
    }

    // Render component.
    return mergedOptions.render(userProps, ref, mergedOptions);
  });

  // Mix in statics.
  assign(ComposedComponentImpl, mergedOptions.statics);

  // Cache options for recomposition.
  // tslint:disable-next-line:no-any
  (ComposedComponentImpl as any)[OPTIONS_NAME] = mergedOptions;

  return ComposedComponentImpl as ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>;
}
