/** GuideExamples also exports metadata, but only ComponentPage renders its own page header. */
export function hasComponentPage(metadata: unknown): boolean {
  return (
    Array.isArray(metadata) && metadata.some(item => item !== null && typeof item === 'object' && 'stories' in item)
  );
}
