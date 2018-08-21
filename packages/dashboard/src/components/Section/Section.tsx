import * as React from 'react';
import { ISectionProps, ISectionStyles, ISectionState } from './Section.types';
import { getStyles } from './Section.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';

export class Section extends React.PureComponent<ISectionProps, ISectionState> {
  constructor(props: ISectionProps) {
    super(props);
    this.state = {
      expanded: true
    };
  }
  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISectionProps, ISectionStyles>();
    const classNames = getClassNames(getStyles!);

    /* In order to use this within RGL, it needs to have style and className props */
    // tslint:disable:jsx-ban-props
    return (
      <div
        onMouseDown={this._onMouseDown}
        className={'widget-number ' + this.props.className + ' ' + classNames.root}
        key={this.props.id}
        style={this.props.style}
      >
        {this.props.title}
        <div className={classNames.actions}>
          {this.props.onCollapseExpand !== null &&
            this.props.onCollapseExpand !== undefined && (
              <IconButton
                menuIconProps={{ iconName: this.state.expanded ? 'ChevronDownSmall' : 'ChevronUpSmall' }}
                onClick={this._onCollapseExpandToggled}
                className={classNames.actionButton}
              />
            )}
          <OverflowSet
            overflowItems={this._getOverflowSetOptions()}
            onRenderOverflowButton={this._onRenderOverflowButton}
            onRenderItem={this._onRenderItem}
            className={classNames.actionButton}
          />
        </div>
      </div>
    );
  }

  private _getOverflowSetOptions = () => {
    if (this.props.removeTitle) {
      const dropDownOptions: IOverflowSetItemProps[] = [];
      const dropDownOption: IOverflowSetItemProps = {
        key: '0',
        name: this.props.removeTitle,
        title: this.props.removeTitle
      };
      dropDownOptions.push(dropDownOption);
      return dropDownOptions;
    }
  };

  private _onRenderItem(item: IOverflowSetItemProps): JSX.Element {
    return (
      <IconButton
        menuIconProps={{ iconName: item.icon }}
        onClick={item.onClick}
        title={item.title}
        ariaLabel={item.ariaLabel}
      />
    );
  }

  private _onRenderOverflowButton(overflowItems: IOverflowSetItemProps[] | undefined): JSX.Element {
    return <IconButton menuIconProps={{ iconName: 'More' }} menuProps={{ items: overflowItems! }} />;
  }

  private _onCollapseExpandToggled = () => {
    this.setState({
      expanded: !this.state.expanded
    });
    if (this.props.onCollapseExpand) {
      this.props.onCollapseExpand(this.state.expanded, this.props.id);
    }
  };

  private _onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
}
