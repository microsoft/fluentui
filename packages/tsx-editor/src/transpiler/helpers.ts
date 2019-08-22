/** Partial ts.Diagnostic @internal */
export interface IDiagnostic {
  category: number;
  code: number;
  start?: number;
  length?: number;
  messageText: string | { messageText: string; code: number };
}

export function _getErrorMessages(errors: IDiagnostic[], text: string) {
  const lineStarts = _getLineStarts(text);
  return errors.map(error => {
    if (error.messageText && typeof error.messageText === 'object') {
      // This is a multi-line ts.DiagnosticMessageChain (not sure if this happens, but handling per typings)
      error.code = error.messageText.code;
      error.messageText = error.messageText.messageText;
    }

    if (typeof error.start === 'number') {
      const lineInfo = _getErrorLineInfo(error, lineStarts);
      return `Line ${lineInfo.line} - ${error.messageText} (TS${error.code})`;
    } else {
      return error.messageText;
    }
  });
}

export function _getLineStarts(text: string): number[] {
  const lineStarts: number[] = [0];
  const eol = /\r?\n/g;
  let match: RegExpExecArray | null;
  while ((match = eol.exec(text))) {
    lineStarts.push(match.index + match[0].length);
  }
  return lineStarts;
}

export function _getErrorLineInfo(error: IDiagnostic, lineStarts: number[]): { line: number; col: number } {
  let line = 1;
  for (; line < lineStarts.length; line++) {
    if (lineStarts[line] > error.start!) {
      break;
    }
  }
  return { line, col: error.start! - lineStarts[line - 1] + 1 };
}
