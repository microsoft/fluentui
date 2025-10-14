import * as React from 'react';
import { Card, CardHeader, CardFooter, CardPreview, Body1, Caption1, Text } from '@fluentui/react-components';
import { figma } from '@figma/code-connect';

/**
 * Figma Code Connect configuration for Card component
 * This connects the Figma Card component to the React implementation
 */
figma.connect(
  Card,
  'https://www.figma.com/design/Z9KRuq4Dca3xEuC0BAt0YY/Design-Systems-Connect--Demo-?node-id=15-2069&m=dev', // Replace with actual Figma file URL
  {
    props: {
      // Map Figma properties to React props
      appearance: figma.enum('Appearance', {
        Filled: 'filled', // Default
        'Filled Alternative': 'filled-alternative',
        Outline: 'outline',
        Subtle: 'subtle',
      }),
      focusMode: figma.enum('Focus Mode', {
        Off: 'off', // Default
        'No Tab': 'no-tab',
        'Tab Exit': 'tab-exit',
        'Tab Only': 'tab-only',
      }),
      orientation: figma.enum('Orientation', {
        Vertical: 'vertical', // Default
        Horizontal: 'horizontal',
      }),
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium', // Default
        Large: 'large',
      }),
      selected: figma.boolean('Selected'),
      disabled: figma.boolean('Disabled'),
      children: figma.children(['CardHeader', 'CardPreview', 'CardFooter']),
    },
    example: ({
      appearance,
      focusMode,
      orientation,
      size,
      selected,
      disabled,
      children,
    }: {
      appearance: any;
      focusMode: any;
      orientation: any;
      size: any;
      selected: any;
      disabled: any;
      children: any;
    }) => (
      <Card
        appearance={appearance}
        focusMode={focusMode}
        orientation={orientation}
        size={size}
        selected={selected}
        disabled={disabled}
      >
        {children}
      </Card>
    ),
  },
);

/**
 * Figma Code Connect configuration for CardHeader component
 */
figma.connect(
  CardHeader,
  'https://www.figma.com/design/yourfile/card-header-node', // Replace with actual Figma file URL
  {
    props: {
      image: figma.instance('Image'),
      header: figma.textContent('Header Text'),
      description: figma.textContent('Description Text'),
      action: figma.instance('Action'),
    },
    example: ({ image, header, description, action }: { image: any; header: any; description: any; action: any }) => (
      <CardHeader
        image={image}
        header={
          <Body1>
            <b>{header}</b>
          </Body1>
        }
        description={<Caption1>{description}</Caption1>}
        action={action}
      />
    ),
  },
);

/**
 * Figma Code Connect configuration for CardPreview component
 */
figma.connect(
  CardPreview,
  'https://www.figma.com/design/yourfile/card-preview-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.instance('Preview Content'),
      logo: figma.instance('Logo'),
    },
    example: ({ children, logo }: { children: any; logo: any }) => <CardPreview logo={logo}>{children}</CardPreview>,
  },
);

/**
 * Figma Code Connect configuration for CardFooter component
 */
figma.connect(
  CardFooter,
  'https://www.figma.com/design/yourfile/card-footer-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.children('Button'),
      action: figma.instance('Action'),
    },
    example: ({ children, action }: { children: any; action: any }) => (
      <CardFooter action={action}>{children}</CardFooter>
    ),
  },
);

/**
 * Complete Card example with all subcomponents
 */
