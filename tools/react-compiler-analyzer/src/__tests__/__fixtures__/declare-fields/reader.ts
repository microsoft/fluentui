declare const store: { getState(): { value: string } };

export class LegacyModel {
  declare context: unknown;
}

export function readValue(): string {
  const snapshot = <{ value: string }>store.getState();
  return snapshot.value;
}
