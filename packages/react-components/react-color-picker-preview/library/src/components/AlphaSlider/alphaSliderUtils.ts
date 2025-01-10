export function adjustToTransparency(value: number, transparency?: boolean) {
  return transparency ? 100 - value : value;
}

export function calculateTransparencyValue(value?: number, transparency?: boolean) {
  return value !== undefined ? adjustToTransparency(value * 100, transparency) : undefined;
}

export function getSliderDirection(dir: 'ltr' | 'rtl', vertical?: boolean, transparency?: boolean) {
  if (vertical) {
    return transparency ? '180deg' : '0deg';
  } else {
    return dir === 'ltr' && !transparency ? '90deg' : '-90deg';
  }
}
