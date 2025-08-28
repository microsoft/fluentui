import * as React from 'react';

/**
 * Specifies the behaviour of child motion component under @see MotionBehaviourProvider.
 */
export type MotionBehaviourType = 'skip' | 'default';

const MotionBehaviourContext = React.createContext<MotionBehaviourType | undefined>(undefined);

export const MotionBehaviourProvider = MotionBehaviourContext.Provider;
export const useMotionBehaviourContext = (): MotionBehaviourType =>
  React.useContext(MotionBehaviourContext) ?? 'default';
