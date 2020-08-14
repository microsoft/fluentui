import * as React from 'react';
import { useImmerReducer, Reducer } from 'use-immer';
import { Text, Button, Divider } from '@fluentui/react-northstar';
import { EventListener } from '@fluentui/react-component-event-listener';
import { renderElementToJSX } from '@fluentui/docs-components';

import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { ComponentInfo } from '../componentInfo/types';

// import Anatomy from './Anatomy';
import { BrowserWindow } from './BrowserWindow';
import { Canvas } from './Canvas';
import { Description } from './Description';
import { Knobs } from './Knobs';
import { List } from './List';
import { Toolbar } from './Toolbar';

import {
  jsonTreeCloneElement,
  jsonTreeDeleteElement,
  jsonTreeFindElement,
  jsonTreeFindParent,
  renderJSONTreeToJSXElement,
  resolveDraggingElement,
  resolveDrop,
} from '../config';
import { readTreeFromStore, readTreeFromURL, writeTreeToStore, writeTreeToURL } from '../utils/treeStore';

import { DesignerMode, JSONTreeElement } from './types';
import { ComponentTree } from './ComponentTree';
import { GetShareableLink } from './GetShareableLink';
import { ErrorBoundary } from './ErrorBoundary';

const HEADER_HEIGHT = '3rem';

function debug(...args) {
  console.log('--Designer', ...args);
}

const CodeEditor = React.lazy(async () => {
  const _CodeEditor = (await import(/* webpackChunkName: "codeeditor" */ './CodeEditor')).CodeEditor;
  return {
    default: _CodeEditor,
  };
});

function getDefaultJSONTree(): JSONTreeElement {
  return { uuid: 'builder-root', type: 'div' };
}

type JSONTreeOrigin = 'store' | 'url';

type DesignerState = {
  draggingElement: JSONTreeElement;
  jsonTree: JSONTreeElement;
  jsonTreeOrigin: JSONTreeOrigin;
  selectedComponentInfo: ComponentInfo; // FIXME: should be computed in render?
  selectedJSONTreeElementUuid: JSONTreeElement['uuid'];
  showCode: boolean;
  code: string | null; // only valid if showCode is set to true
  codeError: string | null;
  history: Array<JSONTreeElement>;
  redo: Array<JSONTreeElement>;
};

type DesignerAction =
  | { type: 'DRAG_START'; component: JSONTreeElement }
  | { type: 'DRAG_ABORT' }
  | { type: 'DRAG_DROP'; dropParent: JSONTreeElement; dropIndex: number }
  | { type: 'DRAG_CLONE' }
  | { type: 'DRAG_MOVE' }
  | { type: 'SELECT_COMPONENT'; component: JSONTreeElement }
  | { type: 'SELECT_PARENT' }
  | { type: 'DELETE_SELECTED_COMPONENT' }
  | { type: 'PROP_CHANGE'; component: JSONTreeElement; propName: string; propValue: any }
  | { type: 'SWITCH_TO_STORE' }
  | { type: 'RESET_STORE' }
  | { type: 'SHOW_CODE'; show: boolean }
  | { type: 'SOURCE_CODE_CHANGE'; code: string; jsonTree: JSONTreeElement }
  | { type: 'SOURCE_CODE_ERROR'; code: string; error: string }
  | { type: 'UNDO' }
  | { type: 'REDO' };

const stateReducer: Reducer<DesignerState, DesignerAction> = (draftState, action) => {
  debug(`stateReducer: ${action.type}`, { action, draftState: JSON.parse(JSON.stringify(draftState)) });
  let treeChanged = false;

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
      );
      break;

    case 'DRAG_MOVE':
      draftState.history.push(JSON.parse(JSON.stringify(draftState.jsonTree)));
      draftState.redo = [];

      draftState.draggingElement = jsonTreeCloneElement(
        draftState.jsonTree,
        jsonTreeFindElement(draftState.jsonTree, draftState.selectedJSONTreeElementUuid),
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

    default:
      throw new Error(`Invalid action ${action}`);
  }

  if (treeChanged && draftState.showCode) {
    draftState.code = renderElementToJSX(renderJSONTreeToJSXElement(draftState.jsonTree));
    draftState.codeError = null;
  }
};

