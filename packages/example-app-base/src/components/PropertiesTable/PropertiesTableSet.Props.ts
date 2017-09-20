import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';

export interface IPropertiesTableSetProps extends IBaseProps {
  /**
   * Component name, assumes component resides in /components/[name]/ folder
   * and properties are at /components/[name]/[name].Props.ts.
   */
  componentName?: string;

  /**
   * If provided, overrides componentName usage to derive the path to the props.
   * Example: 'utilities/focus/'
   */
  componentPath?: string;

  /**
   * If specified, will only render interfaces and enums specified here.
   */
  renderOnly?: Array<string>;

  /**
   * A set of pre-resolved source code.
   */
  sources?: string[];
}
