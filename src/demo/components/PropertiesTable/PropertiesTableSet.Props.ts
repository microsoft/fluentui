
export interface IPropertiesTableSetProps {
  /**
   * Component name, assumes component resides in /components/[name]/ folder
   * and properties are at /components/[name]/[name].Props.ts.
   */
  componentName: string;

  /**
   * If specified, will only render interfaces and enums specified here.
   */
  renderOnly?: Array<string>;
}