figma.connect(
  Card,
  'https://www.figma.com/design/yourfile/complete-card-node', // Replace with actual Figma file URL for complete card
  {
    props: {
      appearance: figma.enum('Appearance', {
        Filled: 'filled',
        'Filled Alternative': 'filled-alternative',
        Outline: 'outline',
        Subtle: 'subtle',
      }),
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
      }),
      orientation: figma.enum('Orientation', {
        Vertical: 'vertical',
        Horizontal: 'horizontal',
      }),
      // Header content
      headerImage: figma.instance('Header Image'),
      headerText: figma.textContent('Header Text'),
      headerDescription: figma.textContent('Header Description'),
      headerAction: figma.instance('Header Action'),
      // Preview content
      previewContent: figma.instance('Preview Content'),
      previewLogo: figma.instance('Preview Logo'),
      // Footer content
      footerActions: figma.children('Footer Action'),
      selected: figma.boolean('Selected'),
      disabled: figma.boolean('Disabled'),
    },
    example: ({
      appearance,
      size,
      orientation,
      headerImage,
      headerText,
      headerDescription,
      headerAction,
      previewContent,
      previewLogo,
      footerActions,
      selected,
      disabled,
    }: {
      appearance: any;
      size: any;
      orientation: any;
      headerImage: any;
      headerText: any;
      headerDescription: any;
      headerAction: any;
      previewContent: any;
      previewLogo: any;
      footerActions: any;
      selected: any;
      disabled: any;
    }) => (
      <Card appearance={appearance} size={size} orientation={orientation} selected={selected} disabled={disabled}>
        <CardHeader
          image={headerImage}
          header={
            <Body1>
              <b>{headerText}</b>
            </Body1>
          }
          description={<Caption1>{headerDescription}</Caption1>}
          action={headerAction}
        />
        <CardPreview logo={previewLogo}>{previewContent}</CardPreview>
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    ),
  },
);

/**
 * Selectable Card - specific configuration for interactive/selectable cards
 */
figma.connect(
  Card,
  'https://www.figma.com/design/yourfile/selectable-card-node', // Replace with actual Figma file URL for selectable card
  {
    props: {
      appearance: figma.enum('Appearance', {
        Filled: 'filled',
        'Filled Alternative': 'filled-alternative',
        Outline: 'outline',
        Subtle: 'subtle',
      }),
      headerText: figma.textContent('Header Text'),
      headerDescription: figma.textContent('Header Description'),
      headerAction: figma.instance('Header Action'),
      previewContent: figma.instance('Preview Content'),
      previewLogo: figma.instance('Preview Logo'),
      selected: figma.boolean('Selected'),
    },
    example: ({
      appearance,
      headerText,
      headerDescription,
      headerAction,
      previewContent,
      previewLogo,
      selected,
    }: {
      appearance: any;
      headerText: any;
      headerDescription: any;
      headerAction: any;
      previewContent: any;
      previewLogo: any;
      selected: any;
    }) => (
      <Card
        appearance={appearance}
        selected={selected}
        onSelectionChange={(_, { selected: newSelected }) => {
          // Handle selection change
          console.log('Card selected:', newSelected);
        }}
      >
        <CardPreview logo={previewLogo}>{previewContent}</CardPreview>
        <CardHeader
          header={<Text weight="semibold">{headerText}</Text>}
          description={<Caption1>{headerDescription}</Caption1>}
          action={headerAction}
        />
      </Card>
    ),
  },
);

/**
 * Horizontal Card - specific configuration for horizontal orientation
 */
figma.connect(
  Card,
  'https://www.figma.com/design/yourfile/horizontal-card-node', // Replace with actual Figma file URL for horizontal card
  {
    props: {
      appearance: figma.enum('Appearance', {
        Filled: 'filled',
        'Filled Alternative': 'filled-alternative',
        Outline: 'outline',
        Subtle: 'subtle',
      }),
      size: figma.enum('Size', {
        Small: 'small',
        Medium: 'medium',
        Large: 'large',
      }),
      headerText: figma.textContent('Header Text'),
      headerDescription: figma.textContent('Header Description'),
      previewContent: figma.instance('Preview Content'),
      footerActions: figma.children('Footer Action'),
    },
    example: ({
      appearance,
      size,
      headerText,
      headerDescription,
      previewContent,
      footerActions,
    }: {
      appearance: any;
      size: any;
      headerText: any;
      headerDescription: any;
      previewContent: any;
      footerActions: any;
    }) => (
      <Card appearance={appearance} size={size} orientation="horizontal">
        <CardPreview>{previewContent}</CardPreview>
        <CardHeader
          header={
            <Body1>
              <b>{headerText}</b>
            </Body1>
          }
          description={<Caption1>{headerDescription}</Caption1>}
        />
        <CardFooter>{footerActions}</CardFooter>
      </Card>
    ),
  },
);
