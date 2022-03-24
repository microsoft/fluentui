export interface EpicGeneratorSchema {
  /**
   * Repository to create issues at.
   */
  repository: string;

  /**
   * Title of the main issue/epic
   */
  title: string;

  /**
   * Message of the main issue/epic.
   * Should only be skipped in favour or manually adding the message.
   */
  message?: string;
}
