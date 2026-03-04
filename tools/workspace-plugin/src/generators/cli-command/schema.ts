export interface CliCommandGeneratorSchema {
  /**
   * Command name (e.g. 'migrate', 'report')
   */
  name: string;
  /**
   * Short description of the command shown in --help
   * @default 'TODO: Add description'
   */
  description?: string;
  /**
   * @default false
   */
  skipFormat?: boolean;
}
