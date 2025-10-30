import type { IRenderer } from 'fela';

// DOM
// ---

export type StyleNodeAttributes = {
  media?: string;
  support?: string;

  type: 'KEYFRAME' | 'RULE' | 'CLEAR';
};

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

  insertPendingRules: () => void;
  renderRule: RendererRenderRule;
};

export type CreateRenderer = (targetDocument?: Document) => Renderer;

// Fela
// ---

export type FelaRendererStyleNodeAttributes = Record<string, string>;

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
  | { type: 'CLEAR' }
  | {
      type: 'KEYFRAME';
      keyframe: string;
      media?: string;
      support?: string;
    };

export type FelaRenderer = IRenderer & {
  cache: Record<string, FelaRendererChange>;
  selectorPrefix?: string;

  ruleOrder: any;
  scoreIndex: any;

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

  styleNodeAttributes: FelaRendererStyleNodeAttributes;

  _pendingChanges: Set<FelaRendererChange>;
};

export type FelaRendererParam = Omit<RendererParam, 'direction'> & { theme: { direction: RendererParam['direction'] } };
