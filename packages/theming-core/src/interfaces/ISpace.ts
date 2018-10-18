/**
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface ISpace {
  margin?: number | string;
  padding?: number | string;
  // TODO: there is likely much more to be filled in
}

/**
 * I know one might ponder how the amazing name of this interface was arrived at, but
 * shockingly enough it was simply pure laziness.  (Just putting some stuff in here
 * until it can be appropriately organized)
 *
 * @internal This is an experimental interface and will be changed post design review.
 */
export interface IOtherProps {
  className?: string;
  iconWeight?: number;
  borderRadius?: number | string;
  borderWidth?: number | string;
  contentPadding?: number | string;
  width?: number | string;
  height?: number | string;
  iconSize?: number | string;
  lineHeight?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  display?: string;
  justifyContent?: string;
  boxSizing?: string;
  borderStyle?: string;
  userSelect?: string;
  textDecoration?: string;
  textAlign?: string;
  verticalAlign?: string;
  overflow?: string;
  fill?: string;
}
