import type { SourceFile, Node } from 'ts-morph';
import { SyntaxKind } from 'ts-morph';
import type { AnnotationResult } from '../types';
import { isJsxChild } from './utils';

/** 1→1 renames that are safe to apply automatically. */
const AUTO_RENAMES: Record<string, string> = {
  Separator: 'Divider',
  Toggle: 'Switch',
  Shimmer: 'Skeleton',
  Fabric: 'FluentProvider',
  ThemeProvider: 'FluentProvider',
  Layer: 'Portal',
  Overlay: 'Portal',
  ProgressIndicator: 'ProgressBar',
  SwatchColorPicker: 'SwatchPicker',
  CommandButton: 'MenuButton',
  ChoiceGroup: 'RadioGroup',
  TeachingBubble: 'TeachingPopover',
  Coachmark: 'TeachingPopover',
  Facepile: 'AvatarGroup',
};

/** 1→many — the agent must decide based on context. */
const MANUAL_RENAMES: Record<string, { choices: string; ref: string }> = {
  GroupedList: {
    choices: 'Tree (expand/collapse), DataGrid (tabular), List (flat)',
    ref: 'references/tree.md',
  },
  DetailsList: {
    choices: 'DataGrid (selection/sort), Table (read-only)',
    ref: 'references/datagrid.md',
  },
  TextField: {
    choices: 'Input (single-line), Textarea (multiline)',
    ref: 'references/input.md',
  },
  Popup: {
    choices: 'Popover (non-modal overlay), Dialog (modal/blocking)',
    ref: '',
  },
  FocusTrapZone: {
    choices: 'Dialog (modal), Popover (trapFocus), or @fluentui/react-tabster (useFocusFinders) for custom traps',
    ref: '',
  },
  FocusZone: {
    choices:
      'components with built-in arrow navigation (TabList, Menu, etc.) or @fluentui/react-tabster (useMergedTabsterAttributes_unstable)',
    ref: '',
  },
};

/** 1→1 rename but inner API changed significantly — agent must consult the reference before rewriting. */
const STRUCTURAL_RENAMES: Record<string, { target: string; note: string; ref: string }> = {
  Panel: {
    target: 'OverlayDrawer',
    note: 'restructure with DrawerHeader + DrawerBody; PanelType → position+size',
    ref: 'references/drawer.md',
  },
  Callout: {
    target: 'Popover',
    note: 'composable trigger/surface; target ref → PopoverTrigger; directionalHint → positioning',
    ref: 'references/callout.md',
  },
  ContextualMenu: {
    target: 'Menu',
    note: 'items array → declarative JSX children',
    ref: 'references/menu.md',
  },
  CommandBar: {
    target: 'Toolbar',
    note: 'items array → ToolbarButton JSX children; overflow via Overflow+OverflowItem',
    ref: 'references/toolbar.md',
  },
  CommandBarButton: {
    target: 'ToolbarButton',
    note: 'becomes JSX child of Toolbar',
    ref: 'references/toolbar.md',
  },
  Pivot: {
    target: 'TabList',
    note: 'content panels move outside TabList; PivotItem → Tab',
    ref: 'references/tabs.md',
  },
  PivotItem: {
    target: 'Tab',
    note: 'content panel moves outside TabList',
    ref: 'references/tabs.md',
  },
  OverflowSet: {
    target: 'Overflow',
    note: 'hook-based; onRenderItem → OverflowItem; useOverflowMenu',
    ref: 'references/overflow.md',
  },
  PeoplePicker: {
    target: 'TagPicker',
    note: 'onResolveSuggestions → filter TagPickerOption children; composable structure',
    ref: 'references/tagpicker.md',
  },
  ComboBox: {
    target: 'Combobox',
    note: 'casing change; options array → Option children; onOptionSelect replaces onChange',
    ref: 'references/dropdown.md',
  },
  Modal: {
    target: 'Dialog',
    note: 'isOpen → open; isBlocking → modalType="alert"; wrap children in DialogSurface+DialogBody — see references/dialog.md',
    ref: 'references/dialog.md',
  },
};

