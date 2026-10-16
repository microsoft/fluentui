import type { Middleware } from '../floating';
import type { PositioningConfigurationFnOptions } from '../types';

export interface PositioningPluginContext {
  /**
   * The positioned element.
   */
  container: HTMLElement;
  /**
   * The arrow element, when one is rendered.
   */
  arrow: HTMLElement | null;
  /**
   * Positioning options (after being processed by `PositioningConfigurationProvider`).
   */
  options: PositioningConfigurationFnOptions;
  isRtl: boolean;
}

export interface PositioningPluginMiddleware {
  middleware: Middleware;
  /**
   * Middleware run in ascending order and the order matters (i.e. `shift` should run after `flip`).
   * Built-in plugins use the slots described by `POSITIONING_PLUGIN_ORDER`.
   */
  order: number;
}

/**
 * Creates the middleware that implements the plugin for the current options.
 * Should return nothing when the options don't require the plugin.
 */
export type PositioningPlugin = (
  context: PositioningPluginContext,
) => PositioningPluginMiddleware | PositioningPluginMiddleware[] | false | null | undefined;

export type { Middleware, MiddlewareState } from '../floating';
