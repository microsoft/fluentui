# Components/Image

An image displays graphical content such as a photo or illustration.

## Best practices

### Do

- Provide descriptive, accurate and concise description for `alt` attribute in order to be accessible to screen readers.
- The `alt` description should also include and consider the context where the image fits in.
- Decorative images should be excluded for assistive tools, thus adding `role="presentation"` or `aria-hidden="true"`.

### Don't

- Don't include "image of", "picture of" etc. in the `alt` attribute since it is redundant.
- Don't repeat the same information that is already on the page on the `alt` attribute.

## Props

| Name       | Type                                          | Required | Default   | Description                                                     |
| ---------- | --------------------------------------------- | -------- | --------- | --------------------------------------------------------------- |
| `as`       | `"img"`                                       | No       |           |                                                                 |
| `block`    | `boolean`                                     | No       | false     | An image can take up the width of its container.                |
| `bordered` | `boolean`                                     | No       | false     | An image can appear with a rectangular border.                  |
| `fit`      | `"center" "none" "contain" "cover" "default"` | No       | 'default' | An image can set how it should be resized to fit its container. |
| `shadow`   | `boolean`                                     | No       | false     | An image can appear elevated with shadow.                       |
| `shape`    | `"circular" "square" "rounded"`               | No       | 'square'  | An image can appear square, circular, or rounded.               |
| `ref`      | `Ref<HTMLImageElement>`                       | No       |           |                                                                 |

## Examples

### Block

An Image can be maximized in order to fill its parent container.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Block = (): JSXElement => (
  <>
    <Image block src="https://fabricweb.azureedge.net/fabric-website/placeholders/900x50.png" alt="Image placeholder" />
    <Image
      block
      src="https://fabricweb.azureedge.net/fabric-website/placeholders/100x100.png"
      alt="Image placeholder"
    />
  </>
);
```

### Bordered

The `bordered` prop will apply a border style to images regardless of its shape.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Bordered = (): JSXElement => (
  <div>
    <div style={{ display: 'flex', gap: 8 }}>
      <Image
        alt="Allan's avatar"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />

      <Image
        alt="Amanda's avatar"
        shape="rounded"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />

      <Image
        alt="Erik's avatar"
        shape="circular"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </div>
    <div style={{ display: 'flex', gap: 8, marginTop: '15px' }}>
      <Image
        alt="Allan's avatar"
        bordered
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
        height={200}
        width={200}
      />

      <Image
        alt="Amanda's avatar"
        bordered
        shape="rounded"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
        height={200}
        width={200}
      />

      <Image
        alt="Erik's avatar"
        bordered
        shape="circular"
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
        height={200}
        width={200}
      />
    </div>
  </div>
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';
import type { ImageProps } from '@fluentui/react-components';
import type { ArgTypes, Parameters } from '@storybook/react-webpack5';

export const Default = (props: ImageProps): JSXElement => {
  return (
    <Image
      {...props}
      alt="Allan's avatar"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
    />
  );
};
```

### Fallback

In cases when images fail to load, the Image component will result into the native `<img/>` browser fallback.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Fallback = (): JSXElement => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Image
      alt="Allan's avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />

    <Image
      alt="Non-existing avatar"
      bordered
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/non-existing-png.jpg"
      height={200}
      width={200}
    />
  </div>
);
```

### Fit

The `fit` prop is used to determine how the image should be resized in order to fit its container.

The image can be resized in various ways: centering to its container(`center`),
filling its container (`cover`) or preserving the aspect ratio (`contain`).

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Fit = (): JSXElement => (
  <>
    <h1>None</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Image placeholder"
        fit="none"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x100.png"
        alt="Image placeholder"
        fit="none"
      />
    </div>

    <h1>Center</h1>
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Image placeholder"
        fit="center"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 150, width: 300 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/200x100.png"
        alt="Image placeholder"
        fit="center"
      />
    </div>

    <h1>Contain</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png"
        alt="Image placeholder"
        fit="contain"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 250, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png"
        alt="Image placeholder"
        fit="contain"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 450 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x200.png"
        alt="Image placeholder"
        fit="contain"
      />
    </div>

    <h1>Cover</h1>
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x250.png"
        alt="Image placeholder"
        fit="cover"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/400x300.png"
        alt="Image placeholder"
        fit="cover"
      />
    </div>
    <br />
    <div style={{ border: '1px solid green', height: 200, width: 400 }}>
      <Image
        src="https://fabricweb.azureedge.net/fabric-website/placeholders/600x200.png"
        alt="Image placeholder"
        fit="cover"
      />
    </div>
  </>
);
```

### Shadow

The shadow prop will apply box shadow styling to the image.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Shadow = (): JSXElement => (
  <Image shadow src="https://fabricweb.azureedge.net/fabric-website/placeholders/300x300.png" alt="Image placeholder" />
);
```

### Shape

Images can be styled as square (default), circular, or with rounded corners.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Image } from '@fluentui/react-components';

export const Shape = (): JSXElement => (
  <div style={{ display: 'flex', gap: 8 }}>
    <Image
      alt="Allan's avatar"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AllanMunger.jpg"
      height={200}
      width={200}
    />

    <Image
      alt="Erik's avatar"
      shape="circular"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ErikNason.jpg"
      height={200}
      width={200}
    />

    <Image
      alt="Amanda's avatar"
      shape="rounded"
      src="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/AmandaBrady.jpg"
      height={200}
      width={200}
    />
  </div>
);
```
