import type { FallbackInput, FallbackPlacement, FallbackRect } from '../fallback/computeFallbackPosition';
import type { ExtendedPositioningProps, PositioningTarget } from '../types';

export interface PositioningPluginContext {
  options: ExtendedPositioningProps;
  container: HTMLElement;
  target: PositioningTarget;
  arrow: HTMLElement | null;
  /** Direction of the containing block */
  rtl: boolean;
}

export interface PositioningPluginUpdate extends PositioningPluginContext {
  /** The placement that is used, `null` when it can't be resolved */
  placement: FallbackPlacement | null;
  /** Rect of the target in the viewport */
  anchor: FallbackRect;
  /** Rect of the container in the viewport */
  popup: FallbackRect;
  /** Rect of the containing block in the viewport */
  bounds: FallbackRect;
}

/**
 * Plugins add the options that are not handled by CSS anchor positioning.
 */
export interface PositioningPlugin {
  /**
   * The browser can't position the element with CSS for these options, the position is computed in JavaScript.
   */
  requiresJs?: (options: ExtendedPositioningProps) => boolean;
  /**
   * Adjusts how the position is computed in JavaScript.
   */
  prepare?: (input: FallbackInput, context: PositioningPluginContext) => FallbackInput;
  /**
   * Runs after the element was positioned, no matter if it was done by CSS or JavaScript.
   */
  apply?: (update: PositioningPluginUpdate) => void;
}
