import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { EventListener } from '@fluentui/react-component-event-listener';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
import { jsonTreeFindElement, renderJSONTreeToJSXElement, resolveDraggingElement } from '../config';
import { writeTreeToStore, writeTreeToURL } from '../utils/treeStore';
import { JSONTreeElement } from './types';
import { InsertComponent } from './InsertComponent';
import { debug, useDesignerState } from '../state';
import { useMode } from '../hooks';
import { AccessibilityError } from '../accessibility/types';
import { Toolbar } from './Toolbar';
import { Builder } from './Builder';
import { runAxe } from '../hooks/runAxe';

const HEADER_HEIGHT = '3rem';

export const Designer: React.FunctionComponent = () => {
  debug('render');

  const dragAndDropData = React.useRef<{
    position: { x: number; y: number };
    dropIndex: number;
    dropParent: JSONTreeElement | null;
  }>({ position: { x: 0, y: 0 }, dropIndex: -1, dropParent: null });

  const draggingElementRef = React.useRef<HTMLDivElement>();

  const [state, dispatch] = useDesignerState();
  const [{ mode, isExpanding, isSelecting }, setMode] = useMode();
  const [showJSONTree, handleShowJSONTreeChange] = React.useState(false);

  React.useEffect(() => {
    if (state.jsonTreeOrigin === 'store') {
      writeTreeToStore(state.jsonTree);
    }
  }, [state.jsonTree, state.jsonTreeOrigin]);

  const {
    activeTab,
    draggingElement,
    enabledVirtualCursor,
    insertComponent,
    jsonTree,
    selectedJSONTreeElementUuid,
    showCode,
    accessibilityErrors,
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

  const handleSwitchTab = React.useCallback(
    tab => {
      dispatch({ type: 'SWITCH_TAB', tab });
    },
    [dispatch],
  );

  const handleEnableVirtualCursorChange = React.useCallback(
    enabledVC => {
      dispatch({ type: 'ENABLE_VIRTUAL_CURSOR', enabledVirtualCursor: enabledVC });
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
    dragAndDropData.current.dropParent = dropParent;
    dragAndDropData.current.dropIndex = dropIndex;
  }, []);

  const handleDragStart = React.useCallback(
    (info, e) => {
      dragAndDropData.current.position = { x: e.clientX, y: e.clientY };
      dispatch({
        type: 'DRAG_START',
        component: resolveDraggingElement(info.displayName, info.moduleName),
      });
    },
    [dispatch],
  );

  const handleOpenAddComponentDialog = React.useCallback(
    (uuid: string, where: string) => {
      dispatch({ type: 'OPEN_ADD_DIALOG', uuid, where });
    },
    [dispatch],
  );

  const handleSelectComponent = React.useCallback(
    (jsonTreeElement: JSONTreeElement) => {
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

  const handlePropDelete = React.useCallback(
    ({ jsonTreeElement, name }) => {
      dispatch({
        type: 'PROP_DELETE',
        component: jsonTreeElement,
        propName: name,
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

  const handleDeleteSelectedComponent = React.useCallback(() => {
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

  const handleSwitchToStore = React.useCallback(() => {
    dispatch({ type: 'SWITCH_TO_STORE' });
    const url = window.location.href.split('#')[0];
    window.history.pushState('', document.title, url);
  }, [dispatch]);

  const handleCloseAddComponentDialog = React.useCallback(() => {
    dispatch({ type: 'CLOSE_ADD_DIALOG' });
  }, [dispatch]);
  const handleAddComponent = React.useCallback(
    (component: string, module: string) => {
      dispatch({ type: 'ADD_COMPONENT', component, module });
    },
    [dispatch],
  );

  const selectedComponent =
    !draggingElement &&
    mode !== 'use' &&
    selectedJSONTreeElement?.uuid &&
    selectedJSONTreeElement.uuid !== 'builder-root' &&
    selectedJSONTreeElement;

  const handlePropUpdate = React.useCallback(async () => {
    const errors = await runAndEvaluateAxe(match => match && match[1] === selectedComponent.uuid);
    dispatch({ type: 'PROP_UPDATED', component: selectedComponent, componentAccessibilityErrors: errors });
  }, [dispatch, selectedComponent]);

  const handleDesignerLoaded = React.useCallback(async () => {
    const errors = await runAndEvaluateAxe(match => match != null);
    dispatch({ type: 'DESIGNER_LOADED', accessibilityErrors: errors });
  }, [dispatch]);

  const runAndEvaluateAxe = async (match: (match: RegExpMatchArray) => boolean) => {
    const { violations } = await runAxe();
    const errors = [];
    violations.forEach(({ nodes }) => {
      nodes.forEach(nodeResult => {
        const idMatch = nodeResult.html.match(/data-builder-id=\"(.*?)\"/);
        if (match(idMatch)) {
          const results = nodeResult.all.concat(nodeResult.any, nodeResult.none);
          results.forEach(result => {
            errors.push({
              elementUuid: idMatch[1],
              source: 'AXE-core',
              message: result.message,
            } as AccessibilityError);
          });
        }
      });
    });
    return errors;
  };

  React.useEffect(() => {
    setTimeout(() => {
      handleDesignerLoaded();
    }, 1000);
  }, [handleDesignerLoaded]);

  const selectedComponentAccessibilityErrors = React.useMemo(
    () => (selectedComponent ? accessibilityErrors?.filter(error => error.elementUuid === selectedComponent.uuid) : []),
    [selectedComponent, accessibilityErrors],
  );

  const hotkeys = {
    'Ctrl+c': () => {
      if (state.selectedJSONTreeElementUuid && state.selectedJSONTreeElementUuid !== 'builder-root') {
        dragAndDropData.current.position = { x: -300, y: -300 };
        dispatch({ type: 'DRAG_CLONE' });
      }
    },
    'Ctrl+v': () => {
      if (state.draggingElement) {
        dispatch({
          type: 'DRAG_DROP',
          dropParent: dragAndDropData.current.dropParent,
          dropIndex: dragAndDropData.current.dropIndex,
        });
      }
    },
    'Ctrl+z': handleUndo,
    'Shift+P': handleGoToParentComponent,
    'Ctrl+Shift+Z': handleRedo,
    Delete: handleDeleteSelectedComponent,
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

  const handleKeyDown = (e: KeyboardEvent) => {
    let command = '';
    command += e.altKey ? 'Alt+' : '';
    command += e.ctrlKey || e.metaKey ? 'Ctrl+' : '';
    command += e.shiftKey ? 'Shift+' : '';
    command += e.key;
    hotkeys.hasOwnProperty(command) && hotkeys[command]();
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <DocumentTitle title={`Fluent UI Builder`} />
      <EventListener type="keydown" listener={handleKeyDown} target={document} />
      {insertComponent && (
        <InsertComponent onDismiss={handleCloseAddComponentDialog} onComponentAdded={handleAddComponent} />
      )}
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
        enabledVirtualCursor={enabledVirtualCursor}
        onEnableVirtualCursor={handleEnableVirtualCursorChange}
        style={{ flex: '0 0 auto', width: '100%', height: HEADER_HEIGHT }}
      />

      <Builder
        accessibilityErrors={accessibilityErrors}
        activeTab={activeTab}
        getShareableLink={getShareableLink}
        isExpanding={isExpanding}
        isSelecting={isSelecting}
        jsonTree={jsonTree}
        mode={mode}
        onAddComponent={handleAddComponent}
        onCanvasMouseUp={handleCanvasMouseUp}
        onCloneComponent={handleCloneComponent}
        onDeleteSelectedComponent={handleDeleteSelectedComponent}
        onDrag={handleDrag}
        onDragStart={handleDragStart}
        onDropPositionChange={handleDropPositionChange}
        onGoToParentComponent={handleGoToParentComponent}
        onKeyDown={handleKeyDown}
        onMoveComponent={handleMoveComponent}
        onOpenAddComponentDialog={handleOpenAddComponentDialog}
        onPropChange={handlePropChange}
        onPropDelete={handlePropDelete}
        onPropUpdate={handlePropUpdate}
        onSelectComponent={handleSelectComponent}
        onSourceCodeChange={handleSourceCodeChange}
        onSourceCodeError={handleSourceCodeError}
        onSwitchTab={handleSwitchTab}
        onSwitchToStore={handleSwitchToStore}
        selectedComponent={selectedComponent}
        selectedComponentAccessibilityErrors={selectedComponentAccessibilityErrors}
        selectedComponentInfo={selectedComponentInfo}
        selectedJSONTreeElement={selectedJSONTreeElement}
        showJSONTree={showJSONTree}
        state={state}
      />
    </div>
  );
};
