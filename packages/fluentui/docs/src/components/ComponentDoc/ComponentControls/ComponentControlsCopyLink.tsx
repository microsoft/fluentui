import * as React from 'react';
import * as _ from 'lodash';
import { Tooltip } from '@fluentui/react-northstar';
import { LinkIcon } from '@fluentui/react-icons-northstar';

export default class ComponentControlsCopyLink extends React.Component<any, any> {
  mounted: boolean;
  readonly btnLabel = 'Permalink';

  state: any = {};

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.active !== nextState.active;
  }

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    const { active } = this.state;

    return <Tooltip trigger={<LinkIcon onClick={this.handleClick} />} content={active ? 'Copied!' : this.btnLabel} />;
  }

  handleClick = e => {
    e.preventDefault();
    _.invoke(this.props, 'onClick', e, this.props);

    this.setState({ active: true });
    setTimeout(this.resetActive, 3000);
  };

  resetActive = () => this.mounted && this.setState({ active: false });
}
