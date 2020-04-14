import { IRenderer } from 'fela';

export type Renderer = IRenderer & {
  cache: Record<string, RendererChange>;
  _emitChange?: (change: RendererChange) => void;
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
