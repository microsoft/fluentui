import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { figma } from '@figma/code-connect';

/**
 * Figma Code Connect configuration for Button component
 * This connects the Figma Button component to the React implementation
 */
figma.connect(
  Button,
  'https://www.figma.com/design/Z9KRuq4Dca3xEuC0BAt0YY/Design-Systems-Connect--Demo-?node-id=10-1271&m=dev', // Replace with actual Figma file URL
  {
    props: {
      // Map Figma properties to React props
      children: figma.textContent('Button Text'),
      appearance: figma.enum('Appearance', {
        Secondary: 'secondary', // Default
        Primary: 'primary',
        Outline: 'outline',
        Subtle: 'subtle',
        Transparent: 'transparent',
      }),
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium', // Default
        Large: 'large',
      }),
      shape: figma.enum('Shape', {
        Rounded: 'rounded', // Default
        Circular: 'circular',
        Square: 'square',
      }),
      disabled: figma.boolean('Disabled'),
      disabledFocusable: figma.boolean('Disabled Focusable'),
      // Icon mapping - assuming there's an icon variant
      icon: figma.instance('Icon'),
      iconPosition: figma.enum('Icon Position', {
        Before: 'before', // Default
        After: 'after',
      }),
    },
    example: ({
      children,
      appearance,
      size,
      shape,
      disabled,
      disabledFocusable,
      icon,
      iconPosition,
    }: {
      children: any;
      appearance: any;
      size: any;
      shape: any;
      disabled: any;
      disabledFocusable: any;
      icon: any;
      iconPosition: any;
    }) => (
      <Button
        appearance={appearance}
        size={size}
        shape={shape}
        disabled={disabled}
        disabledFocusable={disabledFocusable}
        icon={icon}
        iconPosition={iconPosition}
      >
        {children}
      </Button>
    ),
  },
);
