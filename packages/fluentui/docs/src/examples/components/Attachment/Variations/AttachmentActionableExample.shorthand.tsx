import * as React from 'react';

import { CloseIcon } from '@fluentui/react-icons-northstar';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentActionableExampleShorthand = () => {
  const handleClick = (message: string) => (e: React.SyntheticEvent<HTMLElement>) => {
    alert(`'${message}' was clicked`);
    e.stopPropagation();
  };

  return (
    <div>
      <Attachment actionable header="Picture.jpg" onClick={handleClick('Attachment')} />
      <Attachment
        actionable
        header="Document.docx"
        onClick={handleClick('Attachment')}
        action={{ icon: <CloseIcon />, onClick: handleClick('Remove'), title: 'Close' }}
      />
    </div>
  );
};
export default AttachmentActionableExampleShorthand;
