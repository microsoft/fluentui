import * as React from 'react';

import { getStyles, IBarGraphStyles } from './BarGraph.style';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export interface IBarGraphProps {}

const getClassNames = classNamesFunction<IBarGraphProps, IBarGraphStyles>();
const classNames = getClassNames(getStyles, {});

export class BarGraph extends React.Component<IBarGraphProps> {
  constructor(props: IBarGraphProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div className={classNames.barGraphLoading}>
        <div className={classNames.barGraphLoadingBar}>
          <div className={classNames.barGraphLoadingBarFirst} />
          <div className={classNames.barGraphLoadingBarSecond} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={classNames.barGraphLoadingBarFirst} />
          <div className={classNames.barGraphLoadingBarSecond} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={classNames.barGraphLoadingBarFirst} />
          <div className={classNames.barGraphLoadingBarSecond} />
        </div>
        <div className={classNames.barGraphLoadingBar}>
          <div className={classNames.barGraphLoadingBarFirst} />
          <div className={classNames.barGraphLoadingBarSecond} />
        </div>
      </div>
    );
  }
}
