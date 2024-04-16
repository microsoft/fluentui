export function normalizeOpenItems(
  openSubtrees?: string | string[],
  options?: {
    keepUndefined?: false;
  },
): string[];

export function normalizeOpenItems(
  openSubtrees?: string | string[],
  options?: {
    keepUndefined: true;
  },
): string[] | undefined;

export function normalizeOpenItems(
  openSubtrees?: string | string[],
  options?: {
    keepUndefined?: boolean;
  },
): string[] | undefined {
  if (!openSubtrees) {
    return options?.keepUndefined ? undefined : [];
  }
  return Array.isArray(openSubtrees) ? openSubtrees : [openSubtrees];
}
