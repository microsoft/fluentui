# Components/Card/CardFooter

The CardFooter component, used inside of a Card, uses a flex layout to organize actions the user can take with a Card, like sharing the contents or replying to a message.

## Props

| Name     | Type                                                                                                                                      | Required | Default | Description |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | -------- | ------- | ----------- | ----------------------------------------------------------------------------- |
| `action` | `WithSlotShorthandValue<{ as?: "div"; } & Omit<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "children"> & { ...; }> | null`    | No      |             | Container that renders on the far end of the footer, used for action buttons. |
| `as`     | `"div"`                                                                                                                                   | No       |         |             |
| `ref`    | `Ref<HTMLDivElement>`                                                                                                                     | No       |         |             |

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, Button } from '@fluentui/react-components';
import { ArrowReply16Regular, MoreHorizontal20Regular, Share16Regular } from '@fluentui/react-icons';
import { CardFooter } from '@fluentui/react-components';

const useStyles = makeStyles({
  footer: {
    width: '300px',
  },
});

export const Default = (): JSXElement => {
  const styles = useStyles();

  return (
    <CardFooter
      className={styles.footer}
      action={<Button appearance="transparent" icon={<MoreHorizontal20Regular />} aria-label="More options" />}
    >
      <Button icon={<ArrowReply16Regular />}>Reply</Button>
      <Button icon={<Share16Regular />}>Share</Button>
    </CardFooter>
  );
};
```
