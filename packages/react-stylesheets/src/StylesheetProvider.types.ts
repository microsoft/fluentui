import { HTMLDirection } from './StylesheetContext';

/**
 *
 */
export interface StylesheetProviderProps {
  /**
   *
   */
  register?: (stylesheets: string[], context: StylesheetProviderProps) => void;

  /**
   *
   */
  renderSheets?: (stylesheets: string[], context: StylesheetProviderProps) => void;

  /**
   *
   */
  target?: Document;

  /**
   *
   */
  dir?: HTMLDirection;
}
