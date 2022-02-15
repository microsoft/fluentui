import { ICSSInJSStyle, FontFace } from '@fluentui/styles';
import * as React from 'react';

export type RendererParam = {
  direction: 'ltr' | 'rtl';
  disableAnimations: boolean;
  displayName: string;
  sanitizeCss: boolean;
};

export type RendererRenderFont = (font: FontFace) => void;
export type RendererRenderGlobal = (styles: ICSSInJSStyle | string, selector?: string) => void;
export type RendererRenderRule = (styles: ICSSInJSStyle, param: RendererParam) => string;

export type Renderer = {
  registerUsage: () => void;
  unregisterUsage: () => void;

  renderGlobal: RendererRenderGlobal;
  renderFont: RendererRenderFont;
  renderRule: RendererRenderRule;

  Provider: React.FC<{ target: Document | undefined }>;
};

export type CreateRenderer = (target?: Document) => Renderer;
