import * as React from 'react';

export interface ComponentProps {
  className?: String;
}

export const Sidebar: React.FC<ComponentProps> = props => {
  return <div>Sidebar</div>;
};
