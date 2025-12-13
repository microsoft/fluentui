import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button, Popover, PopoverTrigger, PopoverSurface } from '@fluentui/react-components';

const useContentStyles = makeStyles({
  root: {
    boxSizing: 'border-box',
    padding: '16px',
    overflowY: 'auto',
    height: '100%',
  },
  header: {
    marginTop: '0',
  },
});

const ExampleContent = () => {
  const styles = useContentStyles();
  return (
    <div className={styles.root}>
      <h3 className={styles.header}>Popover content</h3>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum semper, nulla at pretium pulvinar, erat nibh
        ultricies risus, eget tincidunt neque nisl non nunc. Integer tempus augue nec facilisis suscipit. Aenean finibus
        orci id turpis euismod, sit amet varius neque porta. Curabitur et urna vel orci luctus dictum. Mauris sed eros
        euismod, cursus justo non, facilisis nibh. Aliquam blandit leo ut nisl tincidunt, sit amet ultrices lacus
        molestie. Phasellus aliquet massa non vestibulum condimentum. Vivamus posuere, ligula eu pharetra fringilla,
        lorem leo elementum risus, vitae tempor odio purus sed libero. Vestibulum porta nisl a metus ultricies, vel
        dignissim lectus facilisis. Etiam interdum mi a suscipit aliquet. Nullam rhoncus molestie purus, id porta neque
        consequat vitae. Sed id aliquam elit. Praesent nunc libero, vulputate vitae porta nec, venenatis sed augue.
      </div>
    </div>
  );
};

export const WithArrowAutosize = (): JSXElement => (
  <Popover withArrow positioning={{ autoSize: true }}>
    <PopoverTrigger disableButtonEnhancement>
      <Button>Popover trigger</Button>
    </PopoverTrigger>

    {/* 1. Reset the overflow behavior on `PopoverSurface` to avoid clipping of arrow */}
    <PopoverSurface tabIndex={-1} style={{ overflow: 'visible', padding: 0 }}>
      {/* 2. Set the height of the popover content to 100% to fill the available space and allow scrolling */}
      <ExampleContent />
    </PopoverSurface>
  </Popover>
);

WithArrowAutosize.parameters = {
  docs: {
    description: {
      story: [
        'When using the arrow with the `autoSize` positioning feature,',
        'make sure to move the `overflow` from the popover to an inner element to avoid clipping the arrow.',
      ].join(' '),
    },
  },
};
