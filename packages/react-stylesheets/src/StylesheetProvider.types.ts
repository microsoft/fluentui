/**
 * Props for the StylesheetProvider conmponent.
 */
export interface StylesheetProviderProps {
  /**
   * Optional callback for overriding the default render function for rendering stylesheets.
   */
  renderStyles?: (stylesheets: string[], context: StylesheetProviderProps) => void;

  /**
   * Target document to render styles to. Defaults to the `document` global object.
   */
  target?: Document;
}
