import { useState } from 'react';

export class LegacyModel {
  declare context: unknown;
}

const initialLabel = <string>'';

export function useLabel() {
  const [label] = useState(initialLabel);
  return { label };
}
