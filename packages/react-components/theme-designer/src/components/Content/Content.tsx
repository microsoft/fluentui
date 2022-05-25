import * as React from 'react';

export interface ContentProps {
  className?: String;
}

export const Content: React.FC<ContentProps> = props => {
  return <div>Content</div>;
};
