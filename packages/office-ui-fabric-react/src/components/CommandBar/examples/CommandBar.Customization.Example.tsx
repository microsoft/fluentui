import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as styles from './CommandBar.Example.scss';
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

  public render(): JSX.Element {
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

  private _renderSplitButtonMenuItem = (item: IContextualMenuItem): JSX.Element => {
    const darkerBG = this.state.isContextMenuShown && styles.darkerBG;

    const dropDownButtonClass = css(
      styles.button,
      darkerBG
    );
    const mainBtnClassName = css(
      !item.name && ('ms-CommandBarItem--noName'),
      styles.button,
      darkerBG
    );

    return (
      <div>
        <div
          className={ css(
            styles.customButtonContainer,
            darkerBG
          ) }
          ref={ ref => this.container = ref! }
        >
          <CommandButton
            className={ mainBtnClassName }
            iconProps={ { iconName: 'Add' } }
            text='New'
          />
          <span className={ styles.splitter }>|</span>
          <CommandButton
            onClick={ this._onClickChevron }
            className={ dropDownButtonClass }
            menuProps={ {
              className: css('ms-CommandBar-menuHost'),
              items: item.subMenuProps!.items
            } }
          />
        </div>
      </div >
    );
  }

  private _onClickChevron = (ev: any): void => {
    ev.stopPropagation();
    this._toggleDropDownMenuShown(ev);
  }

  private _toggleDropDownMenuShown = (ev: any): void => {
    this.setState({
      isContextMenuShown: !this.state.isContextMenuShown
    });
  }
}
