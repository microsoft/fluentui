import * as React from 'react';
import * as ReactMarkdown from 'react-markdown';

const InlineMarkdown: React.FunctionComponent<{ value: string }> = ({ value }) => <ReactMarkdown source={value} />;

export default InlineMarkdown;
