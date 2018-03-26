export function kebabRules(
  rulePairs: (string | number)[],
  index: number
): void {
  rulePairs[index] = (rulePairs[index] as string).replace(/([A-Z])/g, '-$1').toLowerCase();
}