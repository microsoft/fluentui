import * as PopperJs from '@popperjs/core';

const rtlMapping: Partial<Record<PopperJs.BasePlacement, PopperJs.BasePlacement>> = {
  left: 'right',
  right: 'left',
};

export function getBasePlacement(placement: PopperJs.Placement | undefined, rtl: boolean): PopperJs.BasePlacement {
  const basePlacement = (placement || '').split('-', 1).pop() as PopperJs.BasePlacement;

  return (rtl && rtlMapping[basePlacement]) || basePlacement;
}
