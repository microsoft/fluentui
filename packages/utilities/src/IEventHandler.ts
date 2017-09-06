/**
 * Render function interface for providing overrideable event handler callbacks.
 *
 * @public
 */
export interface IEventHandler<TEvent> {
  (ev?: TEvent, defauntHandler?: (ev?: TEvent) => void): void;
}
