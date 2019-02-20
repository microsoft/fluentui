import * as React from 'react';
import { getIcon, IIconRecord, classNamesFunction, FocusZone, IProcessedStyleSet } from 'office-ui-fabric-react';
import { ISubwayNavNodeProps, SubwayNavNodeState, ISubwayNavNodeStyleProps, ISubwayNavNodeStyles } from './SubwayNode.types';
import { getIconMap } from './SubwayNode.styles';
import { SubwayNode } from './SubwayNode';

const getClassNames = classNamesFunction<ISubwayNavNodeStyleProps, ISubwayNavNodeStyles>();

export class SubwayNodeBase extends React.PureComponent<ISubwayNavNodeProps> {
  public static defaultProps = {
    state: SubwayNavNodeState.Current,
    isSubStep: false,
    disabled: false
  };

  private _classNames: IProcessedStyleSet<ISubwayNavNodeStyles>;

  public constructor(props: ISubwayNavNodeProps) {
    super(props);
    this._onClickStep = this._onClickStep.bind(this);
  }

  public render(): JSX.Element {
    const {
      styles,
      isSubStep,
      disabled,
      state,
      subSteps,
      index,
      onRenderSubSteps = this._onRenderSubSteps,
      onRenderStepIcon = this._onRenderStepIcon
    } = this.props;

    const iconRecord: IIconRecord | undefined = getIcon(getIconMap(this.props.isSubStep!)[this.props.state]);

    this._classNames = getClassNames(styles!, {
      isSubStep: isSubStep!,
      disabled: disabled!,
      state,
      iconRecord: iconRecord!,
      hasSubSteps: subSteps ? subSteps.length > 0 : false,
      index: index!
    });

    return (
      <li className={this._classNames.root} data-is-focusable={!this.props.disabled}>
        <div className={this._classNames.flexContainer} {...!this.props.disabled && { onClick: this._onClickStep }}>
          {onRenderStepIcon(this.props, this._classNames, iconRecord)}
          <div className={this._classNames.spacer} />
          <div className={this._classNames.label}>{this.props.label}</div>
          <div className={this._classNames.labelSelected}>{this.props.label}</div>
        </div>
        {onRenderSubSteps(this.props, this._classNames)}
      </li>
    );
  }

  private _onClickStep(): void {
    this.props.onClickStep && this.props.onClickStep(this.props);
  }

  private _onRenderSubSteps(props: ISubwayNavNodeProps, classNames: IProcessedStyleSet<ISubwayNavNodeStyles>): JSX.Element | null {
    return props.subSteps && props.state === SubwayNavNodeState.CurrentWithSubSteps ? (
      <FocusZone elementType="ul" isCircularNavigation={true} className={classNames.subStepContainer} allowFocusRoot>
        {props.subSteps.map((item: ISubwayNavNodeProps, index: number) => {
          return <SubwayNode {...item} key={item.id} parentId={props.id} isSubStep={true} index={index + props.index! + 1} />;
        })}
      </FocusZone>
    ) : null;
  }

  private _onRenderStepIcon(
    props: ISubwayNavNodeProps,
    classNames: IProcessedStyleSet<ISubwayNavNodeStyles>,
    iconRecord: IIconRecord | undefined
  ): JSX.Element {
    const strokeRadius = props.isSubStep ? '18%' : '43%';
    return (
      <svg viewBox="0 0 16 16" className={classNames.iconContainer} xmlns="http://www.w3.org/2000/svg">
        {iconRecord && (
          <text x="50%" y="50%" dy="0.5em" textAnchor="middle" className={classNames.icon}>
            {iconRecord.code}
          </text>
        )}
        <circle r={strokeRadius} cx="50%" cy="50%" className={classNames.iconRing} />
      </svg>
    );
  }
}
