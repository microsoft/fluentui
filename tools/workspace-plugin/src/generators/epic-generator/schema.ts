export interface EpicGenerator {
  /**
   * Repository to create issues at.
   */
  repository: string;
  /**
   * Title used in the creation of the epic
   */
  title: string;
}
