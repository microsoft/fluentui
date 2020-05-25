import * as React from 'react';
import { Header, Text, screenReaderContainerStyles } from '@fluentui/react-northstar';

const titleStyle = {
  margin: 0,
};

interface ComponentExampleTitleProps {
  description?: React.ReactNode;
  title: React.ReactNode;
  sourceHint?: string;
}

export default class ComponentExampleTitle extends React.PureComponent<ComponentExampleTitleProps> {
  render() {
    const { description, title, sourceHint } = this.props;
    return (
      <div>
        {title && <Header as="h3" className="no-anchor" content={title} styles={titleStyle} />}
        {sourceHint && <Text style={screenReaderContainerStyles} content={sourceHint} />}
        <Text content={description} />
      </div>
    );
  }
}
