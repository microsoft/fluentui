# Migration Shims/V0/Attachment

# Attachment

An Attachment represents a file or media attachment, which may contain some metadata or actions.

### Property Mapping Table for Attachment Component

| v0 Property | v9 Property / Subcomponent                                           |
| ----------- | -------------------------------------------------------------------- |
| action      | `<AttachmentAction>` inside `Attachment` component children          |
| actionable  | actionable                                                           |
| body        | `<AttachmentBody>` inside `Attachment` component children            |
| className   | className                                                            |
| description | `<AttachmentDescription>` inside `AttachmentBody` component children |
| disabled    | disabled                                                             |
| header      | `<AttachmentHeader>` inside `AttachmentBody` component children      |
| icon        | `<AttachmentIcon>` inside `Attachment` component children            |
| onClick     | onClick                                                              |
| progress    | progress                                                             |
| styles      | className                                                            |
| variables   | N/A - use className                                                  |

### Example Usage in v9

Instead of using slot props in v0, you will now use subcomponents in v9. For example:

**v0:**

```
<Attachment
  header="Document.docx"
  description="800 KB"
  icon={<WordColorIcon />}
  action={{
    icon: <CloseIcon />,
    onClick: () => alert('Remove clicked'),
  }}
  progress={45}
/>
```

**v9:**

```
<Attachment progress={45} onClick={() => alert('Attachment clicked')}>
  <AttachmentIcon><Word /></AttachmentIcon>
   <AttachmentBody>
    <AttachmentHeader>Document.docx</AttachmentHeader>
    <AttachmentDescription>800 KB</AttachmentDescription>
  </AttachmentBody>
  <AttachmentAction icon={<Dismiss />} onClick={() => alert('Remove clicked')} title="Remove" />
</Attachment>
```

## Props

| Name         | Type                                                        | Required | Default | Description |
| ------------ | ----------------------------------------------------------- | -------- | ------- | ----------- | --- |
| `actionable` | `boolean`                                                   | No       |         |             |
| `disabled`   | `boolean`                                                   | No       |         |             |
| `progress`   | `string                                                     | number`  | No      |             |     |
| `onClick`    | `((event: MouseEvent<HTMLDivElement, MouseEvent>) => void)` | No       |         |             |

## Examples

### Action

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentAction, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import { DismissRegular as Dismiss, MoreHorizontalRegular as MoreHorizontal } from '@fluentui/react-icons';

export const Action = (): JSXElement => {
  const handleClick = (action: string) => () => alert(`'${action}' was clicked`);

  return (
    <div>
      <Attachment onClick={handleClick('Remove')}>
        <AttachmentBody>
          <AttachmentHeader>Picture.jpg</AttachmentHeader>
        </AttachmentBody>
        <AttachmentAction icon={<Dismiss />} onClick={handleClick('Remove')} title="Close" />
      </Attachment>
      <Attachment onClick={handleClick('Show more')}>
        <AttachmentBody>
          <AttachmentHeader>Document.docx</AttachmentHeader>
        </AttachmentBody>
        <AttachmentAction icon={<MoreHorizontal />} onClick={handleClick('Show more')} title="Show more" />
      </Attachment>
    </div>
  );
};
```

### Actionable

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import {
  Attachment,
  AttachmentIcon,
  AttachmentHeader,
  AttachmentDescription,
  AttachmentAction,
  AttachmentBody,
} from '@fluentui/react-migration-v0-v9';
import { MoreHorizontalRegular as MoreHorizontal, TableRegular as Table } from '@fluentui/react-icons';

export const Actionable = (): JSXElement => {
  const handleClick = (message: string) => (e: React.MouseEvent) => {
    alert(`'${message}' was clicked`);
    e.stopPropagation();
  };

  return (
    <Attachment actionable onClick={handleClick('Attachment')} progress={33}>
      <AttachmentIcon>
        <Table />
      </AttachmentIcon>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
        <AttachmentDescription>800 Kb</AttachmentDescription>
      </AttachmentBody>
      <AttachmentAction icon={<MoreHorizontal />} onClick={handleClick('More Action')} title="More Action" />
    </Attachment>
  );
};
```

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Default = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Document.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};
```

### Description

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentDescription, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Description = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Profile.jpg</AttachmentHeader>
        <AttachmentDescription>80kb</AttachmentDescription>
      </AttachmentBody>
    </Attachment>
  );
};
```

### Header

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';

export const Header = (): JSXElement => {
  return (
    <Attachment>
      <AttachmentBody>
        <AttachmentHeader>Strategy.docx</AttachmentHeader>
      </AttachmentBody>
    </Attachment>
  );
};
```

### Icon

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentIcon, AttachmentHeader, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import {
  BriefcaseRegular as Briefcase,
  BookRegular as Book,
  PresenterRegular as Presenter,
} from '@fluentui/react-icons';

export const Icon = (): JSXElement => {
  return (
    <div>
      <Attachment>
        <AttachmentIcon>
          <Book />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>MeetingNotes.docx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Briefcase />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Budget.xlsx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
      <Attachment>
        <AttachmentIcon>
          <Presenter />
        </AttachmentIcon>
        <AttachmentBody>
          <AttachmentHeader>Presentation.pptx</AttachmentHeader>
        </AttachmentBody>
      </Attachment>
    </div>
  );
};
```

### Progress

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Attachment, AttachmentHeader, AttachmentAction, AttachmentBody } from '@fluentui/react-migration-v0-v9';
import { DismissRegular as Dismiss } from '@fluentui/react-icons';

export const Progress = (): JSXElement => {
  return (
    <Attachment actionable progress={33} onClick={() => alert('Attachment clicked')}>
      <AttachmentBody>
        <AttachmentHeader>Photo.jpg</AttachmentHeader>
      </AttachmentBody>
      <AttachmentAction icon={<Dismiss />} onClick={() => alert("'X' is clicked!")} title="Close" />
    </Attachment>
  );
};
```
