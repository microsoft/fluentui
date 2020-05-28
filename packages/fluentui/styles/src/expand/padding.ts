type PaddingValue = string;
type PaddingResult = Record<'paddingLeft' | 'paddingRight' | 'paddingBottom' | 'paddingTop', string>;

export function padding(value: PaddingValue): PaddingResult {
  return {
    paddingLeft: value,
    paddingRight: value,
    paddingBottom: value,
    paddingTop: value,
  };
}
