import * as React from 'react';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from '@fluentui/react-components';
import { figma } from '@figma/code-connect';

/**
 * Figma Code Connect configuration for Dialog component
 * This connects the Figma Dialog component to the React implementation
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/Z9KRuq4Dca3xEuC0BAt0YY/Design-Systems-Connect--Demo-?node-id=15-4906&m=dev', // Replace with actual Figma file URL
  {
    props: {
      // Map Figma properties to React props
      modalType: figma.enum('Modal Type', {
        Modal: 'modal', // Default
        'Non-Modal': 'non-modal',
        Alert: 'alert',
      }),
      open: figma.boolean('Open'),
      inertTrapFocus: figma.boolean('Inert Trap Focus'),
      children: figma.children(['DialogTrigger', 'DialogSurface']),
    },
    example: ({
      modalType,
      open,
      inertTrapFocus,
      children,
    }: {
      modalType: any;
      open: any;
      inertTrapFocus: any;
      children: any;
    }) => (
      <Dialog modalType={modalType} open={open} inertTrapFocus={inertTrapFocus}>
        {children}
      </Dialog>
    ),
  },
);

/**
 * Figma Code Connect configuration for DialogSurface component
 */
figma.connect(
  DialogSurface,
  'https://www.figma.com/design/yourfile/dialog-surface-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.children(['DialogBody']),
    },
    example: ({ children }: { children: any }) => <DialogSurface>{children}</DialogSurface>,
  },
);

/**
 * Figma Code Connect configuration for DialogBody component
 */
figma.connect(
  DialogBody,
  'https://www.figma.com/design/yourfile/dialog-body-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.children(['DialogTitle', 'DialogContent', 'DialogActions']),
    },
    example: ({ children }: { children: any }) => <DialogBody>{children}</DialogBody>,
  },
);

/**
 * Figma Code Connect configuration for DialogTitle component
 */
figma.connect(
  DialogTitle,
  'https://www.figma.com/design/yourfile/dialog-title-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.textContent('Title Text'),
      as: figma.enum('Heading Level', {
        H1: 'h1',
        H2: 'h2', // Default
        H3: 'h3',
        H4: 'h4',
        H5: 'h5',
        H6: 'h6',
        Div: 'div',
      }),
    },
    example: ({ children, as }: { children: any; as: any }) => <DialogTitle as={as}>{children}</DialogTitle>,
  },
);

/**
 * Figma Code Connect configuration for DialogContent component
 */
figma.connect(
  DialogContent,
  'https://www.figma.com/design/yourfile/dialog-content-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.textContent('Content Text'),
    },
    example: ({ children }: { children: any }) => <DialogContent>{children}</DialogContent>,
  },
);

/**
 * Figma Code Connect configuration for DialogActions component
 */
figma.connect(
  DialogActions,
  'https://www.figma.com/design/yourfile/dialog-actions-node', // Replace with actual Figma file URL
  {
    props: {
      position: figma.enum('Position', {
        Start: 'start',
        End: 'end', // Default
      }),
      fluid: figma.boolean('Fluid'),
      children: figma.children('Button'),
    },
    example: ({ position, fluid, children }: { position: any; fluid: any; children: any }) => (
      <DialogActions position={position} fluid={fluid}>
        {children}
      </DialogActions>
    ),
  },
);

/**
 * Figma Code Connect configuration for DialogTrigger component
 */
figma.connect(
  DialogTrigger,
  'https://www.figma.com/design/yourfile/dialog-trigger-node', // Replace with actual Figma file URL
  {
    props: {
      children: figma.children('Button'),
      disableButtonEnhancement: figma.boolean('Disable Button Enhancement'),
    },
    example: ({ children, disableButtonEnhancement }: { children: any; disableButtonEnhancement: any }) => (
      <DialogTrigger disableButtonEnhancement={disableButtonEnhancement}>{children}</DialogTrigger>
    ),
  },
);

/**
 * Complete Dialog example with all subcomponents
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/yourfile/complete-dialog-node', // Replace with actual Figma file URL for complete dialog
  {
    props: {
      modalType: figma.enum('Modal Type', {
        Modal: 'modal',
        'Non-Modal': 'non-modal',
        Alert: 'alert',
      }),
      triggerText: figma.textContent('Trigger Text'),
      titleText: figma.textContent('Title Text'),
      contentText: figma.textContent('Content Text'),
      primaryButtonText: figma.textContent('Primary Button Text'),
      secondaryButtonText: figma.textContent('Secondary Button Text'),
      actionsPosition: figma.enum('Actions Position', {
        Start: 'start',
        End: 'end',
      }),
      fluidActions: figma.boolean('Fluid Actions'),
    },
    example: ({
      modalType,
      triggerText,
      titleText,
      contentText,
      primaryButtonText,
      secondaryButtonText,
      actionsPosition,
      fluidActions,
    }: {
      modalType: any;
      triggerText: any;
      titleText: any;
      contentText: any;
      primaryButtonText: any;
      secondaryButtonText: any;
      actionsPosition: any;
      fluidActions: any;
    }) => (
      <Dialog modalType={modalType}>
        <DialogTrigger disableButtonEnhancement>
          <Button>{triggerText}</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>{contentText}</DialogContent>
            <DialogActions position={actionsPosition} fluid={fluidActions}>
              <Button appearance="primary">{primaryButtonText}</Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">{secondaryButtonText}</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    ),
  },
);

/**
 * Alert Dialog - specific configuration for alert modal type
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/yourfile/alert-dialog-node', // Replace with actual Figma file URL for alert dialog
  {
    props: {
      triggerText: figma.textContent('Trigger Text'),
      titleText: figma.textContent('Title Text'),
      contentText: figma.textContent('Content Text'),
      primaryButtonText: figma.textContent('Primary Action'),
      secondaryButtonText: figma.textContent('Close'),
    },
    example: ({
      triggerText,
      titleText,
      contentText,
      primaryButtonText,
      secondaryButtonText,
    }: {
      triggerText: any;
      titleText: any;
      contentText: any;
      primaryButtonText: any;
      secondaryButtonText: any;
    }) => (
      <Dialog modalType="alert">
        <DialogTrigger disableButtonEnhancement>
          <Button>{triggerText}</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>{contentText}</DialogContent>
            <DialogActions>
              <Button appearance="primary">{primaryButtonText}</Button>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">{secondaryButtonText}</Button>
              </DialogTrigger>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    ),
  },
);

/**
 * Non-Modal Dialog - specific configuration for non-modal type
 */
figma.connect(
  Dialog,
  'https://www.figma.com/design/yourfile/non-modal-dialog-node', // Replace with actual Figma file URL for non-modal dialog
  {
    props: {
      triggerText: figma.textContent('Trigger Text'),
      titleText: figma.textContent('Title Text'),
      contentText: figma.textContent('Content Text'),
    },
    example: ({ triggerText, titleText, contentText }: { triggerText: any; titleText: any; contentText: any }) => (
      <Dialog modalType="non-modal">
        <DialogTrigger disableButtonEnhancement>
          <Button>{triggerText}</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>{titleText}</DialogTitle>
            <DialogContent>{contentText}</DialogContent>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    ),
  },
);
