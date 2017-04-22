/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
/* tslint:enable:no-unused-variable */

import * as ReactTestUtils from 'react-addons-test-utils';
import { KeyCodes } from '../../Utilities';
import { DocumentTitleBar } from './DocumentTitleBar';

const { expect } = chai;
const DocumentTitleBarButtonClassSelector = '.ms-DocumentTitleBar-button';
const DocumentTitleBarStatusTextClassSelector = '.statusText';
const MenuItemIndexRename = 0;
const MenuItemIndexSavedLocation = 3;
const MenuItemIndexVersions = 5;

describe('DocumentTitleBar', () => {

  afterEach(() => {
    for (let i = 0; i < document.body.children.length; i++) {
      if (document.body.children[i].tagName === 'DIV') {
        document.body.removeChild(document.body.children[i]);
        i--;
      }
    }
  });

  it('should display title in the bar', () => {
    const container = document.createElement('div');

    ReactDOM.render(
      <DocumentTitleBar
        title='hello'
        statusText=''
        filePath=''
        hasVersions={ true } />,
      container
    );

    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    const statusTextElement = docTitleBarButton.querySelector(DocumentTitleBarStatusTextClassSelector);
    const titleNode = docTitleBarButton.childNodes[1];

    expect(titleNode.nodeValue).to.equal('hello');
    expect(statusTextElement).to.not.exist;
  });

  it('should display title and status text in the bar', () => {
    const container = document.createElement('div');

    ReactDOM.render(
      <DocumentTitleBar
        title='hello'
        statusText='world'
        filePath=''
        hasVersions={ true } />,
      container
    );

    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    const titleNode = docTitleBarButton.childNodes[1];
    const statusTextElement = docTitleBarButton.querySelector(DocumentTitleBarStatusTextClassSelector);
    const statusTextNode = statusTextElement.childNodes[4];

    expect(titleNode.nodeValue).to.equal('hello');
    expect(statusTextNode.nodeValue).to.equal('world');
  });

  it('should populate contextual menu items correctly', () => {
    const container = document.createElement('div');

    ReactDOM.render(
      <DocumentTitleBar
        title='Document'
        statusText='Saved'
        filePath='OneDrive > Documents'
        hasVersions={ true } />,
      container
    );

    // Open the contextual menu by clicking the bar
    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    ReactTestUtils.Simulate.click(docTitleBarButton);
    const contextualMenuList = document.querySelector('.ms-ContextualMenu-list');
    expect(contextualMenuList).to.exist;

    const getMenuItemNameForIndex = (index: number) => {
      return contextualMenuList.childNodes[index].firstChild.attributes.getNamedItem('name').value;
    };

    // Verify each menu item
    expect(getMenuItemNameForIndex(MenuItemIndexRename)).to.equal('Rename');
    expect(getMenuItemNameForIndex(MenuItemIndexSavedLocation)).to.equal('OneDrive > Documents');
    expect(getMenuItemNameForIndex(MenuItemIndexVersions)).to.equal('Versions');
  });

  it('should populate current title text in the Rename text field and rename properly', () => {
    const container = document.createElement('div');
    const initialDocumentName = 'Document';
    const newDocumentName = 'Nice';
    let newDocumentNameToTest;

    const onRename = (newName: string) => {
      newDocumentNameToTest = newName;
    };

    ReactDOM.render(
      <DocumentTitleBar
        title={ initialDocumentName }
        statusText='Saved'
        filePath='OneDrive > Documents'
        hasVersions={ true }
        onRenameDocument={ onRename } />,
      container
    );

    // Open the contextual menu by clicking the bar
    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    ReactTestUtils.Simulate.click(docTitleBarButton);
    const contextualMenuList = document.querySelector('.ms-ContextualMenu-list');
    expect(contextualMenuList).to.exist;

    // Find the Rename menu item and click it
    const renameItem = contextualMenuList.childNodes[MenuItemIndexRename].firstChild as HTMLButtonElement;
    ReactTestUtils.Simulate.click(renameItem);
    const docTitleRenameTextField = container.querySelector('.ms-DocumentTitleBar-renameDiv .textField') as HTMLInputElement;

    // Verify that the input field prepopulates the current document title
    expect(docTitleRenameTextField.value).to.equal(initialDocumentName);

    // Now try to rename
    docTitleRenameTextField.value = newDocumentName;
    ReactTestUtils.Simulate.blur(docTitleRenameTextField);
    expect(newDocumentNameToTest).to.equal(newDocumentName);
  });

  it('should invoke Saved Location callback', () => {
    const container = document.createElement('div');
    let hasInvokedSavedLocationCallback = false;

    const onClickSavedLocation = () => {
      hasInvokedSavedLocationCallback = true;
    };

    ReactDOM.render(
      <DocumentTitleBar
        title='Document'
        statusText='Saved'
        filePath='OneDrive > Documents'
        hasVersions={ true }
        onClickSavedLocationMenuItem={ onClickSavedLocation } />,
      container
    );

    // Open the contextual menu by clicking the bar
    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    ReactTestUtils.Simulate.click(docTitleBarButton);
    const contextualMenuList = document.querySelector('.ms-ContextualMenu-list');
    expect(contextualMenuList).to.exist;

    // Verify clicking Saved Location
    const savedLocationItem = contextualMenuList.childNodes[MenuItemIndexSavedLocation].firstChild as HTMLButtonElement;
    ReactTestUtils.Simulate.click(savedLocationItem);
    expect(hasInvokedSavedLocationCallback).is.true;
  });

  it('should invoke Versions callback', () => {
    const container = document.createElement('div');
    let hasInvokedVersionsCallback = false;

    const onClickVersions = () => {
      hasInvokedVersionsCallback = true;
    };

    ReactDOM.render(
      <DocumentTitleBar
        title='Document'
        statusText='Saved'
        filePath='OneDrive > Documents'
        hasVersions={ true }
        onClickVersionsMenuItem={ onClickVersions } />,
      container
    );

    // Open the contextual menu by clicking the bar
    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    ReactTestUtils.Simulate.click(docTitleBarButton);
    const contextualMenuList = document.querySelector('.ms-ContextualMenu-list');
    expect(contextualMenuList).to.exist;

    // Verify clicking Versions
    const versionsItem = contextualMenuList.childNodes[MenuItemIndexVersions].firstChild as HTMLButtonElement;
    ReactTestUtils.Simulate.click(versionsItem);
    expect(hasInvokedVersionsCallback).is.true;
  });

  it('should not rename if the user presses the Escape key', () => {
    const container = document.createElement('div');
    let isRenameCallbackInvoked = false;

    const onRename = (newName: string) => {
      isRenameCallbackInvoked = true;
    };

    ReactDOM.render(
      <DocumentTitleBar
        title='Test'
        statusText='Saved'
        filePath='OneDrive > Documents'
        hasVersions={ true }
        onRenameDocument={ onRename } />,
      container
    );

    // Open the contextual menu by clicking the bar
    const docTitleBarButton = container.querySelector(DocumentTitleBarButtonClassSelector);
    ReactTestUtils.Simulate.click(docTitleBarButton);
    const contextualMenuList = document.querySelector('.ms-ContextualMenu-list');
    expect(contextualMenuList).to.exist;

    // Find the Rename menu item and click it
    const renameItem = contextualMenuList.childNodes[MenuItemIndexRename].firstChild as HTMLButtonElement;
    ReactTestUtils.Simulate.click(renameItem);
    const docTitleRenameTextField = container.querySelector('.ms-DocumentTitleBar-renameDiv .textField') as HTMLInputElement;

    // Cancel out Rename by pressing the Escape key
    ReactTestUtils.Simulate.keyDown(docTitleRenameTextField, { which: KeyCodes.escape });
    expect(isRenameCallbackInvoked).is.false;
  });

});