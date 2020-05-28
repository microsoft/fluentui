type MarginValue = string;
type MarginResult = Record<'marginLeft' | 'marginRight' | 'marginBottom' | 'marginTop', string>;

export function margin(value: MarginValue): MarginResult {
  return {
    marginLeft: value,
    marginRight: value,
    marginBottom: value,
    marginTop: value,
  };
}