function useMode(): [{ mode: DesignerMode; isExpanding: boolean; isSelecting: boolean }, (mode: DesignerMode) => void] {
  const [mode, setMode] = React.useState<DesignerMode>('build');
  const isExpanding = mode === 'build';
  const isSelecting = mode === 'build' || mode === 'design';

  return [{ mode, isExpanding, isSelecting }, setMode];
}

export const Designer: React.FunctionComponent = () => {
  debug('render');

  const dragAndDropData = React.useRef<{
    position: { x: number; y: number };
    dropIndex: number;
    dropParent: JSONTreeElement | null;
  }>({ position: { x: 0, y: 0 }, dropIndex: -1, dropParent: null });

  const draggingElementRef = React.useRef<HTMLDivElement>();

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
      showCode: false,
      code: null,
      codeError: null,
      history: [],
      redo: [],
    };
  });

  const [{ mode, isExpanding, isSelecting }, setMode] = useMode();
  const [showJSONTree, handleShowJSONTreeChange] = React.useState(false);

  React.useEffect(() => {
    if (state.jsonTreeOrigin === 'store') {
      writeTreeToStore(state.jsonTree);
    }
  }, [state.jsonTree, state.jsonTreeOrigin]);

  const {
    draggingElement,
    jsonTree,
    jsonTreeOrigin,
    /* selectedComponentInfo, */
    selectedJSONTreeElementUuid,
    showCode,
    code,
    codeError,
  } = state;

  const selectedJSONTreeElement = jsonTreeFindElement(jsonTree, selectedJSONTreeElementUuid);
  const selectedComponentInfo = selectedJSONTreeElement
    ? componentInfoContext.byDisplayName[selectedJSONTreeElement.displayName]
    : null;

  const handleReset = React.useCallback(() => {
    /* eslint-disable-next-line no-alert */
    if (confirm('Lose your changes?')) {
      dispatch({ type: 'RESET_STORE' });
      // FIXME: what if I am viewing tree from URL?
    }
  }, [dispatch]);

  const handleShowCodeChange = React.useCallback(
    showCode => {
      dispatch({ type: 'SHOW_CODE', show: showCode });
    },
    [dispatch],
  );

  const handleDragStart = React.useCallback(
    (info, e) => {
      dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
      dispatch({ type: 'DRAG_START', component: resolveDraggingElement(info.displayName) });
    },
    [dispatch],
  );

  const handleDragAbort = React.useCallback(() => {
    dispatch({ type: 'DRAG_ABORT' });
  }, [dispatch]);

  const handleDrag = React.useCallback((e: MouseEvent) => {
    dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
    if (draggingElementRef.current) {
      draggingElementRef.current.style.left = `${dragAndDropData.current.position.x}px`;
      draggingElementRef.current.style.top = `${dragAndDropData.current.position.y}px`;
    }
  }, []);

  const handleCanvasMouseUp = React.useCallback(() => {
    dispatch({
      type: 'DRAG_DROP',
      dropParent: dragAndDropData.current.dropParent,
      dropIndex: dragAndDropData.current.dropIndex,
    });
  }, [dispatch]);

  const handleDropPositionChange = React.useCallback((dropParent, dropIndex) => {
    debug('handleDropPositionChange', { dropIndex, dropParent });

    dragAndDropData.current.dropParent = dropParent;
    dragAndDropData.current.dropIndex = dropIndex;
  }, []);

  const handleSelectComponent = React.useCallback(
    jsonTreeElement => {
      dispatch({
        type: 'SELECT_COMPONENT',
        component: jsonTreeElement,
      });
    },
    [dispatch],
  );

  const handlePropChange = React.useCallback(
    ({ jsonTreeElement, name, value }) => {
      dispatch({
        type: 'PROP_CHANGE',
        component: jsonTreeElement,
        propName: name,
        propValue: value,
      });
    },
    [dispatch],
  );

  const handleCloneComponent = React.useCallback(
    (e: MouseEvent) => {
      dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
      dispatch({ type: 'DRAG_CLONE' });
    },
    [dispatch],
  );

  const handleMoveComponent = React.useCallback(
    (e: MouseEvent) => {
      dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
      dispatch({ type: 'DRAG_MOVE' });
    },
    [dispatch],
  );

  const handleDeleteComponent = React.useCallback(() => {
    dispatch({ type: 'DELETE_SELECTED_COMPONENT' });
  }, [dispatch]);

  const handleGoToParentComponent = React.useCallback(() => {
    dispatch({ type: 'SELECT_PARENT' });
  }, [dispatch]);

  const handleUndo = () => {
    dispatch({
      type: 'UNDO',
    });
  };

  const handleRedo = () => {
    dispatch({
      type: 'REDO',
    });
  };

  const handleSourceCodeChange = React.useCallback(
    (code, jsonTree) => {
      dispatch({ type: 'SOURCE_CODE_CHANGE', code, jsonTree });
    },
    [dispatch],
  );

  const handleSourceCodeError = React.useCallback(
    (code, error) => {
      dispatch({ type: 'SOURCE_CODE_ERROR', code, error });
    },
    [dispatch],
  );

  const getShareableLink = React.useCallback(() => {
    return writeTreeToURL(jsonTree, window.location.href);
  }, [jsonTree]);

  const switchToStore = React.useCallback(() => {
    dispatch({ type: 'SWITCH_TO_STORE' });
    // FIXME: remove tree_lz from current URL
  }, [dispatch]);

  const hotkeys = {
    'Ctrl+z': handleUndo,
    'Shift+P': handleGoToParentComponent,
    'Ctrl+Shift+Z': handleRedo,
    Delete: handleDeleteComponent,
    'Shift+D': () => {
      setMode('design');
    },
    'Shift+U': () => {
      setMode('use');
    },
    'Shift+B': () => {
      setMode('build');
    },
    'Shift+C': () => {
      handleShowCodeChange(!state.showCode);
    },
    'Shift+J': () => {
      handleShowJSONTreeChange(!showJSONTree);
    },
  };

  const handleKeyDown = React.useCallback(
    e => {
      let command = '';
      command += e.altKey ? 'Alt+' : '';
      command += e.ctrlKey | e.metaKey ? 'Ctrl+' : '';
      command += e.shiftKey ? 'Shift+' : '';
      command += e.key;
      hotkeys.hasOwnProperty(command) && hotkeys[command]();
    },
    [hotkeys],
  );

  const selectedComponent =
    !draggingElement &&
    mode !== 'use' &&
    selectedJSONTreeElement?.uuid &&
    selectedJSONTreeElement.uuid !== 'builder-root' &&
    selectedJSONTreeElement;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <EventListener type="keydown" listener={handleKeyDown} target={document} />
      {draggingElement && (
        <>
          <EventListener type="mousemove" listener={handleDrag} target={document} />
          <EventListener type="mouseup" listener={handleDragAbort} target={document} />
          <div
            ref={draggingElementRef}
            style={{
              display: 'block',
              flex: '0 0 auto',
              position: 'fixed',
              padding: '4px',
              ...(dragAndDropData.current?.position && {
                left: dragAndDropData.current.position.x,
                top: dragAndDropData.current.position.y,
              }),
              pointerEvents: 'none',
              lineHeight: 1,
              border: `1px solid salmon`,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              backgroundImage:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
              backgroundBlendMode: 'soft-light',
              zIndex: 999999,
            }}
          >
            {renderJSONTreeToJSXElement(draggingElement)}
          </div>
        </>
      )}

      <Toolbar
        isExpanding={isExpanding}
        isSelecting={isSelecting}
        mode={mode}
        onShowCodeChange={handleShowCodeChange}
        onShowJSONTreeChange={handleShowJSONTreeChange}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={state.history.length > 0}
        canRedo={state.redo.length > 0}
        onReset={handleReset}
        onModeChange={setMode}
        showCode={showCode}
        showJSONTree={showJSONTree}
        style={{ flex: '0 0 auto', width: '100%', height: HEADER_HEIGHT }}
      />

      <div style={{ display: 'flex', flex: 1, minWidth: '10rem', overflow: 'hidden' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '12rem',
            transition: 'opacity 0.2s',
            ...(mode === 'use' && {
              pointerEvents: 'none',
              opacity: 0,
            }),
          }}
        >
          <List style={{ overflowY: 'auto' }} onDragStart={handleDragStart} />
          <Divider style={{ margin: '1rem' }} />
          <ComponentTree
            tree={jsonTree}
            selectedComponent={selectedComponent}
            onSelectComponent={handleSelectComponent}
            onCloneComponent={handleCloneComponent}
            onMoveComponent={handleMoveComponent}
            onDeleteComponent={handleDeleteComponent}
          />
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            overflow: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minHeight: `calc(100vh - ${HEADER_HEIGHT}`,
            }}
          >
            <BrowserWindow
              showNavBar={false}
              headerItems={[
                <div style={{ display: 'flex', alignItems: 'baseline', marginLeft: 'auto' }}>
                  {jsonTreeOrigin === 'url' && (
                    <>
                      <Text error>You are working from a shared URL, no changes are saved!</Text>
                      <Button text styles={{ paddingLeft: '.25em', minWidth: 0 }} onClick={switchToStore}>
                        View local
                      </Button>
                    </>
                  )}
                  {jsonTreeOrigin === 'store' && <GetShareableLink getShareableLink={getShareableLink} />}
                </div>,
              ]}
              style={{
                flex: 1,
                margin: '1rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.5s',
              }}
            >
              <ErrorBoundary code={code} jsonTree={jsonTree}>
                <Canvas
                  draggingElement={draggingElement}
                  isExpanding={isExpanding}
                  isSelecting={isSelecting || !!draggingElement}
                  onMouseMove={handleDrag}
                  onMouseUp={handleCanvasMouseUp}
                  onKeyDown={handleKeyDown}
                  onSelectComponent={handleSelectComponent}
                  onDropPositionChange={handleDropPositionChange}
                  jsonTree={jsonTree}
                  selectedComponent={selectedComponent}
                  onCloneComponent={handleCloneComponent}
                  onMoveComponent={handleMoveComponent}
                  onDeleteComponent={handleDeleteComponent}
                  onGoToParentComponent={handleGoToParentComponent}
                />
              </ErrorBoundary>
            </BrowserWindow>

            {(showCode || showJSONTree) && (
              <div style={{ flex: '0 0 auto', maxHeight: '35vh', overflow: 'auto' }}>
                {showCode && (
                  <div>
                    <React.Suspense fallback={<div>Loading...</div>}>
                      <CodeEditor
                        code={code}
                        onCodeChange={handleSourceCodeChange}
                        onCodeError={handleSourceCodeError}
                      />
                    </React.Suspense>
                    {codeError && (
                      <pre
                        style={{
                          position: 'sticky',
                          bottom: 0,
                          padding: '1em',
                          // don't block viewport
                          maxHeight: '50vh',
                          overflowY: 'auto',
                          color: '#fff',
                          background: 'red',
                          whiteSpace: 'pre-wrap',
                          // above code editor text :/
                          zIndex: 4,
                        }}
                      >
                        {codeError}
                      </pre>
                    )}
                  </div>
                )}
                {showJSONTree && (
                  <div style={{ flex: 1, padding: '1rem', color: '#543', background: '#ddd' }}>
                    <h3 style={{ margin: 0 }}>JSON Tree</h3>
                    <pre>{JSON.stringify(jsonTree, null, 2)}</pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {selectedComponentInfo && (
          <div
            style={{
              width: '20rem',
              padding: '1rem',
              overflow: 'auto',
              transition: 'opacity 0.2s',
              ...(mode === 'use' && {
                pointerEvents: 'none',
                opacity: 0,
              }),
            }}
          >
            <Description selectedJSONTreeElement={selectedJSONTreeElement} componentInfo={selectedComponentInfo} />
            {/* <Anatomy componentInfo={selectedComponentInfo} /> */}
            {selectedJSONTreeElement && (
              <Knobs
                onPropChange={handlePropChange}
                info={selectedComponentInfo}
                jsonTreeElement={selectedJSONTreeElement}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
