export type SizeValue = 'smallest' | 'smaller' | 'small' | 'medium' | 'large' | 'larger' | 'largest';

export type ComponentClasses<TClasses, TState> = Partial<TClasses> | ((state: TState) => Partial<TClasses>);

export interface ComponentProps {
  // Removing these props:
  // design - use style or className instead

  as?: React.ElementType;

  className?: string;
}

export type ShorthandValue<TProps> = string | boolean | number | null | undefined | TProps | JSX.Element;
