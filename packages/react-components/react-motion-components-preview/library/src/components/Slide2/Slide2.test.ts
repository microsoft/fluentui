import { getMotionFunction, getPresenceMotionFunction } from '../../testing/testUtils';
import { Slide2 } from './Slide2';

describe('Slide2', () => {
  it('maps presence from, rest, and to states to directed slide endpoints', () => {
    const slide2PresenceFn = getPresenceMotionFunction(Slide2);

    const motion = slide2PresenceFn?.({
      element: document.createElement('div'),
      animateOpacity: false,
      fromX: '-20px',
      fromY: '10px',
      restX: '5px',
      restY: '0px',
      toX: '30px',
      toY: '15px',
    });

    expect(motion).toMatchObject({
      enter: [
        {
          keyframes: [{ translate: '-20px 10px' }, { translate: '5px 0px' }],
          fill: 'both',
        },
      ],
      exit: [
        {
          keyframes: [{ translate: '5px 0px' }, { translate: '30px 15px' }],
          fill: 'both',
        },
      ],
    });
  });

  it('defaults the presence exit destination to its entrance origin', () => {
    const slide2PresenceFn = getPresenceMotionFunction(Slide2);

    const motion = slide2PresenceFn?.({
      element: document.createElement('div'),
      animateOpacity: false,
      fromY: '-20px',
    });

    expect(motion).toMatchObject({
      enter: [{ keyframes: [{ translate: '0px -20px' }, { translate: '0px 0px' }] }],
      exit: [{ keyframes: [{ translate: '0px 0px' }, { translate: '0px -20px' }] }],
    });
  });

  it('maps Slide2.In from its origin to its resting position', () => {
    const slide2InMotionFn = getMotionFunction(Slide2.In);

    const atoms = slide2InMotionFn?.({
      element: document.createElement('div'),
      animateOpacity: false,
      fromY: '-20px',
      restY: '5px',
    });

    expect(atoms).toEqual([
      expect.objectContaining({ keyframes: [{ translate: '0px -20px' }, { translate: '0px 5px' }] }),
    ]);
  });

  it('maps Slide2.Out from its resting position to its destination', () => {
    const slide2OutMotionFn = getMotionFunction(Slide2.Out);

    const atoms = slide2OutMotionFn?.({
      element: document.createElement('div'),
      animateOpacity: false,
      restY: '5px',
      toY: '20px',
    });

    expect(atoms).toEqual([
      expect.objectContaining({ keyframes: [{ translate: '0px 5px' }, { translate: '0px 20px' }] }),
    ]);
  });

  it('composes directed opacity atoms for entering and exiting', () => {
    const slide2InMotionFn = getMotionFunction(Slide2.In);
    const slide2OutMotionFn = getMotionFunction(Slide2.Out);
    const element = document.createElement('div');

    expect(slide2InMotionFn?.({ element })).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyframes: [{ opacity: 0 }, { opacity: 1 }],
          fill: 'both',
        }),
      ]),
    );
    expect(slide2OutMotionFn?.({ element })).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          keyframes: [{ opacity: 1 }, { opacity: 0 }],
          fill: 'both',
        }),
      ]),
    );
  });
});
