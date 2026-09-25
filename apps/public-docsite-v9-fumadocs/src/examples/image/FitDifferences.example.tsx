'use client';

import * as React from 'react';
import { Image } from '@fluentui/react-components';
import { webLightTheme } from '@fluentui/react-theme';
import type { ForwardRefComponent } from '@fluentui/react-utilities';
import { createGuideExample } from '../../components/GuideExample';

function fixture(size: number): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 100 100"><rect width="100" height="100" fill="${webLightTheme.colorBrandBackground}"/><path d="M0 0L100 100M100 0L0 100" stroke="${webLightTheme.colorNeutralForegroundOnBrand}"/><text x="50" y="55" text-anchor="middle" fill="${webLightTheme.colorNeutralForegroundOnBrand}" font-size="${webLightTheme.fontSizeBase200}">${size}×${size}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const Comparison: ForwardRefComponent<React.ComponentProps<'div'>> = React.forwardRef((props, ref) => (
  <div {...props} ref={ref} className="grid grid-cols-2 gap-lg">
    {[100, 500].flatMap(size => [
      <figure key={`${size}-v8`} className="m-0">
        <div className="relative overflow-hidden size-[150px] max-w-full border-thin border-success">
          <img
            src={fixture(size)}
            alt={`${size} pixel image using v8 centering`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-none rounded-round border-thin border-danger"
          />
        </div>
        <figcaption className="text-small mt-sm">
          {size}×{size}: v8 centering and border radius
        </figcaption>
      </figure>,
      <figure key={`${size}-v9`} className="m-0">
        <div className="flex flex-col size-[150px] max-w-full border-thin border-success">
          <Image
            src={fixture(size)}
            alt={`${size} pixel image using v9 fit center`}
            fit="center"
            shape="circular"
            className="border-thin border-danger"
          />
        </div>
        <figcaption className="text-small mt-sm">
          {size}×{size}: v9 fit="center" and shape="circular"
        </figcaption>
      </figure>,
    ])}
  </div>
));
Comparison.displayName = 'ImageFitComparison';
export const FitDifferences = createGuideExample(Comparison, 'Compare image fitting');
