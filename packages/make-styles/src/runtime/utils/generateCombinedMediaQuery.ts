export function generateCombinedQuery(currentMediaQuery: string, nestedMediaQuery: string): string {
  if (currentMediaQuery.length === 0) {
    return nestedMediaQuery;
  }

  return `${currentMediaQuery} and ${nestedMediaQuery}`;
}
