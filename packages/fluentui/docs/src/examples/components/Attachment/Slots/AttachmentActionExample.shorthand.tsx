import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';
import { CloseIcon, MoreIcon } from '@fluentui/react-icons-northstar';

class AttachmentActionExampleShorthand extends React.Component {
  handleClick = action => () => alert(`'${action}' was clicked`);

  render() {
    return (
      <div>
        <Attachment
          header="Picture.jpg"
          actionable
          action={{ icon: <CloseIcon />, onClick: this.handleClick('Remove'), title: 'Close' }}
        />
        <Attachment
          header="Document.docx"
          actionable
          action={{ icon: <MoreIcon />, onClick: this.handleClick('Show more'), title: 'Show more' }}
        />
      </div>
    );
  }
}

export default AttachmentActionExampleShorthand;
