import * as React from 'react';

const systemColors = [
  'CanvasText',
  'Canvas',
  'LinkText',
  'GrayText',
  'HighlightText',
  'Highlight',
  'ButtonText',
  'ButtonFace',
] as const;

export const HighContrastColors = () => {
  return (
    <div style={{ display: 'flex', gap: 5 }}>
      {systemColors.map(color => (
        <Box color={color} key={color} />
      ))}
    </div>
  );
};

const Box: React.FC<{ color: string }> = ({ color }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <div
        style={{
          backgroundColor: color,
          width: 100,
          aspectRatio: '1',
          padding: 5,
          border: '1px dashed black',
        }}
      />

      <label>{color}</label>
    </div>
  );
};
