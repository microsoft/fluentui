import type { AtomMotion, AtomMotionFn, PresenceMotion, PresenceMotionFn } from '@fluentui/react-motion';
import { motionTokens } from '@fluentui/react-motion';
import { expectPresenceMotionFunction, expectPresenceMotionArray } from '../../testing/testUtils';
import type { RotateParams } from './rotate-types';
import { Rotate } from './Rotate';

const element = document.createElement('div');

function getDefinition<T>(component: object, description: string): T {
  const symbol = Object.getOwnPropertySymbols(component).find(candidate => candidate.description === description);

  if (!symbol) {
    throw new Error(`Expected ${description} on component`);
  }

  return (component as Record<symbol, T>)[symbol];
}

function getPresence(params: RotateParams = {}): PresenceMotion {
  const definition = getDefinition<PresenceMotionFn<RotateParams>>(Rotate, 'PRESENCE_MOTION_DEFINITION');
  return definition({ element, ...params });
}

function getProjection(component: object, params: RotateParams = {}): AtomMotion[] {
  const definition = getDefinition<AtomMotionFn<RotateParams>>(component, 'MOTION_DEFINITION');
  const motion = definition({ element, ...params });
  return Array.isArray(motion) ? motion : [motion];
}

describe('Rotate', () => {
  it('stores its motion definition as a static function', () => {
    expectPresenceMotionFunction(Rotate);
  });

  it('generates a motion definition from the static function', () => {
    expectPresenceMotionArray(Rotate);
  });

  it('projects from to rest on enter and rest to to on exit', () => {
    const presence = getPresence({ fromAngle: -45, restAngle: 15, toAngle: 120, animateOpacity: false });

    expect((presence.enter as AtomMotion[])[0].keyframes).toEqual([{ rotate: 'z -45deg' }, { rotate: 'z 15deg' }]);
    expect((presence.exit as AtomMotion[])[0].keyframes).toEqual([{ rotate: 'z 15deg' }, { rotate: 'z 120deg' }]);
  });

  it('defaults the exit destination to the entry origin', () => {
    const presence = getPresence({ fromAngle: 35, restAngle: 5, animateOpacity: false });

    expect((presence.exit as AtomMotion[])[0].keyframes).toEqual([{ rotate: 'z 5deg' }, { rotate: 'z 35deg' }]);
    expect(getProjection(Rotate.Out, { fromAngle: 35, restAngle: 5, animateOpacity: false })[0].keyframes).toEqual([
      { rotate: 'z 5deg' },
      { rotate: 'z 35deg' },
    ]);
  });

  it('keeps factory-generated In and Out projections on the shared RotateParams record', () => {
    const params: RotateParams = {
      fromAngle: -30,
      restAngle: 10,
      toAngle: 80,
      axis: 'x',
      animateOpacity: false,
    };

    expect(getProjection(Rotate.In, params)[0].keyframes).toEqual([{ rotate: 'x -30deg' }, { rotate: 'x 10deg' }]);
    expect(getProjection(Rotate.Out, params)[0].keyframes).toEqual([{ rotate: 'x 10deg' }, { rotate: 'x 80deg' }]);
  });

  it('applies entry and exit timing to the corresponding projections', () => {
    const params: RotateParams = {
      duration: 150,
      easing: motionTokens.curveEasyEase,
      delay: 25,
      exitDuration: 275,
      exitEasing: motionTokens.curveAccelerateMid,
      exitDelay: 40,
      animateOpacity: false,
    };

    expect(getProjection(Rotate.In, params)[0]).toMatchObject({ duration: 150, easing: params.easing, delay: 25 });
    expect(getProjection(Rotate.Out, params)[0]).toMatchObject({
      duration: 275,
      easing: params.exitEasing,
      delay: 40,
    });
  });

  it('uses entry duration and delay as exit timing fallbacks', () => {
    expect(getProjection(Rotate.Out, { duration: 180, delay: 30, animateOpacity: false })[0]).toMatchObject({
      duration: 180,
      easing: motionTokens.curveAccelerateMax,
      delay: 30,
    });
  });

  it('preserves opacity composition and supports disabling it', () => {
    expect(getProjection(Rotate.In)[1].keyframes).toEqual([{ opacity: 0 }, { opacity: 1 }]);
    expect(getProjection(Rotate.Out)[1].keyframes).toEqual([{ opacity: 1 }, { opacity: 0 }]);
    expect(getProjection(Rotate.In, { animateOpacity: false })).toHaveLength(1);
    expect(getProjection(Rotate.Out, { animateOpacity: false })).toHaveLength(1);
  });
});
