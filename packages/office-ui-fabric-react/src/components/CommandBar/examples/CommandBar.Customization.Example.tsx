import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { css, autobind, } from 'office-ui-fabric-react/lib/Utilities';
import styles = require('./CommandBar.Example.scss');
import { IContextualMenuItem } from '../../ContextualMenu';

export interface ISplitDropDownButtonState {
  isContextMenuShown: boolean;
}

export class CommandBarCustomizationExample extends React.Component<{}, ISplitDropDownButtonState> {
  private container: HTMLElement;

  constructor(props: {}) {
    super(props);
    this.state = { isContextMenuShown: false };
  }

  public render() {
    return (
      <div>
        <CommandBar
          isSearchBoxVisible={ false }
          items={
            [
              {
                key: 'new',
                name: 'Add',
                onRender: this._renderSplitButtonMenuItem,
                className: 'ms-CommandBarItem',
                subMenuProps: {
                  items: [
                    {
                      key: 'emailMessage',
                      name: 'Email message',
                      icon: 'Mail',
                      ['data-automation-id']: 'newEmailButton'
                    },
                    {
                      key: 'calendarEvent',
                      name: 'Calendar event',
                      icon: 'Calendar',
                      ['data-automation-id']: 'newCalendarButton'
                    }
                  ],
                },
              },
            ]
          }
        />
      </div>
    );
  }

  @autobind
  private _renderSplitButtonMenuItem(item: IContextualMenuItem) {
    let darkerBG = this.state.isContextMenuShown && styles.darkerBG;

    let dropDownButtonClass = css(
      styles.button,
      darkerBG
    );
    let mainBtnClassName = css(
      !item.name && ('ms-CommandBarItem--noName'),
      styles.button,
      darkerBG
    );

    return (
      <div>
        <div className={ css(
          styles.customButtonContainer,
          darkerBG
        ) } ref={ ref => this.container = ref! }>
          <CommandButton
            className={ mainBtnClassName }
            iconProps={ { iconName: 'Add' } }
            text='New' />
          <span className={ styles.splitter }>|</span>
          <CommandButton
            onClick={ this.onClickChevron }
            className={ dropDownButtonClass }
            menuProps={ {
              className: css('ms-CommandBar-menuHost'),
              items: item.subMenuProps!.items
            } } />
        </div>
      </div >
    );
  }

  @autobind
  private onClickChevron(ev: any) {
    ev.stopPropagation();
    this.toggleDropDownMenuShown(ev);
  }

  @autobind
  private toggleDropDownMenuShown(ev: any) {
    this.setState({
      isContextMenuShown: !this.state.isContextMenuShown
    });
  }
}
