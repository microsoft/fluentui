export interface IProgressIndicatorProps {
  /**
   * Title of the operation.
   */
  title?: string;

  /**
   * Text describing or supplementing the operation.
   */
  description?: string;

  /**
   * Percentage of the operation's completeness.
   */
  percentComplete?: number;
}