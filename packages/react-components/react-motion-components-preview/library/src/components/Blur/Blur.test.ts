import type { AtomMotion } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import type { BlurParams } from './blur-types';
import { Blur } from './Blur';

function getMotionFunction(component: object, symbolName: string): Function {
  const symbol = Object.getOwnPropertySymbols(component).find(
    candidate => candidate.toString() === `Symbol(${symbolName})`,
  );

  expect(symbol).toBeDefined();
  return (component as Record<symbol, Function>)[symbol!];
}

const element = document.createElement('div');

type BlurMotion = { enter: AtomMotion[]; exit: AtomMotion[] };
type BlurMotionParams = BlurParams & { element: HTMLElement };

const getBlurPresenceFn = (): ((params: BlurMotionParams) => BlurMotion) => {
  const presenceFn = getMotionFunction(Blur, 'PRESENCE_MOTION_DEFINITION');
  return params => presenceFn(params) as BlurMotion;
};

const getBlurMotionFn = (component: object): ((params: BlurMotionParams) => AtomMotion[]) => {
  const motionFn = getMotionFunction(component, 'MOTION_DEFINITION');
  return params => motionFn(params) as AtomMotion[];
};

describe('Blur', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Blur);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Blur);
  });

  it('projects from to rest on enter and rest to to on exit', () => {
    const presenceFn = getBlurPresenceFn();
    const motion = presenceFn({
      element,
      fromRadius: '12px',
      restRadius: '2px',
      toRadius: '20px',
      animateOpacity: false,
    });

    expect(motion.enter[0].keyframes).toEqual([{ filter: 'blur(12px)' }, { filter: 'blur(2px)' }]);
    expect(motion.exit[0].keyframes).toEqual([{ filter: 'blur(2px)' }, { filter: 'blur(20px)' }]);
  });

  it('defaults the exit destination to the entry origin', () => {
    const presenceFn = getBlurPresenceFn();
    const motion = presenceFn({ element, fromRadius: '7px', restRadius: '1px', animateOpacity: false });

    expect(motion.exit[0].keyframes).toEqual([{ filter: 'blur(1px)' }, { filter: 'blur(7px)' }]);
  });

  it('keeps factory-generated In and Out projections on the same parameter record', () => {
    const inFn = getBlurMotionFn(Blur.In);
    const outFn = getBlurMotionFn(Blur.Out);
    const params = { element, fromRadius: '9px', restRadius: '3px', toRadius: '15px', animateOpacity: false };

    expect(inFn(params)[0].keyframes).toEqual([{ filter: 'blur(9px)' }, { filter: 'blur(3px)' }]);
    expect(outFn(params)[0].keyframes).toEqual([{ filter: 'blur(3px)' }, { filter: 'blur(15px)' }]);
  });

  it('preserves timing defaults and explicit exit timing', () => {
    const presenceFn = getBlurPresenceFn();
    const defaults = presenceFn({ element, duration: 450, delay: 30, animateOpacity: false });
    const explicit = presenceFn({
      element,
      duration: 450,
      delay: 30,
      exitDuration: 175,
      exitDelay: 15,
      exitEasing: motionTokens.curveEasyEase,
      animateOpacity: false,
    });

    expect(defaults.exit[0]).toMatchObject({
      duration: 450,
      delay: 30,
      easing: motionTokens.curveAccelerateMin,
    });
    expect(explicit.exit[0]).toMatchObject({
      duration: 175,
      delay: 15,
      easing: motionTokens.curveEasyEase,
    });
  });

  it('preserves optional opacity composition for both edges', () => {
    const presenceFn = getBlurPresenceFn();
    const withOpacity = presenceFn({ element });
    const withoutOpacity = presenceFn({ element, animateOpacity: false });

    expect(withOpacity.enter).toHaveLength(2);
    expect(withOpacity.exit).toHaveLength(2);
    expect(withOpacity.enter[1].keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
    expect(withOpacity.exit[1].keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
    expect(withoutOpacity.enter).toHaveLength(1);
    expect(withoutOpacity.exit).toHaveLength(1);
  });
});
