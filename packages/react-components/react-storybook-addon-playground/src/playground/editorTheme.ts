import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

import type { ThemeOption } from './themes';

type Monaco = typeof monacoApi;

// Monaco only accepts hex colors; Fluent themes use hex for these tokens but some tokens are keywords ('transparent')
const HEX_COLOR = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;

/**
 * Defines (or redefines) a Monaco theme whose chrome colors come from the given Fluent theme so the editor blends in
 * with the rest of the playground. Syntax colors are inherited from Monaco's `vs` / `vs-dark` themes.
 *
 * @returns the Monaco theme name to pass to `editor.setTheme()`.
 */
export function defineEditorTheme(monaco: Monaco, option: ThemeOption): string {
  const { theme } = option;
  const name = `fluent-${option.id}`;

  const colors: Record<string, string> = {
    'editor.background': theme.colorNeutralBackground1,
    'editor.foreground': theme.colorNeutralForeground1,
    'editorGutter.background': theme.colorNeutralBackground1,
    'editorLineNumber.foreground': theme.colorNeutralForeground4,
    'editorLineNumber.activeForeground': theme.colorNeutralForeground2,
    'editor.lineHighlightBackground': theme.colorNeutralBackground1Hover,
    'editor.lineHighlightBorder': theme.colorNeutralBackground1Hover,
    'editorIndentGuide.background': theme.colorNeutralStroke3,
    'editorIndentGuide.activeBackground': theme.colorNeutralStroke1,
    'editorWidget.background': theme.colorNeutralBackground1,
    'editorWidget.border': theme.colorNeutralStroke1,
    'editorSuggestWidget.background': theme.colorNeutralBackground1,
    'editorSuggestWidget.border': theme.colorNeutralStroke1,
    'editorSuggestWidget.selectedBackground': theme.colorNeutralBackground1Selected,
    'editorHoverWidget.background': theme.colorNeutralBackground1,
    'editorHoverWidget.border': theme.colorNeutralStroke1,
    'scrollbarSlider.background': theme.colorNeutralStroke1,
    'scrollbarSlider.hoverBackground': theme.colorNeutralStroke1Hover,
    'scrollbarSlider.activeBackground': theme.colorNeutralStroke1Pressed,
    focusBorder: theme.colorStrokeFocus2,
  };

  monaco.editor.defineTheme(name, {
    base: option.dark ? 'vs-dark' : 'vs',
    inherit: true,
    rules: [],
    colors: Object.fromEntries(Object.entries(colors).filter(([, value]) => HEX_COLOR.test(value))),
  });

  return name;
}
