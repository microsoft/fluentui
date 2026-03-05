# Migration Shims/V0/Video

# Video Component

The `Video` component provides the ability to embed video content with various controls and attributes.

## Props

| Name       | Type      | Required | Default | Description                                               |
| ---------- | --------- | -------- | ------- | --------------------------------------------------------- |
| `src`      | `string`  | Yes      |         | The source URL of the video                               |
| `autoPlay` | `boolean` | No       | false   | Whether the video should start playing automatically      |
| `controls` | `boolean` | No       | true    | Whether the video should display controls                 |
| `loop`     | `boolean` | No       |         | Whether the video should loop                             |
| `muted`    | `boolean` | No       |         | Whether the video should be muted                         |
| `poster`   | `string`  | No       |         | The URL of an image to display while the video is loading |

## Examples

### AutoPlay

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Video } from '@fluentui/react-migration-v0-v9';

export const AutoPlay = (): JSXElement => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" autoPlay />
);
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Video } from '@fluentui/react-migration-v0-v9';

export const Default = (): JSXElement => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" controls />
);
```

### Muted

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Video } from '@fluentui/react-migration-v0-v9';

export const Muted = (): JSXElement => (
  <Video src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4" muted />
);
```

### WithPoster

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Video } from '@fluentui/react-migration-v0-v9';

export const WithPoster = (): JSXElement => (
  <Video
    src="https://fabricweb.azureedge.net/fabric-website/assets/videos/2020_MSFT_Icon_Celebration.mp4"
    poster="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/ade.jpg"
    controls
  />
);
```
