import * as React from 'react';
import { FocusZone, FocusZoneDirection, KeyCodes, classNamesFunction } from 'office-ui-fabric-react';
import { ISubwayNavProps, ISubwayNavStyles } from './SubwayNav.types';
import { SubwayNavNodeState, ISubwayNavNodeProps } from './SubwayNode.types';
import { SubwayNode } from './SubwayNode';

const navInnerZone = (ev: React.KeyboardEvent<HTMLElement>): boolean => {
  return ev.which === KeyCodes.tab;
};

const getClassNames = classNamesFunction<{}, ISubwayNavStyles>();

export class SubwayNavBase extends React.PureComponent<ISubwayNavProps> {
  private _classNames: { [key in keyof ISubwayNavStyles]: string };

  public render(): JSX.Element {
    const { styles, onRenderSteps = this._onRenderSteps, steps, wizardComplete } = this.props;
    this._classNames = getClassNames(styles!, { steps, wizardComplete });
    return (
      <FocusZone
        as="ul"
        className={this._classNames.root}
        direction={FocusZoneDirection.vertical}
        isInnerZoneKeystroke={navInnerZone}
        isCircularNavigation={true}
      >
        {onRenderSteps(this.props)}
      </FocusZone>
    );
  }

  private _onRenderSteps = (props: ISubwayNavProps): JSX.Element[] => {
    let _currentIndex = 0;
    return props.steps.map((step: ISubwayNavNodeProps) => {
      const indexToUse = _currentIndex;
      _currentIndex =
        _currentIndex + 1 + (step.subSteps && step.state === SubwayNavNodeState.CurrentWithSubSteps ? step.subSteps.length : 0);
      return <SubwayNode {...step} key={step.id} index={indexToUse} />;
    });
  };
}
