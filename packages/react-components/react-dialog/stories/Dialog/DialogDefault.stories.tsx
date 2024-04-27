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
  makeStaticStyles,
  tokens,
} from '@fluentui/react-components';

export const Default = () => {
  useGlobalStyles();

  return (
    <div style={{ height: '20000px', overflowY: 'auto' }}>
      <div style={{ width: '100%', display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '16px' }}>
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
        <div
          style={{
            width: '100px',
            height: '50px',
            backgroundColor: tokens.colorNeutralBackground2,
            borderRadius: '8px',
            border: `1px solid ${tokens.colorNeutralStroke1}`,
          }}
        />
      </div>
      <Dialog>
        <DialogTrigger disableButtonEnhancement>
          <Button>Open dialog</Button>
        </DialogTrigger>
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Dialog title</DialogTitle>
            <DialogContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque
              est dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure
              cumque eaque?
            </DialogContent>
            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance="secondary">Close</Button>
              </DialogTrigger>
              <Button appearance="primary">Do Something</Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>
    </div>
  );
};

const useGlobalStyles = makeStaticStyles({
  html: {
    marginRight: 'calc(-1 * (100vw - 100%))',
    overflowX: 'hidden',
  },
});
