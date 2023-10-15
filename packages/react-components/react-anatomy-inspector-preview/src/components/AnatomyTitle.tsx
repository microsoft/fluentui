import * as React from 'react';
import { tokens } from '@fluentui/react-theme';

import { AnatomyTitleProps } from './ShowAnatomy.types';

export const AnatomyTitle = ({
  componentName = '',
  isComponentInDOM = true,
  slotName = '',
  isSelected,
  label,
  labelSize,
  setSelectedComponentName,
}: AnatomyTitleProps) => {
  return (
    <div
      key={`${componentName}__${slotName}`}
      style={{
        padding: `${tokens.spacingVerticalXXS} ${
          slotName ? tokens.spacingVerticalXXL : tokens.spacingHorizontalSNudge
        }`,
        marginTop: slotName ? 0 : tokens.spacingVerticalM,
        backgroundColor: isSelected ? tokens.colorNeutralBackground1Hover : 'transparent',
        ...((!isComponentInDOM && {
          color: tokens.colorNeutralForegroundDisabled,
          cursor: 'not-allowed',
        }) || {
          cursor: 'pointer',
        }),
      }}
      {...(isComponentInDOM && {
        onMouseEnter: () => setSelectedComponentName(componentName || slotName),
        onMouseLeave: () => setSelectedComponentName(''),
      })}
    >
      {/*
                  TODO: It would be helpful to hide the content of the selected anatomy annotation
                        so that it is clear that only the containing area is the anatomy and not the content inside.

                        Something like this, but in the global scope:
                          .${cssSelector} * { visibility: hidden !important; }
                  */}
      <span
        style={{
          display: 'inline-block',
          width: `${labelSize}px`,
          height: `${labelSize}px`,
          fontSize: `${Math.round(labelSize * 0.75)}px`,
          fontWeight: 'bold',
          lineHeight: `${labelSize}px`,
          textAlign: 'center',
          borderRadius: '999px',
          ...((!isComponentInDOM && {
            background: tokens.colorNeutralBackgroundDisabled,
          }) || {
            color: 'black',
            background: slotName ? `rgb(192, 192, 255)` : `rgb(255, 192, 224)`,
          }),
        }}
      >
        {label}
      </span>
      &nbsp;
      {slotName || componentName}
    </div>
  );
};
