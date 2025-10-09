import * as React from 'react';

const iframeStyle: React.CSSProperties = {
  width: '100%',
  border: 'none',
};

/**
 * Story component to render stories in an iframe.
 * Provides a similar experience to Storybook's v7 `Story` component.
 */
export const FluentStory = ({ id, height }: { id: string; height?: string | number }) => {
  return (
    <div className="sb-story sb-unstyled">
      <iframe title={id} src={`/iframe.html?id=${id}&mode=story`} style={iframeStyle} height={height} />
    </div>
  );
};
