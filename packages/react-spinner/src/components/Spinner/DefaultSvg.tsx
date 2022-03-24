import * as React from 'react';
import { SpinnerProps } from './Spinner.types';

export const DefaultSvg: React.FC<SpinnerProps> = props => {
  const { size } = props;
  // Stroke widths for the Spinner
  let spinnerStrokeWidth = 3;
  switch (size) {
    case 'tiny':
    case 'extra-small':
    case 'small':
      spinnerStrokeWidth = 2;
      break;
    case 'huge':
      spinnerStrokeWidth = 4;
  }
  let dynamicSize = 32;
  switch (size) {
    case 'tiny':
      dynamicSize = 20;
      break;
    case 'extra-small':
      dynamicSize = 24;
      break;
    case 'small':
      dynamicSize = 28;
      break;
    case 'large':
      dynamicSize = 36;
      break;
    case 'extra-large':
      dynamicSize = 40;
      break;
    case 'huge':
      dynamicSize = 44;
  }
  return (
    <>
      <svg role="progressbar" style={{ height: size, width: size }}>
        <circle
          className={}
          cx="50%"
          cy="50%"
          strokeWidth={spinnerStrokeWidth}
          // the radius is calculated automatically with this function
          r={(dynamicSize - spinnerStrokeWidth) / 2}
          fill="none"
        />
        <circle
          className={}
          cx="50%"
          cy="50%"
          // the radius is calculated automatically with this function
          r={(dynamicSize - spinnerStrokeWidth) / 2}
          fill="none"
          strokeWidth={spinnerStrokeWidth}
        />
      </svg>
    </>
  );
};
