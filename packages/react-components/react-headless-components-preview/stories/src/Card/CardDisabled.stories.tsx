import * as React from 'react';
import { Card, CardHeader, CardPreview } from '@fluentui/react-headless-components-preview/card';

const classes = {
  card:
    'relative flex flex-col gap-3 w-80 p-3 bg-white rounded-lg border border-gray-200 shadow-sm ' +
    'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed',
  checkbox: 'absolute top-3 left-3 h-4 w-4 accent-blue-600 disabled:cursor-not-allowed',
  preview: 'flex items-center justify-center bg-gray-100 rounded-md overflow-hidden -mx-3 -mt-3',
  previewImage: 'block w-full h-40 object-cover',
  header: 'flex items-center gap-3 pl-6',
  headerTitle: 'text-sm font-semibold text-gray-900 leading-tight',
  headerDescription: 'text-xs text-gray-500 leading-tight',
  body: 'text-sm text-gray-700 leading-snug',
};

export const Disabled = (): React.ReactNode => (
  <Card
    className={classes.card}
    disabled
    selected
    onSelectionChange={() => {
      /* no-op */
    }}
    checkbox={{ className: classes.checkbox, 'aria-label': 'Select card' }}
  >
    <CardPreview className={classes.preview}>
      <img
        className={classes.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={classes.header}
      header={<div className={classes.headerTitle}>Disabled card</div>}
      description={<div className={classes.headerDescription}>Selection is locked</div>}
    />

    <div className={classes.body}>
      A disabled card sets `aria-disabled="true"` on the root and short-circuits selection toggling.
    </div>
  </Card>
);
