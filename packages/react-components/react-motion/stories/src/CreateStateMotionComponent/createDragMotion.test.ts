import {
  applyDragPresentation,
  createDragPresentation,
  createDropAnimation,
  dropScaleEasing,
  releaseDragPresentation,
} from './createDragMotion';

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

  it('keeps pointer translation and rotation above the pickup animation until release', () => {
    const priorities = new Map<string, string>();
    const style = {
      translate: '',
      rotate: '',
      boxShadow: '',
      setProperty(property: string, value: string | null, priority = '') {
        if (property === 'translate' || property === 'rotate' || property === 'boxShadow') {
          this[property] = value ?? '';
        }
        priorities.set(property, priority);
      },
      getPropertyPriority: (property: string) => priorities.get(property) ?? '',
    };

    applyDragPresentation(style, {
      offsetX: 240,
      offsetY: 120,
      rotation: 6,
      boxShadow: 'lifted-shadow',
    });

    expect(style.getPropertyPriority('translate')).toBe('important');
    expect(style.getPropertyPriority('rotate')).toBe('important');

    releaseDragPresentation(style);

    expect(style.translate).toBe('240px 120px');
    expect(style.rotate).toBe('6deg');
    expect(style.getPropertyPriority('translate')).toBe('');
    expect(style.getPropertyPriority('rotate')).toBe('');
  });
});

describe('createDropAnimation', () => {
  it('aligns position without overshoot before Back-easing the scale into rest', () => {
    expect(dropScaleEasing).toBe('cubic-bezier(.33, 2.632, .67, 1)');

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
          easing: dropScaleEasing,
        },
        { state: 'target' },
      ],
      duration: 200,
      easing: 'linear',
    });
  });
});
