import { IRenderer } from 'fela';
import { StylesContextValue, Telemetry } from '@fluentui/react-bindings';

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

export interface ProviderContextPrepared extends StylesContextValue {
  // `target` can be undefined for SSR
  target: Document | undefined;
  telemetry: Telemetry | undefined;
}
