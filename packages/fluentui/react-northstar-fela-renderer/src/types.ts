import { IRenderer } from 'fela';

// DOM
// ---

export type NodeAttributes = Record<string, string>;
export type StyleNodeAttributes = Record<string, string>;

export type SortMediaQueryFn = (a: string, b: string) => number;

export type RendererParam = {
  direction: 'ltr' | 'rtl';
  disableAnimations: boolean;
  displayName: string;
  sanitizeCss: boolean;
};

export type ICSSInJSStyle = any;

// Generic renderer
//
//

export type RendererRenderRule = (styles: ICSSInJSStyle, param: RendererParam, changes: RendererRuleChange[]) => string;

export type RendererRuleChange = {
  type: 'RULE';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;
};
export type RendererChange =
  | RendererRuleChange
  | {
      type: 'KEYFRAME';
      keyframe: string;
    };

export type Renderer = {
  insertChanges: (targetDocument: Document, changes: RendererChange[]) => void;
  renderRule: RendererRenderRule;
};

export type CreateRenderer = (target?: Document) => Renderer;

// Fela
// ---

export type FelaRenderer = IRenderer & {
  cache: Record<string, RendererChange>;
  selectorPrefix?: string;

  ruleOrder: any;
  scoreIndex: any;

  sortMediaQuery: SortMediaQueryFn;
  nodes: Record<string, HTMLStyleElement>;

  getNextRuleIdentifier: () => string;
  filterClassName: () => boolean;

  _emitChange: (change: RendererChange) => void;

  _renderStyle(style: ICSSInJSStyle, props: Record<string, unknown>, changes: RendererRuleChange[]): string;
  _renderStyleToClassNames(
    { _className, ...style }: ICSSInJSStyle & { _className: string },
    changes?: RendererChange[],
    pseudo?: string,
    media?: string,
    support?: string,
  ): string;

  styleNodeAttributes: StyleNodeAttributes;
};

export type FelaRendererParam = Omit<RendererParam, 'direction'> & { theme: { direction: RendererParam['direction'] } };
