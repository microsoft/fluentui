import * as React from 'react';
import { Reducer, useImmerReducer } from 'use-immer';
import { JSONTreeElement } from '../components/types';
import { ComponentInfo } from '../componentInfo/types';
import { debug, focusTreeTitle, getDefaultJSONTree } from './utils';
import {
  jsonTreeFindElement,
  resolveDrop,
  jsonTreeCloneElement,
  jsonTreeDeleteElement,
  jsonTreeFindParent,
  renderJSONTreeToJSXElement,
  resolveDraggingElement,
} from '../config';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { readTreeFromStore, readTreeFromURL } from '../utils/treeStore';
import { renderElementToJSX } from '../../../docs-components/src/index';
import { AccessibilityError } from '../accessibility/types';

export type JSONTreeOrigin = 'store' | 'url';

export type DesignerState = {
  draggingElement: JSONTreeElement;
  jsonTree: JSONTreeElement;
  jsonTreeOrigin: JSONTreeOrigin;
  selectedComponentInfo: ComponentInfo; // FIXME: should be computed in render?
  selectedJSONTreeElementUuid: JSONTreeElement['uuid'];
  enabledVirtualCursor: boolean;
  showCode: boolean;
  activeTab: string | null;
  code: string | null; // only valid if showCode is set to true
  codeError: string | null;
  history: Array<JSONTreeElement>;
  redo: Array<JSONTreeElement>;
  insertComponent: { uuid: string; where: string; parentUuid?: string };
  accessibilityErrors: Array<AccessibilityError>;
};

export type DesignerAction =
  | { type: 'DRAG_START'; component: JSONTreeElement }
  | { type: 'DRAG_ABORT' }
  | { type: 'DRAG_DROP'; dropParent: JSONTreeElement; dropIndex: number }
  | { type: 'DRAG_CLONE' }
  | { type: 'DRAG_MOVE' }
  | { type: 'SELECT_COMPONENT'; component: JSONTreeElement }
  | { type: 'SELECT_PARENT' }
  | { type: 'DELETE_SELECTED_COMPONENT' }
  | { type: 'PROP_CHANGE'; component: JSONTreeElement; propName: string; propValue: any }
  | { type: 'PROP_DELETE'; component: JSONTreeElement; propName: string }
  | { type: 'ENABLE_VIRTUAL_CURSOR'; enabledVirtualCursor: boolean }
  | { type: 'SWITCH_TO_STORE' }
  | { type: 'RESET_STORE' }
  | { type: 'SHOW_CODE'; show: boolean }
  | { type: 'SWITCH_TAB'; tab: string }
  | { type: 'SOURCE_CODE_CHANGE'; code: string; jsonTree: JSONTreeElement }
  | { type: 'SOURCE_CODE_ERROR'; code: string; error: string }
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'OPEN_ADD_DIALOG'; uuid: string; where: string; parent?: string }
  | { type: 'CLOSE_ADD_DIALOG' }
  | { type: 'DESIGNER_LOADED'; accessibilityErrors: AccessibilityError[] }
  | { type: 'ADD_COMPONENT'; component: string; module: string }
  | { type: 'PROP_UPDATED'; component: JSONTreeElement; componentAccessibilityErrors: AccessibilityError[] };

