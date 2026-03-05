# Components/Card/CardHeader

The CardHeader component, used inside of a Card, represents a Fluent UI compliant card header.

## Props

| Name          | Type                                                                                                                                      | Required                               | Default | Description |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------- | ----------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `header`      | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`                                  | No      |             | Element used to render the main header title.                                 |
| `image`       | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | ({ ...; } & ... 1 more ... & { ...; }) | null`   | No          |                                                                               | Element used to render an image or avatar related to the card. |
| `action`      | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`                                  | No      |             | Container that renders on the far end of the footer, used for action buttons. |
| `description` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`                                  | No      |             | Element used to render short descriptions related to the title.               |
| `as`          | `"div"`                                                                                                                                   | No                                     |         |             |
| `ref`         | `Ref<HTMLDivElement>`                                                                                                                     | No                                     |         |             |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { CardHeader } from '@fluentui/react-components';
import { makeStyles, Button, Body1, Caption1 } from '@fluentui/react-components';
import { MoreHorizontal20Regular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '16px',
    gap: '16px',
  },
  header: {
    width: '300px',
  },
});

const resolveAsset = (asset: string) => {
  const ASSET_URL =
    'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/react-components/react-card/stories/src/assets/';

  return `${ASSET_URL}${asset}`;
};

export const Default = (): JSXElement => {
  const styles = useStyles();

  const powerpointLogoURL = resolveAsset('pptx.png');

  return (
    <div className={styles.container}>
      <CardHeader
        className={styles.header}
        image={{
          as: 'img',
          src: powerpointLogoURL,
          alt: 'Microsoft PowerPoint logo',
        }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        image={{
          as: 'img',
          src: powerpointLogoURL,
          alt: 'Microsoft PowerPoint logo',
        }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        image={{
          as: 'img',
          src: powerpointLogoURL,
          alt: 'Microsoft PowerPoint logo',
        }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
      />

      <CardHeader
        className={styles.header}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
      />

      <CardHeader
        className={styles.header}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
        description={<Caption1>Developer</Caption1>}
      />

      <CardHeader
        className={styles.header}
        image={{
          as: 'img',
          src: powerpointLogoURL,
          alt: 'Microsoft PowerPoint logo',
        }}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
      />

      <CardHeader
        className={styles.header}
        header={
          <Body1>
            <b>App Name</b>
          </Body1>
        }
      />
    </div>
  );
};
```
