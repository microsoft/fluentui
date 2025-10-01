import type { IRenderer } from 'fela';
import * as React from 'react';

// DOM
// ---

export type StyleNodeAttributes = Record<string, string>;

export type SortMediaQueryFn = (a: string, b: string) => number;

export type RendererParam = {
  direction: 'ltr' | 'rtl';
  disableAnimations: boolean;
  displayName: string;
  sanitizeCss: boolean;
};

// Applied as any to avoid circular references
export type ICSSInJSStyle = any;

// Generic renderer
//
//

export type RendererRenderRule = (styles: ICSSInJSStyle, param: RendererParam) => string;

export type Renderer = {
  registerUsage: () => void;
  unregisterUsage: () => void;

  renderRule: RendererRenderRule;

  Provider: React.FC<{ target: Document | undefined }>;
};

export type CreateRenderer = (target?: Document) => Renderer;

// Fela
// ---

export type FelaRendererRuleChange = {
  type: 'RULE';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;
};

export type FelaRendererChange =
  | FelaRendererRuleChange
  | {
      type: 'KEYFRAME';
      keyframe: string;
    };

export type FelaRenderer = IRenderer & {
  cache: Record<string, FelaRendererChange>;
  selectorPrefix?: string;

  sortMediaQuery: SortMediaQueryFn;
  nodes: Record<string, HTMLStyleElement>;

  getNextRuleIdentifier: () => string;
  filterClassName: () => boolean;

  _emitChange: (change: FelaRendererChange) => void;

  _renderStyleToClassNames(
    { _className, ...style }: ICSSInJSStyle & { _className: string },
    pseudo?: string,
    media?: string,
    support?: string,
  ): string;

  styleNodeAttributes: StyleNodeAttributes;
};

export type FelaRendererParam = Omit<RendererParam, 'direction'> & { theme: { direction: RendererParam['direction'] } };
