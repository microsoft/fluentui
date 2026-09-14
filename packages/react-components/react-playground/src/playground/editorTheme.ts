import type * as monacoApi from 'monaco-editor/esm/vs/editor/editor.api';

import type { ThemeOption } from './themes';

type Monaco = typeof monacoApi;

export const EDITOR_FONT_FAMILY =
  '"Cascadia Code", "JetBrains Mono", "Fira Code", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

// Monaco only accepts hex colors; Fluent themes use hex for these tokens but some tokens are keywords ('transparent')
const HEX_COLOR = /^#[0-9a-f]{6}([0-9a-f]{2})?$/i;

interface SyntaxPalette {
  foreground: string;
  comment: string;
  keyword: string;
  stringLiteral: string;
  numberLiteral: string;
  type: string;
  identifier: string;
  delimiter: string;
  regexp: string;
  selection: string;
  lineHighlight: string;
  cursor: string;
  bracket1: string;
  bracket2: string;
  bracket3: string;
}

// Curated palettes (GitHub-inspired) that read well on the Fluent light / dark surfaces
const LIGHT_PALETTE: SyntaxPalette = {
  foreground: '#1f2328',
  comment: '#6e7781',
  keyword: '#cf222e',
  stringLiteral: '#0a3069',
  numberLiteral: '#0550ae',
  type: '#953800',
  identifier: '#1f2328',
  delimiter: '#57606a',
  regexp: '#116329',
  selection: '#b6d6ff80',
  lineHighlight: '#f6f8fa',
  cursor: '#2f80ed',
  bracket1: '#0550ae',
  bracket2: '#8250df',
  bracket3: '#116329',
};

const DARK_PALETTE: SyntaxPalette = {
  foreground: '#e6edf3',
  comment: '#8b949e',
  keyword: '#ff7b72',
  stringLiteral: '#a5d6ff',
  numberLiteral: '#79c0ff',
  type: '#ffa657',
  identifier: '#e6edf3',
  delimiter: '#8b949e',
  regexp: '#7ee787',
  selection: '#3b82f660',
  lineHighlight: '#ffffff0a',
  cursor: '#7ab2ff',
  bracket1: '#79c0ff',
  bracket2: '#d2a8ff',
  bracket3: '#7ee787',
};

/**
 * Defines (or redefines) a Monaco theme for the given Fluent theme: the editor chrome uses the Fluent surface colors so
 * it blends in with the pane it lives in, syntax highlighting uses a curated palette per color scheme.
 *
 * @returns the Monaco theme name to pass to `editor.setTheme()`.
 */
export function defineEditorTheme(monaco: Monaco, option: ThemeOption): string {
  const { theme, dark } = option;
  const palette = dark ? DARK_PALETTE : LIGHT_PALETTE;
  const name = `fluent-${option.id}`;

  const colors: Record<string, string> = {
    'editor.background': theme.colorNeutralBackground1,
    'editor.foreground': palette.foreground,
    'editorGutter.background': theme.colorNeutralBackground1,
    'editorLineNumber.foreground': theme.colorNeutralForeground4,
    'editorLineNumber.activeForeground': theme.colorNeutralForeground2,
    'editor.lineHighlightBackground': palette.lineHighlight,
    'editor.lineHighlightBorder': palette.lineHighlight,
    'editor.selectionBackground': palette.selection,
    'editor.inactiveSelectionBackground': palette.selection,
    'editorCursor.foreground': palette.cursor,
    'editorIndentGuide.background': theme.colorNeutralStroke3,
    'editorIndentGuide.activeBackground': theme.colorNeutralStroke1,
    'editorBracketHighlight.foreground1': palette.bracket1,
    'editorBracketHighlight.foreground2': palette.bracket2,
    'editorBracketHighlight.foreground3': palette.bracket3,
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

  const rules: monacoApi.editor.ITokenThemeRule[] = [
    { token: '', foreground: palette.foreground.slice(1) },
    { token: 'comment', foreground: palette.comment.slice(1), fontStyle: 'italic' },
    { token: 'keyword', foreground: palette.keyword.slice(1) },
    { token: 'string', foreground: palette.stringLiteral.slice(1) },
    { token: 'number', foreground: palette.numberLiteral.slice(1) },
    { token: 'regexp', foreground: palette.regexp.slice(1) },
    { token: 'type.identifier', foreground: palette.type.slice(1) },
    { token: 'identifier', foreground: palette.identifier.slice(1) },
    { token: 'delimiter', foreground: palette.delimiter.slice(1) },
  ];

  monaco.editor.defineTheme(name, {
    base: dark ? 'vs-dark' : 'vs',
    inherit: true,
    rules,
    colors: Object.fromEntries(Object.entries(colors).filter(([, value]) => HEX_COLOR.test(value))),
  });

  return name;
}
