import { IRenderer } from 'fela';
import { ICSSInJSStyle } from '@fluentui/styles';

export type Renderer = IRenderer & {
  cache: Record<string, RendererChange>;
  selectorPrefix?: string;

  getNextRuleIdentifier: () => string;
  filterClassName: () => boolean;

  _emitChange: (change: RendererChange) => void;
  _renderStyleToClassNames(
    { _className, ...style }: ICSSInJSStyle & { _className: string },
    pseudo?: string,
    media?: string,
    support?: string,
  ): string;
};

export type RendererChange = {
  type: 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC' | 'CLEAR';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;
};
