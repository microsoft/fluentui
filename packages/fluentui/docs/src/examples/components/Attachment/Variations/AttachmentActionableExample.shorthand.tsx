import * as React from 'react';
import { Attachment } from '@fluentui/react-northstar';
import { MoreIcon, TableIcon } from '@fluentui/react-icons-northstar';

class AttachmentActionableExampleShorthand extends React.Component {
  handleClick = message => e => {
    alert(`'${message}' was clicked`);
    e.stopPropagation();
  };

  render() {
    return (
      <Attachment
        actionable
        icon={<TableIcon />}
        header="Document.docx"
        description="800 Kb"
        action={{ icon: <MoreIcon />, onClick: this.handleClick('More Action'), title: 'More Action' }}
        progress={33}
        onClick={this.handleClick('Attachment')}
      />
    );
  }
}
export default AttachmentActionableExampleShorthand;
