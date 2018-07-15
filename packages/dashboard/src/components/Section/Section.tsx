import * as React from 'react';
import { ISectionProps, ISectionStyles } from './Section.types';
import { getStyles } from './Section.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { OverflowSet, IOverflowSetItemProps } from 'office-ui-fabric-react/lib/OverflowSet';

require('style-loader!css-loader!./Section.css');

export class Section extends React.PureComponent<
  ISectionProps,
  {
    expanded: boolean;
  }
> {
  constructor(props: ISectionProps) {
    super(props);
    this.state = {
      expanded: true
    };
  }
  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ISectionProps, ISectionStyles>();
    const classNames = getClassNames(getStyles!);

    return (
      <div onMouseDown={this._onMouseDown} className={classNames.root}>
        {this.props.title}
        <div className={classNames.actions}>
          <IconButton
            menuIconProps={{ iconName: this.state.expanded ? 'ChevronUpSmall' : 'ChevronDownSmall' }}
            onClick={this._onCollapseExpandToggled}
            className={classNames.actionButton}
          />
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
  };

  private _onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };
}
