import * as React from 'react';

/**
 * Specifies the behaviour of child motion component under @see MotionBehaviourProvider.
 */
export type MotionBehaviourType = 'skip' | 'default';

const MotionBehaviourContext = React.createContext<MotionBehaviourType | undefined>(undefined);

interface MotionBehaviourProviderProps {
  value?: MotionBehaviourType;
  children: React.ReactNode;
}

export const MotionBehaviourProvider: React.FC<MotionBehaviourProviderProps> = ({ value, children }) => {
  const parentValue = React.useContext(MotionBehaviourContext);
  const currentValue = value ?? parentValue ?? 'default';

  return <MotionBehaviourContext.Provider value={currentValue}>{children}</MotionBehaviourContext.Provider>;
};

export const useMotionBehaviourContext = () => React.useContext(MotionBehaviourContext) ?? 'default';
