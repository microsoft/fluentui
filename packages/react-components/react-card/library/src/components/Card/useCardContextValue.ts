import type { CardContextValue, CardState } from './Card.types';

export function useCardContextValue({ selectableA11yProps, orientation, size }: CardState): CardContextValue {
  return { selectableA11yProps, orientation, size };
}
