import Popper from 'popper.js';

const rtlMapping: Partial<Record<Popper.Position, Popper.Position>> = {
  left: 'right',
  right: 'left',
};

function getBasePlacement(placement: Popper.Placement | undefined, rtl: boolean): Popper.Position {
  const basePlacement = (placement || '').split('-', 1).pop() as Popper.Position;

  return (rtl && rtlMapping[basePlacement]) || basePlacement;
}

export default getBasePlacement;
