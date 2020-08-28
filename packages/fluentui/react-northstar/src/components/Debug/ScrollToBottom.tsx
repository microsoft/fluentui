import * as React from 'react';

export class ScrollToBottom extends React.Component<any> {
  ref = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.ref.current.scrollTo({ behavior: 'smooth', top: 999999 });
  }

  render() {
    return <div ref={this.ref} {...this.props} />;
  }
}
