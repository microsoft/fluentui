import * as React from 'react';

import { CloseIcon, MoreIcon } from '@fluentui/react-icons-northstar';
import { Attachment } from '@fluentui/react-northstar';

const AttachmentActionExampleShorthand = () => {
  const handleClick = (action: string) => () => alert(`'${action}' was clicked`);

  return (
    <div>
      <Attachment
        header="Picture.jpg"
        action={{ icon: <CloseIcon />, onClick: handleClick('Remove'), title: 'Close' }}
      />
      <Attachment
        header="Document.docx"
        action={{ icon: <MoreIcon />, onClick: handleClick('Show more'), title: 'Show more' }}
      />
    </div>
  );
};

export default AttachmentActionExampleShorthand;
