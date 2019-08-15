import * as React from 'react';
import { CollapsibleSection, ICollapsibleSectionTitleProps, ICollapsibleSectionTitleStylesReturnType } from '@uifabric/experiments';
import { ITextProps, Label, Spinner } from 'office-ui-fabric-react';
import { ISlotRender, IHTMLSlot } from '@uifabric/foundation';

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

// TODO: use extendsComponent to create variants and clean up these examples
const titleTextRender: ISlotRender<ITextProps> = (props, DefaultComponent) => (
  <AsyncData
    data="done"
    // tslint:disable-next-line:jsx-no-lambda
    render={data => (data ? <DefaultComponent {...props} /> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />)}
  />
);

const bodyRender: ISlotRender<IHTMLSlot> = (props, DefaultComponent) => (
  <AsyncData
    data="done"
    // tslint:disable-next-line:jsx-no-lambda
    render={data => (
      <div style={{ border: '1px solid black' }}>
        <DefaultComponent {...props}>
          {data ? <Label>{props.children}</Label> : <Spinner styles={{ root: { alignItems: 'flex-start' } }} />}
        </DefaultComponent>
      </div>
    )}
  />
);

export class SlotsAsyncExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <CollapsibleSection
          key={1}
          defaultCollapsed={true}
          title={{
            styles: titleTextStyles,
            text: { children: 'Title Text' },
            slots: {
              text: {
                render: titleTextRender
              }
            }
          }}
          slots={{
            body: {
              render: bodyRender
            }
          }}
        >
          Data loaded
        </CollapsibleSection>
      </div>
    );
  }
}
