import { IRenderer } from 'fela';
import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
import { ICSSInJSStyle } from '@fluentui/styles';

export type FelaRenderer = IRenderer & {
  cache: Record<string, FelaRendererChange>;
  selectorPrefix?: string;

  getNextRuleIdentifier: () => string;
  filterClassName: () => boolean;

  _emitChange: (change: FelaRendererChange) => void;
  _renderStyleToClassNames(
    { _className, ...style }: ICSSInJSStyle & { _className: string },
    pseudo?: string,
    media?: string,
    support?: string,
  ): string;

  styleNodeAttributes: Record<string, string | number | boolean>;
};

export type FelaRendererChange = {
  type: 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC' | 'CLEAR';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;
};

export type FelaRendererParam = Omit<RendererParam, 'direction'> & { theme: { direction: RendererParam['direction'] } };
