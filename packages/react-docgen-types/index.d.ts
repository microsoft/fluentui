import { Annotation as DocBlock, Tag as DocTag } from 'doctrine';

export { DocBlock, DocTag };

export interface ComponentFileInfo {
  /** Name (no path) of the component file, with extension, e.g. `Popup.tsx` */
  filename: string;
  /** Name (no path) of the component file, without extension, e.g. `Popup` */
  filenameWithoutExt: string;
  /** Path within the repo, e.g. `packages/react/src/components/Popup/Popup.tsx` */
  repoPath: string;
}

export interface ComponentInfo extends ComponentFileInfo {
  /** Main component name, e.g. `Popup` or `ToolbarItem` */
  displayName: string;
  /** Doc comment */
  docblock: DocBlock;
  /** Component props list */
  props: ComponentProp[];
}

export interface ComponentProp {
  defaultValue: any; // tslint:disable-line:no-any
  description: string;
  name: string;
  /** Function parameters */
  tags: DocTag[];
  /** Related type info and/or generic parameters? */
  types: ComponentPropType[];
  /** Required or optional */
  required: boolean;
}

export interface ComponentPropType {
  /** Type name */
  name?: 'any' | 'boolean' | 'never' | 'string' | 'array' | 'literal' | string;
  /** True if the name is a built-in keyword (e.g. `any`, `boolean`, `never`, `string`) */
  keyword?: boolean;
  /** Related type info and/or generic parameters? (including array item type) */
  parameters?: ComponentPropType[];
  /** Text of the type if it's a function, object, or literal */
  value?: string;
}

/**
 * Accessibility behavior info as included in `FluentComponentInfo`.
 * (The `behaviorInfo.json` file, used to generate the Accessibility page, uses `FluentBehaviorInfo` instead.)
 */
export interface FluentBehavior {
  /** Behavior code name, e.g. `tabListBehavior` */
  name: string;
  /** Behavior display name, e.g. `TabList` */
  displayName: string;
  /** Behavior category, e.g. `Tab` */
  category: string;
}

export interface FluentApiPathInfo {
  /** Name or dotted name of component, e.g. `Toolbar` or `Toolbar.Item` */
  apiPath: string;
  /** Whether this is a subcomponent (not a top-level component) */
  isChild: boolean;
  /** Whether this is a top-level component (not a subcomponent) */
  isParent: boolean;
  /** If a subcomponent, name of the parent, e.g. `Toolbar` for `ToolbarItem` */
  parentDisplayName?: string;
  /** If a subcomponent, dotted part of the API name, e.g. `Item` for `ToolbarItem` */
  subcomponentName?: string;
}

export interface FluentComponentInfo extends ComponentInfo, FluentApiPathInfo {
  /** Root CSS class, e.g. `ui-popup` */
  componentClassName: string;
  /**
   * If this component implements the `create` shorthand, name of the first prop passed when
   * calling `create`, e.g. `content`
   */
  mappedShorthandProp?: string;
  /** Shared accessibility behaviors used */
  behaviors?: FluentBehavior[];
  /** List of children (which also have an info.json each) */
  subcomponents?: string[];
  /** Type of this component/file.  */
  type: string;
}

/**
 * Accessibility behavior variation.
 */
export interface FluentBehaviorVariation {
  name: string;
  description: string;
  specification: string;
}

/**
 * Accessibility behavior info as written to `behaviorInfo.json` and used to generate the Accessibility page.
 * (`FluentComponentInfo` uses `FluentBehavior` instead.)
 */
export interface FluentBehaviorInfo {
  displayName: string;
  variations: FluentBehaviorVariation[];
}
