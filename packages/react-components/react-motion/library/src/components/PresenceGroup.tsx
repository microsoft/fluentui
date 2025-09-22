import * as React from 'react';
import type { JSXElement } from '@fluentui/react-utilities';
import { getNextChildMapping } from '../utils/groups/getNextChildMapping';
import { getChildMapping } from '../utils/groups/getChildMapping';
import type { PresenceGroupChildMapping } from '../utils/groups/types';
import { PresenceGroupItemProvider } from './PresenceGroupItemProvider';

type PresenceGroupProps = {
  children: React.ReactNode;
};

type PresenceGroupState = {
  childMapping: PresenceGroupChildMapping;
  firstRender: boolean;
};

/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */

export class PresenceGroup extends React.Component<PresenceGroupProps, PresenceGroupState> {
  private mounted: boolean = false;

  static getDerivedStateFromProps(
    nextProps: PresenceGroupProps,
    { childMapping: prevChildMapping, firstRender }: PresenceGroupState,
  ): PresenceGroupState {
    const nextChildMapping = getChildMapping(nextProps.children);

    return {
      childMapping: firstRender ? nextChildMapping : getNextChildMapping(prevChildMapping, nextChildMapping),
      firstRender: false,
    };
  }

  constructor(props: PresenceGroupProps, context?: unknown) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore - React.Component constructor has only one argument in React 19
    super(props, context); // eslint-disable-line @typescript-eslint/no-deprecated

    this.state = {
      childMapping: {},
      firstRender: true,
    };
  }

  private handleExit = (childKey: string): void => {
    const currentChildMapping = getChildMapping(this.props.children);

    if (childKey in currentChildMapping) {
      return;
    }

    if (this.mounted) {
      this.setState(state => {
        const childMapping = { ...state.childMapping };
        delete childMapping[childKey];

        return { childMapping };
      });
    }
  };

  componentDidMount(): void {
    this.mounted = true;
  }

  componentWillUnmount(): void {
    this.mounted = false;
  }
  render(): JSXElement {
    return (
      <>
        {Object.entries(this.state.childMapping).map(([childKey, childProps]) => (
          <PresenceGroupItemProvider {...childProps} childKey={childKey} key={childKey} onExit={this.handleExit}>
            {childProps.element}
          </PresenceGroupItemProvider>
        ))}
      </>
    );
  }
}
