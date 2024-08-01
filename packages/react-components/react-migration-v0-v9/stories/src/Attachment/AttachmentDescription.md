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
