# Components/Card/CardPreview

The CardPreview component, used inside of a Card, allows the user to better visualize what the card's contents are.

## Props

| Name   | Type                                                                                                                                      | Required                               | Default | Description |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ----------- | --- | ------------------------------------------------------------------ |
| `logo` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | ({ ...; } & ... 1 more ... & { ...; }) | null`   | No          |     | Container that holds a logo related to the image preview provided. |
| `as`   | `"div"`                                                                                                                                   | No                                     |         |             |
| `ref`  | `Ref<HTMLDivElement>`                                                                                                                     | No                                     |         |             |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CardPreview } from '@fluentui/react-components';

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = (): JSXElement => (
  <CardPreview logo={<img src={resolveAsset('docx.png')} alt="Microsoft Word logo" />}>
    <img src={resolveAsset('doc_template.png')} alt="Preview of a Word document " />
  </CardPreview>
);
```
