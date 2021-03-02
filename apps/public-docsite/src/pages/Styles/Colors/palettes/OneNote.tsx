import * as React from 'react';

import { ColorPalette, MarkdownHeader } from '@fluentui/react-docsite-components/lib/index2';

export const OneNote = () => {
  return (
    <>
      <MarkdownHeader as="h2">OneNote</MarkdownHeader>

      <ColorPalette
        colors={[
          {
            name: 'OneNote Shade 20',
            hex: '#4c0f6c',
          },
          {
            name: 'OneNote Shade 10',
            hex: '#5c1384',
          },
          {
            name: 'OneNote Primary',
            hex: '#7719aa',
          },
          {
            name: 'OneNote Tint 10',
            hex: '#9953c0',
          },
          {
            name: 'OneNote Tint 20',
            hex: '#d0afe2',
          },
          {
            name: 'OneNote Tint 30',
            hex: '#ddc5ec',
          },
          {
            name: 'OneNote Tint 40',
            hex: '#efdffa',
          },
          {
            name: 'OneNote Tint 50',
            hex: '#f5edfd',
          },
        ]}
      />
    </>
  );
};
