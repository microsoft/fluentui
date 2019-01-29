import * as React from 'react';
import { CollapsibleSection } from '@uifabric/experiments';
import { Label, Spinner } from 'office-ui-fabric-react';

// Mock async data container component
interface IAsyncDataProps {
  render: (data?: string) => JSX.Element;
  data?: string;
}

class AsyncData extends React.Component<IAsyncDataProps, { loading: boolean }> {
  constructor(props: IAsyncDataProps) {
    super(props);
    this.state = { loading: true };
  }

  public componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 3000);
  }

  public render() {
    const { loading } = this.state;
    const { render, data } = this.props;

    return render(loading ? undefined : data);
  }
}

// tslint:disable:jsx-no-lambda
export class SlotsAsyncExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CollapsibleSection
          key={1}
          defaultCollapsed={true}
          title={{
            // TODO: why can't TS infer typing here while it can for Button.Styles.Example?
            // TODO: this is related to shorthand prop and works fine when it's 'children' or 'never'
            styles: (props, theme) => ({
              text: [
                theme.fonts.large,
                {
                  fontWeight: 800
                }
              ]
            }),
            text: render =>
              render(
                (ComponentType, props) => (
                  <AsyncData
                    data="done"
                    render={data => (data ? <ComponentType {...props} /> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />)}
                  />
                ),
                'Title loaded'
              )
          }}
          body={render =>
            render(
              (ComponentType, props) => (
                <AsyncData
                  data="done"
                  render={data => (
                    <div style={{ border: '1px solid black' }}>
                      <ComponentType {...props}>
                        {/* TODO: children should be passed to div by spreading props, but they don't render */}
                        {/* {!data && <Spinner styles={{ root: { alignItems: 'flex-start' } }} />} */}
                        {data ? <Label>{props.children}</Label> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />}
                      </ComponentType>
                    </div>
                  )}
                />
              ),
              // TODO: make sure undefineds here don't overwrite props.
              'Data loaded'
            )
          }
        />
        <CollapsibleSection
          key={1}
          defaultCollapsed={true}
          title={{
            styles: (props, theme) => ({
              text: [
                theme.fonts.large,
                {
                  fontWeight: 800
                }
              ]
            }),
            text: render =>
              render(
                (ComponentType, props) => (
                  <AsyncData
                    data="done"
                    render={data => (data ? <ComponentType {...props} /> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />)}
                  />
                ),
                { children: 'Title loaded' }
              )
          }}
          body={render =>
            render(
              (ComponentType, props) => (
                <AsyncData
                  data="done"
                  render={data => (
                    <div style={{ border: '1px solid black' }}>
                      <ComponentType {...props}>
                        {/* TODO: children should be passed to div by spreading props, but they don't render */}
                        {/* {!data && <Spinner styles={{ root: { alignItems: 'flex-start' } }} />} */}
                        {data ? <Label>{props.children}</Label> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />}
                      </ComponentType>
                    </div>
                  )}
                />
              ),
              // TODO: make sure undefineds here don't overwrite props.
              { children: 'Data loaded' }
            )
          }
        />
      </div>
    );
  }
}
