import { IS_FOCUSABLE_ATTRIBUTE } from './attributes';
import { FocusZoneDefinition } from './focusZone/types';

export type AriaWidgetRole =
  | 'button'
  | 'checkbox'
  | 'dialog'
  | 'gridcell'
  | 'link'
  | 'log'
  | 'marquee'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'option'
  | 'progressbar'
  | 'radio'
  | 'scrollbar'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'tab'
  | 'tabpanel'
  | 'textbox'
  | 'timer'
  | 'tooltip'
  | 'treeitem'
  | 'switch'
  | 'none';

export type AriaCompositeRole =
  | 'cell'
  | 'combobox'
  | 'grid'
  | 'row'
  | 'gridcell'
  | 'rowheader'
  | 'rowgroup'
  | 'columnheader'
  | 'listbox'
  | 'option'
  | 'menu'
  | 'menubar'
  | 'radiogroup'
  | 'radio'
  | 'table'
  | 'tablist'
  | 'tab'
  | 'tabpanel'
  | 'tree'
  | 'treegrid';

export type AriaDocumentStructureRole =
  | 'article'
  | 'definition'
  | 'directory'
  | 'document'
  | 'group'
  | 'heading'
  | 'img'
  | 'list'
  | 'listitem'
  | 'math'
  | 'note'
  | 'presentation'
  | 'region'
  | 'separator'
  | 'toolbar';

export type AriaLandmarkRole =
  | 'application'
  | 'banner'
  | 'complementary'
  | 'contentinfo'
  | 'form'
  | 'main'
  | 'navigation'
  | 'search';

export type AriaLiveRegionRole = 'alert' | 'log' | 'marquee' | 'status' | 'timer';

export type AriaRole =
  | AriaWidgetRole
  | AriaCompositeRole
  | AriaDocumentStructureRole
  | AriaLandmarkRole
  | AriaLiveRegionRole;

export interface AriaWidgetAttributes {
  role?: string;
  'aria-autocomplete'?: 'none' | 'inline' | 'list' | 'both';
  'aria-checked'?: boolean | 'false' | 'mixed' | 'true';
  'aria-current'?: boolean | 'false' | 'true' | 'page' | 'step' | 'location' | 'date' | 'time';
  'aria-disabled'?: boolean | 'false' | 'true';
  'aria-expanded'?: boolean | 'false' | 'true';
  'aria-haspopup'?: boolean | 'false' | 'true' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  'aria-hidden'?: boolean | 'false' | 'true';
  'aria-invalid'?: boolean | 'false' | 'true' | 'grammar' | 'spelling';
  'aria-label'?: string;
  'aria-level'?: number;
  'aria-live'?: 'polite' | 'off' | 'assertive';
  'aria-modal'?: boolean;
  'aria-multiline'?: boolean | 'false' | 'true';
  'aria-multiselectable'?: boolean | 'false' | 'true';
  'aria-orientation'?: 'horizontal' | 'vertical';
  'aria-pressed'?: boolean | 'false' | 'mixed' | 'true';
  'aria-readonly'?: boolean | 'false' | 'true';
  'aria-required'?: boolean | 'false' | 'true';
  'aria-selected'?: boolean | 'false' | 'true';
  'aria-sort'?: 'none' | 'ascending' | 'descending' | 'other';
  'aria-valuemax'?: number;
  'aria-valuemin'?: number;
  'aria-valuenow'?: number;
  'aria-valuetext'?: string;
}

export interface AriaRelationshipAttributes {
  'aria-activedescendant'?: string;
  'aria-colcount'?: number;
  'aria-colindex'?: number;
  'aria-colspan'?: number;
  'aria-controls'?: string;
  'aria-describedby'?: string;
  'aria-details'?: string;
  'aria-errormessage'?: string;
  'aria-flowto'?: string;
  'aria-labelledby'?: string;
  'aria-owns'?: string;
  'aria-posinset'?: number;
  'aria-rowcount'?: number;
  'aria-rowindex'?: number;
  'aria-rowspan'?: number;
}

export interface ElementStateAttributes {
  disabled?: boolean;
  checked?: boolean;
}

export interface AccessibilityAttributes
  extends AriaWidgetAttributes,
    AriaRelationshipAttributes,
    ElementStateAttributes {
  // Is used in @fluentui/ability-attributes for accessibility validations.
  // Do not set it manually and do not rely on it in production
  'data-aa-class'?: string;

  role?: AriaRole;
  tabIndex?: number;
  id?: string;
  [IS_FOCUSABLE_ATTRIBUTE]?: boolean;
}

export type AccessibilityAttributesBySlot = { [partName: string]: AccessibilityAttributes };

export type KeyActions = { [partName: string]: { [actionName: string]: KeyAction } };

export interface AccessibilityDefinition {
  attributes?: AccessibilityAttributesBySlot;
  keyActions?: KeyActions;
  focusZone?: FocusZoneDefinition;
  childBehaviors?: { [childBehaviorSlot: string]: Accessibility };
}

export interface KeyAction {
  keyCombinations: KeyCombinations[];
}

export interface KeyCombinations {
  keyCode: number;
  shiftKey?: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
}

export type Accessibility<P = any> = [P] extends [never]
  ? () => AccessibilityDefinition
  : (props: P) => AccessibilityDefinition;
