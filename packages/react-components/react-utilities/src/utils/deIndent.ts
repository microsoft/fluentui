/**
 * Removes the common leading indentation from a template literal.
 */
export function deIndent(strings: TemplateStringsArray, ...values: unknown[]): string {
  // Try to detect the indentation used in the first content line. This needs to work even if that line starts
  // with an interpolation (so the first `strings[i]` segment may contain no non-whitespace characters).
  let indentation = '';
  for (let i = 0; i < strings.length; i++) {
    indentation = strings[i].match(/\n([ \t]*)\S/)?.[1] ?? '';
    if (indentation) {
      break;
    }

    // If the segment ends right after a newline+whitespace, the next token might be an interpolation.
    if (i < strings.length - 1) {
      indentation = strings[i].match(/\n([ \t]*)$/)?.[1] ?? '';
      if (indentation) {
        break;
      }
    }
  }

  return strings.reduce((result, segment, index) => {
    let normalized = index === 0 ? segment.replace(/^\n/, '') : segment;
    normalized = index === 0 && normalized.startsWith(indentation) ? normalized.slice(indentation.length) : normalized;
    normalized = normalized.split(`\n${indentation}`).join('\n');
    normalized = index === strings.length - 1 ? normalized.replace(/\n\s*$/, '') : normalized;

    return result + normalized + (index < values.length ? String(values[index]) : '');
  }, '');
}
