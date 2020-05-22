import * as React from 'react';
import { Provider, teamsTheme, Attachment } from '@fluentui/react-northstar';

const AttachmentDefaultBsize = () => (
  <Provider theme={teamsTheme}>
    <Attachment header="Document.docx" />
  </Provider>
);

export default AttachmentDefaultBsize;