export const stateReducer: Reducer<DesignerState, DesignerAction> = (draftState, action) => {
  let treeChanged = false;
  debug(`type: ${action.type}`);

  switch (action.type) {
    case 'DRAG_START':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      draftState.draggingElement = action.component;
      break;

    case 'DRAG_ABORT':
      draftState.history.pop();

      draftState.draggingElement = null;
      break;

    case 'DRAG_DROP':
      if (action.dropParent) {
        const dropParent = jsonTreeFindElement(draftState.jsonTree, action.dropParent.uuid);
        resolveDrop(draftState.draggingElement, dropParent, action.dropIndex);
        treeChanged = true;
      }

      const addedComponent = jsonTreeFindElement(draftState.jsonTree, draftState.draggingElement.uuid);

      draftState.draggingElement = null;
      if (addedComponent) {
        draftState.selectedJSONTreeElementUuid = addedComponent.uuid;
        draftState.selectedComponentInfo = componentInfoContext.byDisplayName[addedComponent.displayName];
      }
      break;

    case 'DRAG_CLONE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      draftState.draggingElement = jsonTreeCloneElement(
        draftState.jsonTree,
        jsonTreeFindElement(draftState.jsonTree, draftState.selectedJSONTreeElementUuid),
        false,
      );

      cloneAccessibiltyErrorsForElement(
        draftState,
        draftState.selectedJSONTreeElementUuid,
        draftState.draggingElement.uuid,
      );
      break;

    case 'DRAG_MOVE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      draftState.draggingElement = jsonTreeCloneElement(
        draftState.jsonTree,
        jsonTreeFindElement(draftState.jsonTree, draftState.selectedJSONTreeElementUuid),
        true,
      );
      jsonTreeDeleteElement(draftState.jsonTree, draftState.selectedJSONTreeElementUuid);
      treeChanged = true;
      break;

    case 'SELECT_COMPONENT':
      if (action.component && draftState.selectedJSONTreeElementUuid !== action.component.uuid) {
        draftState.selectedJSONTreeElementUuid = action.component.uuid;
        draftState.selectedComponentInfo = componentInfoContext.byDisplayName[action.component.displayName];
      } else {
        draftState.selectedJSONTreeElementUuid = null;
        draftState.selectedComponentInfo = null;
      }
      break;

    case 'SELECT_PARENT':
      const parent = jsonTreeFindParent(draftState.jsonTree, draftState.selectedJSONTreeElementUuid);
      if (parent) {
        draftState.selectedJSONTreeElementUuid = parent.uuid;
        draftState.selectedComponentInfo = componentInfoContext.byDisplayName[parent.displayName];
      }
      break;

    case 'DELETE_SELECTED_COMPONENT':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      if (draftState.selectedJSONTreeElementUuid) {
        jsonTreeDeleteElement(draftState.jsonTree, draftState.selectedJSONTreeElementUuid);
        deleteAccessibilityErrorsForElement(draftState, draftState.selectedJSONTreeElementUuid);

        draftState.selectedJSONTreeElementUuid = null;
        draftState.selectedComponentInfo = null;
        treeChanged = true;
      }
      break;

    case 'PROP_CHANGE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      const editedComponent = jsonTreeFindElement(draftState.jsonTree, action.component.uuid);
      if (editedComponent) {
        if (!editedComponent.props) {
          editedComponent.props = {};
        }
        editedComponent.props[action.propName] = action.propValue;
        treeChanged = true;
      }
      break;

    case 'PROP_DELETE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      const component = jsonTreeFindElement(draftState.jsonTree, action.component.uuid);
      if (component) {
        if (!component.props) {
          component.props = {};
        }
        delete component.props[action.propName];
        treeChanged = true;
      }

      break;

    case 'ENABLE_VIRTUAL_CURSOR':
      draftState.enabledVirtualCursor = action.enabledVirtualCursor;
      break;

    case 'SWITCH_TO_STORE':
      draftState.jsonTree = readTreeFromStore() || getDefaultJSONTree();
      draftState.jsonTreeOrigin = 'store';
      treeChanged = true;
      break;

    case 'RESET_STORE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      draftState.jsonTree = getDefaultJSONTree();
      draftState.jsonTreeOrigin = 'store';
      draftState.accessibilityErrors = [];
      treeChanged = true;
      break;

    case 'SHOW_CODE':
      try {
        draftState.showCode = action.show;
        draftState.code = action.show ? renderElementToJSX(renderJSONTreeToJSXElement(draftState.jsonTree)) : null;
      } catch (e) {
        console.error('Failed to convert tree to code.', e.toString());
      }
      break;

    case 'SWITCH_TAB':
      draftState.activeTab = action.tab;
      break;

    case 'SOURCE_CODE_CHANGE':
      draftState.code = action.code;
      draftState.selectedJSONTreeElementUuid = null;
      draftState.selectedComponentInfo = null;
      draftState.jsonTree = action.jsonTree;
      draftState.codeError = null;

      break;

    case 'SOURCE_CODE_ERROR':
      draftState.code = action.code;
      draftState.selectedJSONTreeElementUuid = null;
      draftState.selectedComponentInfo = null;
      draftState.codeError = action.error;
      break;

    case 'UNDO':
      if (draftState.history.length > 0) {
        draftState.redo.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
        draftState.jsonTree = draftState.history.pop();
      }
      break;

    case 'REDO':
      if (draftState.redo.length > 0) {
        draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
        draftState.jsonTree = draftState.redo.pop();
      }
      break;

    case 'OPEN_ADD_DIALOG': {
      const parent = jsonTreeFindParent(draftState.jsonTree, action.uuid);
      draftState.insertComponent = { where: action.where, uuid: action.uuid, parentUuid: `${parent?.uuid}` };
      break;
    }

    case 'CLOSE_ADD_DIALOG':
      draftState.insertComponent = null;
      break;

    case 'ADD_COMPONENT': {
      const element = resolveDraggingElement(action.component, action.module);
      let parent: JSONTreeElement = undefined;
      let index = 0;
      const { where, uuid, parentUuid } = draftState.insertComponent;
      draftState.insertComponent = null;

      if (where === 'first') {
        parent = draftState.jsonTree;
      } else if (where === 'child') {
        parent = jsonTreeFindElement(draftState.jsonTree, uuid);
      } else {
        parent = jsonTreeFindElement(draftState.jsonTree, parentUuid);
        index = parent.props.children.findIndex(c => c['uuid'] === uuid);
        if (index === -1) {
          index = 0;
        } else {
          where === 'after' && index++;
        }
      }

      resolveDrop(element, parent, index);

      draftState.selectedJSONTreeElementUuid = element.uuid;
      draftState.selectedComponentInfo = componentInfoContext.byDisplayName[element.displayName];
      treeChanged = true;
      setTimeout(() => focusTreeTitle(element.uuid));
      break;
    }

    case 'PROP_UPDATED': {
      deleteAccessibilityErrorsForElement(draftState, draftState.selectedJSONTreeElementUuid);
      // add the accesibility errors for the component
      draftState.accessibilityErrors = draftState.accessibilityErrors.concat(action.componentAccessibilityErrors);
      break;
    }

    case 'DESIGNER_LOADED': {
      draftState.accessibilityErrors = action.accessibilityErrors;
      break;
    }

    default:
      throw new Error(`Invalid action ${action}`);
  }

  if (treeChanged && draftState.showCode) {
    draftState.code = renderElementToJSX(renderJSONTreeToJSXElement(draftState.jsonTree));
    draftState.codeError = null;
  }

  console.log(`Completed action: ${action.type}`);
};

