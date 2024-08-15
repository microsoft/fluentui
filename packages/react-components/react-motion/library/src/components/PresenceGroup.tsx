import * as React from 'react';

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
  ) {
    const nextChildMapping = getChildMapping(nextProps.children);

    return {
      childMapping: firstRender ? nextChildMapping : getNextChildMapping(prevChildMapping, nextChildMapping),
      firstRender: false,
    };
  }

  constructor(props: PresenceGroupProps, context: unknown) {
    super(props, context);

    this.state = {
      childMapping: {},
      firstRender: true,
    };
  }

  private handleExit = (childKey: string) => {
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

  componentDidMount() {
    this.mounted = true;
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
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
