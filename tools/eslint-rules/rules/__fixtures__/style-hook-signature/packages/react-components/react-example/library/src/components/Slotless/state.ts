export type SlotlessState =
  | { children: { type: string }; ref: () => void }
  | { children: null; ref: () => void; empty: true };
