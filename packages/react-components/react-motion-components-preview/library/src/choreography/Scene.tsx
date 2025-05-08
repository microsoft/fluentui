import * as React from 'react';

export const Scene: React.FC<{
  duration: number;
  onMotionFinish?: () => void;
}> = ({ duration, children, onMotionFinish = () => null }) => {
  setTimeout(() => {
    onMotionFinish();
  }, duration);

  return <>{children}</>;
};
