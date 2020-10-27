export interface UseComponentStyles<P> {
  props: P;
  displayName?: string;
  rtl: boolean;
  overrides?: {
    stylingTokens?: object;
    className?: string;
  };
}
