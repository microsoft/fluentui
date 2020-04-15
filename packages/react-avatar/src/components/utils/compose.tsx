import { forwardRef, RefObject } from 'react';
import { assign, merge } from '@uifabric/utilities';
import { useStylesheet } from './StylesheetProvider';
import cx from 'classnames';

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

export type ComposedComponent<
  TProps = {},
  // tslint:disable-next-line:no-any
  TOptions = ComposeOptions<any, any, any, any>
> = React.ForwardRefExoticComponent<TProps> & {
  options: TOptions;
  parent: ComposedComponent;
} & ComposeStandardStatics;

export interface ComposeStandardStatics {
  displayName?: string;
  handledProp?: string;
  stylesheets?: string[];
}

// tslint:disable-next-line:no-any
export const extractFromSass = (classes: any) => {
  return {
    classes: classes.locals,
    stylesheet: classes && classes[0] && classes[0][1],
  };
};

const collectStylesheets = (
  // tslint:disable-next-line:no-any
  slots: { [key: string]: any },
  defaultSheets: string[] = [],
  stylesheets: string[] = [...defaultSheets],
) => {
  if (slots) {
    Object.keys(slots).forEach(slotName => {
      const slot = slots[slotName];

      if (slot && slot.stylesheets) {
        stylesheets = slot.stylesheets.concat(stylesheets);
      }
    });
  }

  return stylesheets.filter(sheet => !!sheet);
};

const mergeClasses = (classes1: ClassDictionary, classes2: ClassDictionary) => {
  const result = { ...classes1 };

  if (classes2) {
    Object.keys(classes2).forEach(name => (result[name] = cx(result[name], classes2[name])));
  }
  console.log(result);
  return result;
};

export function compose<TProps = {}, TSlots = {}, TSlotProps = {}, TStatics = ComposeStandardStatics>(
  render:
    | ComposeRender<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>
    | ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>,
  options: Partial<ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>,
): ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>> {
  // tslint:disable-next-line:no-any
  const parentOptions = (render as any).options || {};

  // Initial merge of options.
  const mergedOptions = {
    render: parentOptions.render || render,
    defaultProps: Object.assign({}, parentOptions.defaultProps, options.defaultProps),
    classes: mergeClasses(parentOptions.classes, options.classes),
    stylesheet: [parentOptions.stylesheet, options.stylesheet],
    slots: Object.assign({}, parentOptions.slots, options.slots),
    slotProps: Object.assign({}, parentOptions.slotProps, options.slotProps),
    statics: Object.assign({}, parentOptions.statics, options.statics),
  };

  let mergedStylesheets: string[] = [];

  if (options.stylesheet) {
    mergedStylesheets.unshift(options.stylesheet);
  }

  // tslint:disable-next-line:no-any
  if ((render as any).stylesheets) {
    // tslint:disable-next-line:no-any
    mergedStylesheets = (render as any).stylesheets.concat(mergedStylesheets);
  }

  mergedStylesheets = collectStylesheets(mergedOptions.slots, mergedStylesheets);

  // Build the component.
  // tslint:disable-next-line:no-any
  const ComposedComponentImpl: any = forwardRef((userProps: TProps, ref: RefObject<HTMLElement>) => {
    // Register styles as needed.
    if (mergedOptions.stylesheet) {
      const { register, hasRegistered } = useStylesheet();

      if (options.stylesheet && !hasRegistered(options.stylesheet)) {
        // We haven't tried registering this stylesheet. We need to collect all stylesheets starting at leafs.
        console.log(mergedStylesheets);
        register(mergedStylesheets);
      }
    }

    // Render component.
    return mergedOptions.render(userProps, ref, mergedOptions);
  });

  // Mix in statics.
  assign(ComposedComponentImpl, mergedOptions.statics);

  // tslint:disable-next-line:no-any
  if ((render as any).options) {
    ComposedComponentImpl.parent = render;
  }
  if (options.stylesheet) {
    // tslint:disable-next-line:no-any
    ComposedComponentImpl.stylesheets = mergedStylesheets;
  }
  // Cache options for recomposition.
  // tslint:disable-next-line:no-any
  (ComposedComponentImpl as any).options = mergedOptions;

  return ComposedComponentImpl as ComposedComponent<TProps, ComposeOptions<TProps, TSlots, TSlotProps, TStatics>>;
}
