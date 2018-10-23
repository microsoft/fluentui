class Cards extends React.PureComponent {
  render() {
    return <div /*style={this.props.style} */ className="freCards">{this.props.children}</div>;
  }
}
