import * as React from 'react';
import {
  CollapsibleSection,
  ICollapsibleSectionProps,
  ICollapsibleSectionTitleProps,
  ICollapsibleSectionTitleStylesReturnType
} from '@uifabric/experiments';
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

const titleTextStyles: ICollapsibleSectionTitleProps['styles'] = (props, theme): ICollapsibleSectionTitleStylesReturnType => ({
  text: [
    theme.fonts.large,
    {
      fontWeight: 800
    }
  ]
});

const titleTextRender: ICollapsibleSectionTitleProps['text'] = render =>
  render(
    (ComponentType, props) => (
      <AsyncData
        data="done"
        // tslint:disable-next-line:jsx-no-lambda
        render={data => (data ? <ComponentType {...props} /> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />)}
      />
    ),
    'Title loaded'
  );

const bodyRender: ICollapsibleSectionProps['body'] = render =>
  render((ComponentType, props) => (
    <AsyncData
      data="done"
      // tslint:disable-next-line:jsx-no-lambda
      render={data => (
        <div style={{ border: '1px solid black' }}>
          <ComponentType {...props}>
            {data ? <Label>{props.children}</Label> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />}
          </ComponentType>
        </div>
      )}
    />
  ));

export class SlotsAsyncExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CollapsibleSection
          key={1}
          defaultCollapsed={true}
          title={{
            styles: titleTextStyles,
            text: titleTextRender
          }}
          body={bodyRender}
        >
          Data loaded
        </CollapsibleSection>
        <CollapsibleSection
          key={1}
          defaultCollapsed={true}
          title={{
            styles: titleTextStyles,
            text: titleTextRender
          }}
          body={bodyRender}
        >
          Data loaded
        </CollapsibleSection>
      </div>
    );
  }
}
