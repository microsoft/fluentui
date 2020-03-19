import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';

class AttachmentActionableExampleShorthand extends React.Component {
  handleClick = message => e => {
    alert(`'${message}' was clicked`);
    e.stopPropagation();
  };

  render() {
    return (
      <Attachment
        actionable
        icon="table"
        header="Document.docx"
        description="800 Kb"
        action={{ icon: 'more', onClick: this.handleClick('More Action'), title: 'More Action' }}
        progress={33}
        onClick={this.handleClick('Attachment')}
      />
    );
  }
}
export default AttachmentActionableExampleShorthand;
