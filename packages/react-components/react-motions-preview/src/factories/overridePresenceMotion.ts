import { PresenceMotion, PresenceMotionFn } from '../types';
// import * as React from 'react';
// import { PresenceComponentProps } from './createPresenceComponent';
import { PresenceOverride } from '../types';

// TODO: replace override with mergePresenceMotion and move to own file
/*
export const createPresenceVariantComponent = <PresenceComponent extends React.FC<PresenceComponentProps>>({
  component,
  override,
}: {
  component: PresenceComponent;
  override: PresenceOverride;
}) => {
  return (props: React.ComponentProps<PresenceComponent>) => component({ ...props, override });
};
*/

export const overridePresenceMotion = (
  motion: PresenceMotion | PresenceMotionFn,
  override: PresenceOverride,
): PresenceMotionFn => {
  return (...args) => {
    const presenceMotion = typeof motion === 'function' ? motion(...args) : motion;
    const { enter, exit } = presenceMotion;

    return {
      enter: { ...enter, ...override.all, ...override.enter },
      exit: { ...exit, ...override.all, ...override.exit },
    };
  };
};