/** Same name in v9 but API changed significantly — agent must rewrite usage. */
const API_REWRITES: Record<string, { note: string; ref: string }> = {
  Dropdown: {
    note: 'options array → Option children; onOptionSelect replaces onChange',
    ref: 'references/dropdown.md',
  },
  Breadcrumb: {
    note: 'items array → BreadcrumbItem/BreadcrumbButton/BreadcrumbLink children; overflow via Overflow',
    ref: 'references/breadcrumb.md',
  },
  Nav: {
    note: 'groups array → NavItem/NavCategory JSX children; NavDrawer for side panels',
    ref: 'references/nav.md',
  },
  List: {
    note: 'items+onRenderCell → ListItem children; selectionMode+navigationMode added',
    ref: 'references/list.md',
  },
  Checkbox: {
    note: 'indeterminate prop → checked="mixed"; CheckboxShim available for incremental migration',
    ref: 'references/checkbox.md',
  },
  Tooltip: {
    note: 'relationship prop now required; directionalHint → positioning; trigger must use forwardRef',
    ref: 'references/tooltip.md',
  },
  MessageBar: {
    note: 'messageBarType → intent string; composable children (MessageBarBody, MessageBarActions, MessageBarTitle)',
    ref: 'references/messagebar.md',
  },
  Spinner: {
    note: 'SpinnerSize enum → string size; labelPosition renamed; label prop removed — wrap with Field',
    ref: 'references/spinner.md',
  },
  Text: {
    note: 'variant → size+weight; nowrap → wrap={false}; use presets (Body1, Title2, etc.)',
    ref: 'references/text.md',
  },
  Link: {
    note: 'inline prop for prose context; appearance="subtle"; disabledFocusable replaces disabled',
    ref: 'references/link.md',
  },
  SearchBox: {
    note: 'onSearch → onKeyDown; onClear → onChange with empty string; underlined → appearance="underline"',
    ref: 'references/searchbox.md',
  },
  Image: {
    note: 'imageFit → fit; shouldFadeIn removed; no wrapper div',
    ref: 'references/image.md',
  },
  Persona: {
    note: 'slot-based; imageUrl/imageInitials/presence → avatar slot; PersonaPresence enum → string status',
    ref: 'references/persona.md',
  },
  Rating: {
    note: 'rating → value; readOnly → use RatingDisplay instead; icon string → iconFilled/iconOutline component',
    ref: 'references/rating.md',
  },
  Slider: {
    note: 'label prop removed — wrap with Field; onChange signature changed',
    ref: 'references/slider.md',
  },
  SpinButton: {
    note: 'label prop removed — wrap with Field; onChange signature changed',
    ref: 'references/spinbutton.md',
  },
};

export function detectComponentRenames(sourceFile: SourceFile, fluentNames: Set<string>): AnnotationResult[] {
  const results: AnnotationResult[] = [];

  sourceFile.forEachDescendant((node: Node) => {
    if (node.getKind() !== SyntaxKind.JsxOpeningElement && node.getKind() !== SyntaxKind.JsxSelfClosingElement) {
      return;
    }

    const tagName = node.getFirstChildByKind(SyntaxKind.Identifier)?.getText() ?? '';
    if (!fluentNames.has(tagName)) {
      return;
    }

    const insideJsx = isJsxChild(node);
    const line = node.getStartLineNumber();

    if (AUTO_RENAMES[tagName]) {
      results.push({
        action: 'auto',
        codemod: 'component-rename',
        payload: `${tagName} → ${AUTO_RENAMES[tagName]}`,
        line,
        insideJsx,
      });
    } else if (MANUAL_RENAMES[tagName]) {
      const { choices, ref } = MANUAL_RENAMES[tagName];
      results.push({
        action: 'manual',
        codemod: 'component-rename',
        payload: `${tagName} → ?`,
        note: `choices: ${choices}${ref ? ` — see ${ref}` : ''}`,
        line,
        insideJsx,
      });
    } else if (STRUCTURAL_RENAMES[tagName]) {
      const { target, note, ref } = STRUCTURAL_RENAMES[tagName];
      results.push({
        action: 'manual',
        codemod: 'component-rename',
        payload: `${tagName} → ${target}`,
        note: `${note} — see ${ref}`,
        line,
        insideJsx,
      });
    } else if (API_REWRITES[tagName]) {
      const { note, ref } = API_REWRITES[tagName];
      results.push({
        action: 'manual',
        codemod: 'component-rename',
        payload: `${tagName} (API rewrite)`,
        note: `${note} — see ${ref}`,
        line,
        insideJsx,
      });
    }
  });

  return results;
}
