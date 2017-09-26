import { IBaseProps } from 'office-ui-fabric-react/lib/Utilities';
import { IProperty } from '../../utilities/parser/index';

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

  /**
   * A set of pre-resolved json docs.
   */
  json?: IProperty[];
}
