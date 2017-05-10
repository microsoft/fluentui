import * as React from 'react';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import { css, autobind, } from 'office-ui-fabric-react/lib/Utilities';
import styles = require('./CommandBar.Example.scss');
import { ContextualMenu, IContextualMenuItem, DirectionalHint } from '../../ContextualMenu';

export interface ISplitDropDownButtonState {
  isContextMenuShown: boolean;
}

export class CommandBarCustomizationExample extends React.Component<any, ISplitDropDownButtonState> {
  private container: HTMLElement;

  constructor(props) {
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
    let leftIconClassNames = css(
      styles.icon,
      styles.themeDarkAltColor,
      'ms-Icon ms-Icon--Add',
      darkerBG);
    let dropDownIconClassNames = css(
      styles.icon,
      'ms-Icon ms-Icon--ChevronDown',
      darkerBG);
    let leftTextClassNames = css(
      styles.leftText,
      'ms-CommandBarItem-commandText',
      darkerBG);

    let containerClasName = css(
      styles.customButtonContainer,
      darkerBG
    );

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
        <div className={ containerClasName } ref={ ref => this.container = ref }>
          <DefaultButton
            key='mainButton'
            className={ mainBtnClassName }
            data-is-focusable={ true }>
            <span className={ leftIconClassNames } />
            <span className={ leftTextClassNames }>{ 'New' }</span>
          </DefaultButton>
          <span className={ styles.splitter }>|</span>
          <DefaultButton
            key='dropDownButton'
            onClick={ this.onClickChevron }
            className={ dropDownButtonClass }>
            <span
              className={ dropDownIconClassNames }
              data-is-focusable={ true } />
          </DefaultButton>
        </div>
        {
          this.state && this.state.isContextMenuShown &&
          <ContextualMenu
            isBeakVisible={ true }
            className={ css('ms-CommandBar-menuHost') }
            items={ item.subMenuProps.items }
            target={ this.container }
            directionalHint={ DirectionalHint.bottomAutoEdge }
            onDismiss={ this.toggleDropDownMenuShown } />
        }
      </div >
    );
  }

  @autobind
  private onClickChevron(ev) {
    ev.stopPropagation();
    this.toggleDropDownMenuShown(ev);
  }

  @autobind
  private toggleDropDownMenuShown(ev) {
    this.setState({
      isContextMenuShown: !this.state.isContextMenuShown
    });
  }
}
