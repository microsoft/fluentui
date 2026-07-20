import { createDragPresentation, createDropAnimation } from './createDragMotion';

describe('createDragPresentation', () => {
  it('keeps the lifted shadow on the same translated presentation as the card', () => {
    expect(
      createDragPresentation({
        offsetX: 240,
        offsetY: 120,
        rotation: 6,
        boxShadow: 'lifted-shadow',
      }),
    ).toEqual({
      translate: '240px 120px',
      rotate: '6deg',
      boxShadow: 'lifted-shadow',
    });
  });
});

describe('createDropAnimation', () => {
  it('sequences one complete visual snapshot into the resting state', () => {
    expect(
      createDropAnimation(
        {
          transform: 'matrix(1.04, 0, 0, 1.04, 0, -16)',
          translate: '240px 120px',
          rotate: '6deg',
          boxShadow: 'lifted-shadow',
        },
        {
          destinationTransform: 'translateX(240px) translateY(120px) rotate(-1deg) scale(1.04)',
          liftedShadow: 'lifted-shadow',
          duration: 200,
          settleOffset: 0.6,
          settleEasing: 'settle-easing',
          dropEasing: 'drop-easing',
        },
      ),
    ).toEqual({
      keyframes: [
        {
          transform: 'matrix(1.04, 0, 0, 1.04, 0, -16)',
          translate: '240px 120px',
          rotate: '6deg',
          boxShadow: 'lifted-shadow',
          easing: 'settle-easing',
        },
        {
          transform: 'translateX(240px) translateY(120px) rotate(-1deg) scale(1.04)',
          translate: '0px 0px',
          rotate: '0deg',
          boxShadow: 'lifted-shadow',
          offset: 0.6,
          easing: 'drop-easing',
        },
        { state: 'target' },
      ],
      duration: 200,
      easing: 'linear',
    });
  });
});
