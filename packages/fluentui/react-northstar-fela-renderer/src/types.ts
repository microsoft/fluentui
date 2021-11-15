import { IRenderer } from 'fela';
import { RendererParam } from '@fluentui/react-northstar-styles-renderer';
import { ICSSInJSStyle } from '@fluentui/styles';

import type { StyleBucketName } from './makeStylesCompat';

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

  listeners: [];
  nodes: Record<string, HTMLStyleElement>;
  updateSubscription: Parameters<IRenderer['subscribe']>[0] | undefined;

  isCompat: boolean;
};

export type FelaRendererChange = {
  type: 'RULE' | 'KEYFRAME' | 'FONT' | 'STATIC' | 'CLEAR';
  className: string;
  selector: string;
  declaration: string;
  pseudo: string;
  media: string;
  support: string;

  // Optional for "type: RULE"
  bucket?: StyleBucketName;
  // Optional for "type: STATIC"
  css?: string;
};

export type FelaRendererParam = Omit<RendererParam, 'direction'> & { theme: { direction: RendererParam['direction'] } };
