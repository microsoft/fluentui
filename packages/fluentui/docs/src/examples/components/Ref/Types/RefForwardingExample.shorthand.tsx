import * as React from 'react';
import { Grid, Ref, Segment } from '@fluentui/react-northstar';

type RefForwardingExampleState = {
  isMounted: boolean;
};

const ExampleButton = React.forwardRef<HTMLButtonElement, { children: React.ReactNode }>((props, ref) => (
  <div>
    <button {...props} ref={ref} />
  </div>
));

class RefForwardingExample extends React.Component<{}, RefForwardingExampleState> {
  forwardedRef = React.createRef<HTMLButtonElement>();
  state = { isMounted: false };

  componentDidMount() {
    this.setState({ isMounted: true });
  }

  render() {
    const { isMounted } = this.state;
    const buttonNode = this.forwardedRef.current;

    return (
      <Grid columns={2}>
        <Segment>
          <p>
            A button below uses <code>forwardRef</code> API.
          </p>

          <Ref innerRef={this.forwardedRef}>
            <ExampleButton>A button</ExampleButton>
          </Ref>
        </Segment>

        {isMounted && (
          <code style={{ margin: 10 }}>
            <pre>
              {JSON.stringify(
                {
                  nodeName: buttonNode.nodeName,
                  nodeType: buttonNode.nodeType,
                  textContent: buttonNode.textContent,
                },
                null,
                2,
              )}
            </pre>
          </code>
        )}
      </Grid>
    );
  }
}

export default RefForwardingExample;
