/* eslint-disable */
// @ts-ignore
import objectEach from 'fast-loops/lib/objectEach';
import * as React from 'react';

import render from './dom/render';
import { FelaRenderer } from './types';

function hasDOM(renderer: FelaRenderer, targetDocument: Document | undefined) {
  if (typeof window === 'undefined') return false;
  if (!targetDocument) targetDocument = document;

  return renderer && targetDocument && targetDocument.createElement;
}

type RendererProviderProps = {
  renderer: FelaRenderer;
  targetDocument?: Document;
};

export class RendererProvider extends React.Component<RendererProviderProps> {
  constructor(props: RendererProviderProps) {
    super(props);

    this._renderStyle();
  }

  componentDidUpdate() {
    // TODO: we might add a shallow compare to avoid unnecessary rerenders
    this._renderStyle();
  }

  _renderStyle() {
    const { renderer, targetDocument } = this.props;

    if (hasDOM(renderer, targetDocument)) {
      render(renderer, targetDocument);
    }
  }

  render() {
    return <>{this.props.children}</>;
  }
}
