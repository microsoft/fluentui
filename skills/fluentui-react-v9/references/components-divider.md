# Components/Divider

A divider visually separates two pieces of content.

## Props

| Name           | Type                                                                                                                                                  | Required | Default   | Description                                                                                                   |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | --------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------------- |
| `wrapper`      | `NonNullable<WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null>`   | No        |                                                                                                               | Wrapper for content when presented. |
| `as`           | `"div"`                                                                                                                                               | No       |           |                                                                                                               |
| `alignContent` | `"center" "start" "end"`                                                                                                                              | No       | 'center'  | Determines the alignment of the content within the divider.                                                   |
| `appearance`   | `"strong" "brand" "subtle" "default"`                                                                                                                 | No       | 'default' | A divider can have one of the preset appearances. When not specified, the divider has its default appearance. |
| `inset`        | `boolean`                                                                                                                                             | No       | false     | Adds padding to the beginning and end of the divider.                                                         |
| `vertical`     | `boolean`                                                                                                                                             | No       | false     | A divider can be horizontal (default) or vertical.                                                            |
| `ref`          | `Ref<HTMLDivElement>`                                                                                                                                 | No       |           |                                                                                                               |

## Examples

### Align Content

The label associated with the divider can be aligned at the `start`, `center`, or `end` of the divider line.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const AlignContent = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider alignContent="start">start</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center">center (default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end">end</Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="start" vertical>
          start
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="center" vertical>
          center (default)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider alignContent="end" vertical>
          end
        </Divider>
      </div>
    </div>
  );
};
```

### Appearance

A divider can have a `brand`, `subtle`, or `strong` appearance. When not specified, it has its default experience.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Appearance = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider>(default)</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="subtle">subtle</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="brand">brand</Divider>
      </div>
      <div className={styles.example}>
        <Divider appearance="strong">strong</Divider>
      </div>
    </div>
  );
};
```

### Custom Styles

A divider can have custom styles applied to both the label and the line.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, shorthands, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
  customHeightExample: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: '192px',
  },
  customWidth: {
    width: '200px',
  },
  customHeight: {
    maxHeight: '50px',
  },
  customFont: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  customLineColor: {
    '::before': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
    '::after': {
      ...shorthands.borderColor(tokens.colorPaletteRedBorder2),
    },
  },
  customLineStyle: {
    ...shorthands.borderWidth('2px'),
    '::before': {
      borderTopStyle: 'dashed',
      borderTopWidth: '2px',
    },
    '::after': {
      borderTopStyle: 'dashed',
      borderTopWidth: '2px',
    },
  },
});

export const CustomStyles = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider className={styles.customWidth}>Custom width (200px)</Divider>
      </div>
      <div className={styles.customHeightExample}>
        <Divider vertical className={styles.customHeight}>
          Custom height (50px)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customFont}>Custom font (14px bold)</Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineColor}>
          Custom line color (<code>tokens.colorPaletteRedBorder2</code>)
        </Divider>
      </div>
      <div className={styles.example}>
        <Divider className={styles.customLineStyle}>Custom line style (2px dashed)</Divider>
      </div>
    </div>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider />
      </div>
      <div className={styles.example}>
        <Divider>Text</Divider>
      </div>
    </div>
  );
};
```

### Inset

A divider can have its line inset from the edges of its container.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Inset = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider inset />
      </div>
      <div className={styles.example}>
        <Divider inset>Text</Divider>
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider inset vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};
```

### Vertical

A divider can vertically separate two pieces of content.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Divider } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    rowGap: '5px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItems: 'center',
    minHeight: '96px',
    backgroundColor: tokens.colorNeutralBackground1,
  },
});

export const Vertical = (): JSXElement => {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }} />
      </div>
      <div className={styles.example}>
        <Divider vertical style={{ height: '100%' }}>
          Text
        </Divider>
      </div>
    </div>
  );
};
```
