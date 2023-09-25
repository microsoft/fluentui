import { render, rehydrate } from 'fela-dom';
import * as React from 'react';

import { FelaRenderer } from './types';

// Copied from https://github.com/robinweser/fela/blob/master/packages/fela-bindings/src/RendererProviderFactory.js

function hasDOM(renderer: FelaRenderer, targetDocument: Document | undefined) {
  // ensure we're on a browser by using document since window is defined in e.g. React Native
  // see https://github.com/robinweser/fela/issues/736
  if (typeof document === 'undefined') {
    return false;
  }

  const doc = targetDocument || document;

  return renderer && doc && doc.createElement;
}

function hasServerRenderedStyle(targetDocument = document) {
  return targetDocument.querySelectorAll('[data-fela-type]').length > 0;
}

type RendererProviderProps = {
  renderer: FelaRenderer;
  rehydrate?: boolean;
  targetDocument?: Document;
};

// Typings provided by "fela" package are outdated, this overrides provides proper definition
declare module 'fela-dom' {
  function render(renderer: FelaRenderer, targetDocument?: Document): void;
  function rehydrate(renderer: FelaRenderer, targetDocument?: Document): void;
}

export class RendererProvider extends React.Component<RendererProviderProps, Record<string, unknown>> {
  constructor(props: RendererProviderProps) {
    super(props);
    this._renderStyle();
  }

  componentDidUpdate(prevProps: RendererProviderProps) {
    if (prevProps.renderer !== this.props.renderer) {
      // add warning that renderer is changed
      this._renderStyle();
    }
  }

  _renderStyle() {
    const { renderer, rehydrate: shouldRehydrate, targetDocument } = this.props;

    if (hasDOM(renderer, targetDocument)) {
      if (shouldRehydrate && hasServerRenderedStyle(targetDocument)) {
        rehydrate(renderer, targetDocument);
      } else {
        render(renderer, targetDocument);
      }
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}
