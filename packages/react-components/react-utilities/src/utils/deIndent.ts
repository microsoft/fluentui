/**
 * Removes the common leading indentation from a template literal.
 */
export function deIndent(strings: TemplateStringsArray, ...values: unknown[]): string {
  const indentation = strings[0].match(/\n([ \t]*)\S/)?.[1] ?? '';

  return strings.reduce((result, segment, index) => {
    let normalized = index === 0 ? segment.replace(/^\n/, '') : segment;
    normalized = index === 0 && normalized.startsWith(indentation) ? normalized.slice(indentation.length) : normalized;
    normalized = normalized.split(`\n${indentation}`).join('\n');
    normalized = index === strings.length - 1 ? normalized.replace(/\n\s*$/, '') : normalized;

    return result + normalized + (index < values.length ? String(values[index]) : '');
  }, '');
}
