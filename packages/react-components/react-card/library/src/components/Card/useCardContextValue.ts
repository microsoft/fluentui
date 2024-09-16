import type { CardContextValue, CardState } from './Card.types';

export function useCardContextValue({ selectableA11yProps }: CardState): CardContextValue {
  return { selectableA11yProps };
}
