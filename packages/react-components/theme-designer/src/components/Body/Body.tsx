import * as React from 'react';

export interface ComponentProps {
  className?: String;
}

export const Body: React.FC<ComponentProps> = props => {
  return <div>Body</div>;
};
