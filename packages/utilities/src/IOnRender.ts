/**
 * Render function interface for providing overrideable render callbacks.
 *
 * @public
 */
export interface IOnRender<TProps> {
  (props: TProps, defaultRender?: (props: TProps) => JSX.Element | null): JSX.Element | null;
}
