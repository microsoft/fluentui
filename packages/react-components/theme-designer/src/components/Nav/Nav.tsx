import * as React from 'react';

export interface ComponentProps {
  className?: String;
}

export const Nav: React.FC<ComponentProps> = props => {
  return <div>Nav</div>;
};