function deleteAccessibilityErrorsForElement(draftState, componentUuid) {
  if (draftState.accessibilityErrors) {
    // if accessibility errors already exist, remove any accessibility errors for the component
    draftState.accessibilityErrors = draftState.accessibilityErrors.filter(
      error => error.elementUuid !== componentUuid,
    );
  }
}

function cloneAccessibiltyErrorsForElement(draftState, originalComponentUuid, newComponentUuid) {
  if (draftState.accessibilityErrors) {
    // find any elements which match the original componentUuid and replace their element UUID accordingly
    // todo: add key values to accessibility error array
    const accessibilityErrorsForNewElement = draftState.accessibilityErrors
      .filter(error => error.elementUuid === originalComponentUuid)
      .map(error => ({ ...error, elementUuid: newComponentUuid }));
    draftState.accessibilityErrors = draftState.accessibilityErrors.concat(accessibilityErrorsForNewElement);
  }
}

export function useDesignerState(): [DesignerState, React.Dispatch<DesignerAction>] {
  const [state, dispatch] = useImmerReducer(stateReducer, null, () => {
    let jsonTreeOrigin: JSONTreeOrigin = 'url';
    let jsonTree = readTreeFromURL(window.location.href);
    if (!jsonTree) {
      jsonTree = readTreeFromStore() || getDefaultJSONTree();
      jsonTreeOrigin = 'store';
    }

    return {
      draggingElement: null,
      jsonTree,
      jsonTreeOrigin,
      selectedComponentInfo: null,
      selectedJSONTreeElementUuid: null,
      activeTab: 'add',
      enabledVirtualCursor: false,
      showCode: false,
      code: null,
      codeError: null,
      history: [],
      redo: [],
      insertComponent: null,
      accessibilityErrors: [],
    };
  });

  return [state, dispatch];
}
