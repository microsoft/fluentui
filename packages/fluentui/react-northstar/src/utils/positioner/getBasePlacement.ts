import type { BasePlacement as PopperJsBasePlacement, Placement as PopperJsPlacement } from '@popperjs/core';

const rtlMapping: Partial<Record<PopperJsBasePlacement, PopperJsBasePlacement>> = {
  left: 'right',
  right: 'left',
};

export function getBasePlacement(placement: PopperJsPlacement | undefined, rtl: boolean): PopperJsBasePlacement {
  const basePlacement = (placement || '').split('-', 1).pop() as PopperJsBasePlacement;

  return (rtl && rtlMapping[basePlacement]) || basePlacement;
}
