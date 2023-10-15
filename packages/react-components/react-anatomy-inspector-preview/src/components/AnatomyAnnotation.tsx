import * as React from 'react';
import { tokens } from '@fluentui/react-theme';

import { AnatomyAnnotationProps } from './ShowAnatomy.types';

export const AnatomyAnnotation: React.FunctionComponent<AnatomyAnnotationProps> = ({
  componentName,
  slotName,
  position,
  label,
  labelTop,
  labelLeft,
  isSelected,
  isMuted,
  ...rest
}) => {
  const labelSize = 14;

  const offsetY = -window.scrollY + window.scrollY;
  const offsetX = -window.scrollX + window.scrollX;

  return (
    <div
      style={{
        transition: `box-shadow ${tokens.durationFast} ${tokens.curveEasyEase}, background-color ${tokens.durationFast} ${tokens.curveEasyEase}`,
        position: 'fixed',
        pointerEvents: 'none',
        zIndex: '2147483647', // max int32
        top: position.y + offsetY,
        left: position.x + offsetX,
        width: position.width - 2,
        height: position.height - 2,
        ...(label && {
          boxShadow: slotName
            ? `inset 0 0 0 ${isMuted ? 0 : '1px'} rgba(0, 0, 255, ${isSelected ? 0.5 : 0.3})`
            : `0 0 0 ${isMuted ? 0 : '1px'} rgba(255, 0, 128, ${isSelected ? 0.5 : 0.3})`,
        }),
        ...(isSelected && {
          background: slotName ? `rgba(192, 192, 255, 0.8)` : 'rgba(255, 128, 192, 0.8)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }),
      }}
      {...rest}
    >
      {label && (
        <span
          style={{
            transition: `opacity ${tokens.durationFast} ${tokens.curveEasyEase}`,
            display: 'block',
            zIndex: '99999',
            verticalAlign: 'middle',
            ...(slotName
              ? {
                  position: 'absolute',
                  // bottom: `-${labelSize / 2}px`,
                  right: `-${labelSize / 2}px`,
                }
              : {
                  position: 'fixed',
                  top: `${labelTop + offsetY}px`,
                  left: `${labelLeft + offsetX}px`,
                  bottom: 0,
                  margin: `-${labelSize / 2}px 0 0 -${labelSize / 2}px`,
                }),
            width: `${labelSize}px`,
            height: `${labelSize}px`,
            textAlign: 'center',
            lineHeight: `${labelSize}px`,
            fontSize: `12px`,
            fontWeight: 'bold',
            borderRadius: '100%',
            background: slotName ? `rgb(192, 192, 255)` : `rgb(255, 192, 224)`,
            opacity: isMuted ? 0 : 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
