import { memoizeFunction } from '@fluentui/react/lib/Utilities';
import type { IBasicPackageGroup } from '../interfaces/index';

// Don't reference anything importing Monaco in this file!

// Helper methods for transpile(). They're in a separate file that doesn't import Monaco so they
// can be tested with Jest (which doesn't like Monaco's ES modules).

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

/** Convert from IPackageGroup[] to a map from package name to global name. @internal */
export const _supportedPackageToGlobalMap = memoizeFunction((supportedPackages: IBasicPackageGroup[]) => {
  const packagesToGlobals: { [packageName: string]: string } = {};
  for (const group of supportedPackages) {
    for (const pkg of group.packages) {
      packagesToGlobals[pkg.packageName] = group.globalName;
    }
  }
  return packagesToGlobals;
});
