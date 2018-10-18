# Generic Theme Layers

The generic theme layers code provides helpers for implementing a set of cascading named layers.  These layers are designed to be used in themes but could be used anywhere cascading merging is desired.

## Contents, Layers, and Layer Collections

At its heart, the layer code has three main concepts.  Contents, layers and layer collections.

### Content

The entire layer system is a generic around a content type.  This is assumed to be an object of some kind and is treated as opaque from the point of the layer system.  A theme layer might have content that is as follows:

    export interface IMyContent {
      backgroundColor?: string,
      fontFamily?: string
    }

This content type is used as the generic type for all the routines in themeLayers.ts.

### Layers

A layer is a simple wrapping around IContent that adds a parent parameter.

    export type IThemeLayerBase<IContent> = IContents & {
      parent?: string | string[];
    }

This parent parameter can optionally contain one or more parent layers that the given layer should depend on.

### Layer Collections

A layer collection is simply a set of named layers.  It is defined as:

    export interface IThemeLayersBase<IContent> {
      [layer: string]: IThemeLayerBase<IContent>;
    }

When resolving parent relationships the layer code will require a layer collection to use for layer lookups.

## Advanced Usage

### Sub-Collections

Where things get more complicated is that each layer may have some properties that are themselves layer collections.  An common example would be something like selectors giving the ability to do something like:

    {
      backgroundColor: 'white',
      selectors: {
        ':hover': {
          backgroundColor: 'blue'
        }
      }
    }

Because content types are opaque to the generic code, sub-collections are generally specified as an optional string array of keys to treat differently.

### Mixins

While parent values are resolved __underneath__ a given layer, several routines allow for mixins which are applied __on-top__ of the layer.  This is generally used for things such as application of states such as disabled to a control.

As an example given the following layers:

    Button: {
      backgroundColor: 'white',
      color: 'black'
    },
    disabled: {
      color: 'gray'
    }

Applying disabled as a mixin would override the color for button.

### Overrides

There is an option of providing a sub-collection to treat as an override collection.  When applying mixins, values in these sub-layers will be promoted to override the values of a layer.  Extending the previous example:

    Button: {
      backgroundColor: 'white',
      borderThickness: 1,
      color: 'black'
      overrides: {
        disabled: {
          borderThickness: 0
        }
      }
    },
    disabled: {
      color: 'gray'
    }

Here using the mixin functionality for disabled will also trigger an override in button causing the borderThickness to change to 0 as well as having the color changed.

Generally the ordering goes:
* Parents > Layer > Mixins > Overrides
