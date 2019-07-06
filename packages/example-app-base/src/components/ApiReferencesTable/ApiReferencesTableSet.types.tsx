import { PropertyType } from '../../utilities/parser/index';
import { IPageJson, ILinkToken } from 'office-ui-fabric-react/lib/common/DocPage.types';

/**
 * Props for the ApiReferencesTableSet
 */
export interface IApiReferencesTableSetProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * A json object to populate the table
   */
  jsonDocs?: IPageJson;

  /**
   * If true (the default), listen for hash changes and if the hash includes an API element
   * rendered by this component, jump to it (expanding the "see more" section if needed).
   * If false, the component will still listen to hash changes and expand the "see more"
   * section if needed, but it won't jump.
   * @defaultvalue true
   */
  jumpToAnchors?: boolean;
}

/**
 * Generic api property
 */
export interface IApiProperty {
  propertyName: string;
  extendsTokens?: ILinkToken[];
  description?: string;
  title: string;
  propertyType: PropertyType;
  property: IApiInterfaceProperty[] | IApiEnumProperty[];
  methods?: IMethod[];
}

/**
 * Interface property
 */
export interface IApiInterfaceProperty {
  name: string;
  typeTokens: ILinkToken[];
  defaultValue: string;
  description: string;
  deprecatedMessage?: string;
  deprecated?: boolean;
}

/**
 * Enum property
 */
export interface IApiEnumProperty {
  name: string;
  description: string;
  value: string;
}

/**
 * Class method
 */
export interface IMethod {
  name: string;
  // signature
  typeTokens: ILinkToken[];
  description: string;
}
