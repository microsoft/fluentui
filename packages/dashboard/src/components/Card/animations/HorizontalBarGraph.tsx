import * as React from 'react';

import { getStyles, IHorizontalBarGraphStyles } from '../animations/HorizontalBarGraph.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IHorizontalBarGraph {}

const getClassNames = classNamesFunction<IHorizontalBarGraph, IHorizontalBarGraphStyles>();
const classNames = getClassNames(getStyles, {});

export class HorizontalBarGraph extends React.Component<IHorizontalBarGraph> {
  constructor(props: IHorizontalBarGraph) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={classNames.horizontalBarGraphLoading}>
        <div className={classNames.horizontalBarGraphLoadingBar}>
          <div className={classNames.horizontalBarGraphLoadingBarFirst} />
          <div className={classNames.horizontalBarGraphLoadingBarSecond} />
        </div>
      </div>
    );
  }
}
