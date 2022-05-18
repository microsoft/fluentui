export interface EpicGenerator {
  /**
   * Repository to create issues at.
   */
  repository?: string;
  /**
   * Title used in the creation of the epic
   */
  title: string;
  /**
   * Message used in the body of the epic
   * Should only be skipped in favour or manually adding the message.
   */
  message?: string;
}
