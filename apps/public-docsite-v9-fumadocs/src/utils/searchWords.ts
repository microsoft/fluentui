export function searchWords(text: string): string[] {
  return text.toLocaleLowerCase('en').match(/[\p{L}\p{N}]+/gu) ?? [];
}
