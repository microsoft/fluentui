import * as React from 'react';
import { Label, Spinner } from 'office-ui-fabric-react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { CollapsibleSection } from '@uifabric/experiments/lib/CollapsibleSection';

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
export class CollapsibleSectionBasicExample extends React.Component<{}, {}> {
  // TODO: move these changes to Slots page
  public render(): JSX.Element {
    return (
      <div>
        <FocusZone>
          {/* <CollapsibleSection key={1} defaultCollapsed={true} title="Title 1">
            Content 1
          </CollapsibleSection> */}
          <CollapsibleSection
            key={1}
            defaultCollapsed={true}
            title={{
              // TODO: why can't TS infer typing here while it can for Button.Styles.Example?
              // styles: (props, theme) => ({
              //   text: [
              //     theme.fonts.large,
              //     {
              //       fontWeight: 800
              //     }
              //   ]
              // }),
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
                // TODO: should this div slot typing be able to handle shorthand strings? (see comment about spreading props on div above)
                // 'Data loaded'
                { children: 'Data loaded' }
              )
            }
          />
          <CollapsibleSection
            key={1}
            defaultCollapsed={true}
            title={{
              // TODO: why can't TS infer typing here while it can for Button.Styles.Example?
              // styles: (props, theme) => ({
              //   text: [
              //     theme.fonts.large,
              //     {
              //       fontWeight: 800
              //     }
              //   ]
              // }),
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
        </FocusZone>
      </div>
    );
  }
}
