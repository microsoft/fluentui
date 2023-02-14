import * as React from 'react';
import { makeStyles, Button, Popover, PopoverSurface, PopoverTrigger } from '@fluentui/react-components';
import type { PopoverProps } from '@fluentui/react-components';

const useStyles = makeStyles({
  contentHeader: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useStyles();
  return (
    <div>
      <h3 className={styles.contentHeader}>Popover content</h3>

      <div>This is some popover content</div>
    </div>
  );
};

const iframeContent = `<div id="iframecontent">
  <button>Hello World!</button>
</div>`;

export const Default = (props: PopoverProps) => (
  <>
    <iframe title="iframe" srcDoc={iframeContent} />
    <div />
    <Popover {...props}>
      <PopoverTrigger disableButtonEnhancement>
        <Button>Popover trigger</Button>
      </PopoverTrigger>

      <PopoverSurface>
        <iframe title="iframe" srcDoc={iframeContent} />
      </PopoverSurface>
    </Popover>
  </>
);
