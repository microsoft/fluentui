import * as React from 'react';
import { Coachmark, COACHMARK_ATTRIBUTE_NAME } from '../Coachmark';
import { TeachingBubbleContent } from 'office-ui-fabric-react/lib/TeachingBubble';
import { ICalloutProps } from 'office-ui-fabric-react/lib/Callout';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { DirectionalHint } from 'office-ui-fabric-react/lib/common/DirectionalHint';

import { CommandBar } from 'office-ui-fabric-react/lib/CommandBar';
import {
  IContextualMenuItem
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { IStyle } from '../../../Styling';
import {
  BaseComponent,
  classNamesFunction,
  createRef
} from 'office-ui-fabric-react/lib/Utilities';

export interface ICoachmarkBasicExampleState {
  isCBTargetVisible?: boolean;
  isTargetVisible?: boolean;
  isCoachmarkCollapsed?: boolean;
  targetElement?: HTMLElement;
  showPanel?: boolean;
}

export interface ICoachmarkBasicExampleStyles {
  /**
   * Style for the root element in the default enabled/unchecked state.
   */
  root?: IStyle;

  /**
   * The example button container
   */
  buttonContainer: IStyle;
}

export class CoachmarkBasicExample extends BaseComponent<{}, ICoachmarkBasicExampleState> {

  private _targetButton = createRef<HTMLDivElement>();
  private _filteredItems: IContextualMenuItem[] = [
    {
      key: 'newItem',
      name: 'New',
      icon: 'Add',
      ariaLabel: 'New. Use left and right arrow keys to navigate',
      ['data-automation-id']: 'newItemMenu',
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
            icon: 'Calendar'
          }
        ],
      },
    },
    {
      key: 'upload',
      name: 'Upload',
      icon: 'Upload',
      href: 'https://microsoft.com',
      ['data-automation-id']: 'uploadButton'
    },
    {
      key: 'share',
      name: 'Share',
      icon: 'Share',
      onClick: () => { return; }
    },
    {
      key: 'download',
      name: 'Download',
      icon: 'Download',
      [COACHMARK_ATTRIBUTE_NAME]: 'testing',
      onClick: () => this._onShowMenuClicked()
    },
    {
      key: 'link',
      name: 'Link',
      icon: 'WindowsLogo',
    }
  ];

  public constructor(props: {}) {
    super(props);

    this._onShowMenuClicked = this._onShowMenuClicked.bind(this);
    this._onShowMenuClickedBasic = this._onShowMenuClickedBasic.bind(this);
    this._onCalloutDismiss = this._onCalloutDismiss.bind(this);
    this._onDismiss = this._onDismiss.bind(this);

    this.state = {
      isCBTargetVisible: false,
      isTargetVisible: false,
      isCoachmarkCollapsed: true,
      showPanel: false
    };
  }

  public render(): JSX.Element {
    const { isCBTargetVisible, isTargetVisible } = this.state;

    const calloutProps: ICalloutProps = {
      doNotLayer: true
    };

    const getClassNames = classNamesFunction<{}, ICoachmarkBasicExampleStyles>();
    const classNames = getClassNames(() => {
      return {
        root: {
          padding: '20px 0'
        },
        buttonContainer: {
          display: 'inline-block'
        }
      };
    });

    const buttonProps: IButtonProps = {
      text: 'Try it'
    };

    return (
      <div className={ classNames.root }>
        <div
          className={ classNames.buttonContainer }
          ref={ this._targetButton }
        >
          <DefaultButton
            onClick={ this._onShowMenuClickedBasic }
            text={ isTargetVisible ? 'Hide Coachmark' : 'Show Coachmark' }
          />
        </div>

        <DefaultButton
          description='Opens the Sample Panel'
          onClick={ this._onShowPanel }
          text='Open Panel'
        />
        <Panel
          isOpen={ this.state.showPanel }
          type={ PanelType.smallFixedFar }
          onDismiss={ this._onClosePanel }
          headerText='Panel - Small, right-aligned, fixed, with footer'
          closeButtonAriaLabel='Close'
          onRenderFooterContent={ this._onRenderFooterContent }
        >
          <ChoiceGroup
            options={ [
              {
                key: 'A',
                text: 'Option A'
              },
              {
                key: 'B',
                text: 'Option B',
                checked: true
              },
              {
                key: 'C',
                text: 'Option C',
                disabled: true
              },
              {
                key: 'D',
                text: 'Option D',
                checked: true,
                disabled: true
              }
            ] }
            label='Pick one'
            required={ true }
          />
        </Panel>

        <div>
          <CommandBar
            searchPlaceholderText='Search...'
            elipisisAriaLabel='More options'
            items={ this._filteredItems }
          />
        </div>

        { isTargetVisible && (
          <Coachmark
            target={ this._targetButton.current }
            positioningContainerProps={ {
              directionalHint: DirectionalHint.topAutoEdge
            } }
          >
            <TeachingBubbleContent
              headline='Example Title'
              calloutProps={ calloutProps }
              hasCloseIcon={ true }
            >
              Welcome to the land of coachmarks
            </TeachingBubbleContent>
          </Coachmark>
        ) }

        { isCBTargetVisible && (
          <Coachmark
            target={ '[data-coachmarkid="testing"]' }
            positioningContainerProps={ {
              directionalHint: DirectionalHint.topRightEdge
            } }
          >
            {
              <TeachingBubbleContent
                headline={ 'Need help tracking deadlines?' }
                calloutProps={ calloutProps }
                hasCloseIcon={ true }
                closeButtonAriaLabel='Close'
                onDismiss={ this._onDismiss }
                primaryButtonProps={ buttonProps }
              >
                test
              </TeachingBubbleContent>
            }
          </Coachmark>
        ) }
      </div>
    );
  }

  private _onDismiss(): void {
    this.setState({
      isCBTargetVisible: false
    });
  }

  private _onShowMenuClickedBasic(): void {
    this.setState({
      isTargetVisible: !this.state.isTargetVisible
    });
  }

  private _onShowMenuClicked(): void {
    this.setState({
      isCBTargetVisible: !this.state.isCBTargetVisible
    });
  }

  private _onCalloutDismiss(): void {
    this.setState({
      isCBTargetVisible: false
    });
  }

  private _onShowPanel = (): void => {
    this.setState({ showPanel: true });
  }

  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div>
        <DefaultButton
          onClick={ this._onClosePanel }
          style={ { 'marginRight': '8px' } }
        >
          Save
        </DefaultButton>
        <DefaultButton
          onClick={ this._onClosePanel }
        >
          Cancel
        </DefaultButton>
      </div>
    );
  }

  private _onClosePanel = (): void => {
    this.setState({ showPanel: false });
  }
}