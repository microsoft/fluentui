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

const Surface = () => {
  const dialogRef = React.useRef<HTMLDivElement>(null);

  const checkIntersection = () => {
    const titlebar = document.getElementById('title-bar');
    const dialog = dialogRef.current;

    if (!titlebar || !dialog) {
      return;
    }

    const titlebarRect = titlebar.getBoundingClientRect();

    if (titlebarRect.bottom >= parseFloat(getComputedStyle(dialog).marginTop)) {
      console.log('Titlebar bottom edge is intersecting with Dialog top edge.');
    } else {
      console.log('No intersection between Titlebar and Dialog.');
    }
  };

  React.useEffect(() => {
    // Check on mount
    checkIntersection();

    // Add resize event listener
    window.addEventListener('resize', checkIntersection);

    // Add ResizeObserver to track dialog size changes
    const resizeObserver = new ResizeObserver(() => {
      console.log('Dialog size changed.');
      checkIntersection();
    });
    const dialog = dialogRef.current;
    if (dialog) {
      resizeObserver.observe(dialog);
    }

    return () => {
      window.removeEventListener('resize', checkIntersection);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <DialogSurface ref={dialogRef} style={{ overflow: 'auto', resize: 'both' }}>
      <DialogBody>
        <DialogTitle>Dialog title</DialogTitle>
        <DialogContent>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam exercitationem cumque repellendus eaque est
          dolor eius expedita nulla ullam? Tenetur reprehenderit aut voluptatum impedit voluptates in natus iure cumque
          eaque?
        </DialogContent>
        <DialogActions>
          <DialogTrigger disableButtonEnhancement>
            <Button appearance="secondary">Close</Button>
          </DialogTrigger>
          <Button appearance="primary">Do Something</Button>
        </DialogActions>
      </DialogBody>
    </DialogSurface>
  );
};

const DialogExample = () => {
  return (
    <Dialog>
      <DialogTrigger disableButtonEnhancement>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <Surface />
    </Dialog>
  );
};

export const Example = () => {
  return (
    <div>
      <div id={'title-bar'} style={{ height: '48px', width: '100%', backgroundColor: 'cornflowerblue' }}>
        title bar
      </div>
      <DialogExample />
    </div>
  );
};
