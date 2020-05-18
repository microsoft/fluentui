import * as React from 'react';
import { Header, Text, screenReaderContainerStyles } from '@fluentui/react-northstar';

const titleStyle = {
  margin: 0,
};

interface ComponentExampleTitleProps {
  description?: React.ReactNode;
  title: React.ReactNode;
  sourceName?: string;
}

export default class ComponentExampleTitle extends React.PureComponent<ComponentExampleTitleProps> {
  render() {
    const { description, title, sourceName } = this.props;
    return (
      <div>
        {title && <Header as="h3" className="no-anchor" content={title} styles={titleStyle} />}
        <Text content={description} />
        {sourceName && <Text style={screenReaderContainerStyles} content={sourceName} />}
      </div>
    );
  }
}
