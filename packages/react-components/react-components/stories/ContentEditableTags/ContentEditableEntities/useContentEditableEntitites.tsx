import * as React from 'react';

export const useContentEditableEntitites = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  return { ref };
};
