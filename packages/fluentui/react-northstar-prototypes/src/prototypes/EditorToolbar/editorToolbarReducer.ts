export enum FontFormatting {
  Paragraph = 'Paragraph',
  Heading1 = 'Heading 1',
  Heading2 = 'Heading 2',
  Heading3 = 'Heading 3',
}

export type EditorToolbarState = {
  bold: boolean;
  italic: boolean;
  underline: boolean;
  //
  fontHighlight: boolean;
  fontColor: boolean;
  fontSize: boolean;
  fontFormatting: FontFormatting;
  fontFormattingOpen: boolean;
  //
  itemList: boolean;
  numberList: boolean;
  //
  quote: boolean;
  link: boolean;
  code: boolean;
  table: boolean;
  //
  important: boolean;
  //
  more: boolean;
};

export type EditorToolbarAction =
  | { type: 'BOLD'; value: boolean }
  | { type: 'ITALIC'; value: boolean }
  | { type: 'UNDERLINE'; value: boolean }
  //
  | { type: 'FONT_FORMATTING'; value: FontFormatting }
  | { type: 'FONT_FORMATTING_OPEN'; value: boolean }
  //
  | { type: 'LINK'; value: boolean }
  | { type: 'TABLE'; value: boolean }
  //
  | { type: 'MORE'; value: boolean };

export const initialState: EditorToolbarState = {
  bold: false,
  italic: false,
  underline: false,
  //
  fontHighlight: false,
  fontColor: false,
  fontSize: false,
  fontFormatting: FontFormatting.Paragraph,
  fontFormattingOpen: false,
  //
  itemList: false,
  numberList: false,
  //
  quote: false,
  link: false,
  code: false,
  table: false,
  //
  important: false,
  //
  more: false,
};

export function editorToolbarReducer(state: EditorToolbarState, action: EditorToolbarAction): EditorToolbarState {
  switch (action.type) {
    case 'BOLD':
      return { ...state, bold: action.value };
    case 'ITALIC':
      return { ...state, italic: action.value };
    case 'UNDERLINE':
      return { ...state, underline: action.value };
    //
    case 'FONT_FORMATTING':
      return { ...state, fontFormatting: action.value };
    case 'FONT_FORMATTING_OPEN':
      return { ...state, fontFormattingOpen: action.value };
    //
    case 'LINK':
      return { ...state, link: action.value };
    case 'TABLE':
      return { ...state, table: action.value };
    //
    case 'MORE':
      return { ...state, more: action.value };
  }

  return state;
}
