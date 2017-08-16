let PX_BASED_PROPERTIES: string[] = [
  'borderRadius',
  'borderWidth',
  'bottom',
  'left',
  'right',
  'top',
];

[
  'border',
  'margin',
  'padding'
].forEach((prop: string) => {
  PX_BASED_PROPERTIES.push(
    prop,
    prop + 'Left',
    prop + 'Right',
    prop + 'Top',
    prop + 'Bottom'
  );
});

export function provideUnits(rulePairs: (string | number)[]): void {
  for (let i = 0; i < rulePairs.length; i += 2) {
    let value = rulePairs[i + 1];
    if (typeof value === 'number' && PX_BASED_PROPERTIES.indexOf(rulePairs[i] as string) >= 0) {
      rulePairs[i + 1] = `${value}px`;
    }
  }
}
