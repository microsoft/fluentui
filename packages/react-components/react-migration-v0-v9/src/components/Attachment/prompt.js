const AttachmentComponentMigration = {
  component: 'Attachment',
  generic: [
    'Replace slot props with subcomponents: <AttachmentAction>, <AttachmentBody>, <AttachmentDescription>, <AttachmentHeader>, <AttachmentIcon>.',
    'Ensure that all subcomponents are properly nested within the <Attachment> component.',
  ],
  props: [
    {
      name: 'action',
      instruction:
        'If action property is used, replace it with the <AttachmentAction> subcomponent. Example: <Attachment><AttachmentAction /></Attachment>',
    },
    {
      name: 'body',
      instruction:
        'If body property is used, replace it with the <AttachmentBody> subcomponent. Example: <Attachment><AttachmentBody /></Attachment>',
    },
    {
      name: 'description',
      instruction:
        'If description property is used, replace it with the <AttachmentDescription> subcomponent. Example: <Attachment><AttachmentBody><AttachmentDescription /></AttachmentBody></Attachment>',
    },
    {
      name: 'header',
      instruction:
        'If header property is used, replace it with the <AttachmentHeader> subcomponent. Example: <Attachment><AttachmentBody><AttachmentHeader /></AttachmentBody></Attachment>',
    },
    {
      name: 'icon',
      instruction:
        'If icon property is used, replace it with the <AttachmentIcon> subcomponent. Example: <Attachment><AttachmentIcon /></Attachment>',
    },
    {
      name: 'styles',
      instruction: 'If styles property is used, replace it with className and use appropriate styling approach.',
    },
    {
      name: 'variables',
      instruction: 'If variables property is used, replace it with className and use appropriate styling approach.',
    },
  ],
};

export { AttachmentComponentMigration };
