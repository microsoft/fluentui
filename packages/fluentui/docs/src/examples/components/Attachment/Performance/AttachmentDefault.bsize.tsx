import * as React from 'react';
import { Provider, themes, Attachment } from '@fluentui/react-northstar';

const AttachmentDefaultBsize = () => (
  <Provider theme={themes.teams}>
    <Attachment header="Document.docx" />
  </Provider>
);

export default AttachmentDefaultBsize;
