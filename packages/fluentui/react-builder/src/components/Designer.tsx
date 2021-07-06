import * as React from 'react';
import DocumentTitle from 'react-document-title';
import { Box, Text, Button, Header, Tooltip, Menu, tabListBehavior } from '@fluentui/react-northstar';
import { FilesCodeIcon, AcceptIcon, AddIcon, MenuIcon } from '@fluentui/react-icons-northstar';
import { EventListener } from '@fluentui/react-component-event-listener';
import { renderElementToJSX, CodeSandboxExporter, CodeSandboxState } from '@fluentui/docs-components';
import { componentInfoContext } from '../componentInfo/componentInfoContext';
// import Anatomy from './Anatomy';
import { BrowserWindow } from './BrowserWindow';
import { Canvas } from './Canvas';
import { Description } from './Description';
import { Knobs } from './Knobs';
import { List } from './List';
import { Toolbar } from './Toolbar';
import { jsonTreeFindElement, renderJSONTreeToJSXElement, getCodeSandboxInfo, resolveDraggingElement } from '../config';
import { writeTreeToStore, writeTreeToURL } from '../utils/treeStore';
import { JSONTreeElement } from './types';
import { ComponentTree } from './ComponentTree';
import { GetShareableLink } from './GetShareableLink';
import { ErrorBoundary } from './ErrorBoundary';
import { InsertComponent } from './InsertComponent';
import { debug, useDesignerState } from '../state';
import { useAxeOnElement, useMode } from '../hooks';
import { ErrorPanel } from './ErrorPanel';

const HEADER_HEIGHT = '3rem';

const CodeEditor = React.lazy(async () => {
  const _CodeEditor = (await import(/* webpackChunkName: "codeeditor" */ './CodeEditor')).CodeEditor;
  return {
    default: _CodeEditor,
  };
});

export type NavBarItemProps = {
  title: string;
  icon: any;
  isSelected: boolean;
  onClickHandler: () => void;
};

export const NavBarItem: React.FunctionComponent<NavBarItemProps> = ({ title, icon, isSelected, onClickHandler }) => {
  return (
    <Box
      styles={({ theme }) => ({
        height: '3.4rem',
        display: 'flex',
        alignItems: 'center',
        background: isSelected ? `${theme.siteVariables.colorScheme.default.background2}` : 'inherit',
        position: 'relative',
      })}
    >
      {isSelected && (
        <Box
          styles={({ theme }) => ({
            position: 'absolute',
            width: '2px',
            height: '32px',
            background: `${theme.siteVariables.colorScheme.brand.foreground1}`,
            top: '8px',
            left: '4px',
          })}
        />
      )}
      <Tooltip
        pointing
        position="after"
        align="center"
        trigger={
          <Menu.Item iconOnly style={{ marginLeft: '6px' }} onClick={onClickHandler} active={isSelected}>
            {icon}
          </Menu.Item>
        }
        content={title}
      />
    </Box>
  );
};

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
  const [headerMessage, setHeaderMessage] = React.useState('');

  const [axeErrors, runAxeOnElement] = useAxeOnElement();

  React.useEffect(() => {
    if (state.selectedJSONTreeElementUuid) {
      runAxeOnElement(state.selectedJSONTreeElementUuid);
    }
  }, [state.selectedJSONTreeElementUuid, runAxeOnElement]);

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
    enabledVirtualCursor,
    showCode,
    code,
    activeTab,
    codeError,
    insertComponent,
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

  const selectActiveTab = React.useCallback(
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

  const handlePropDelete = React.useCallback(
    ({ jsonTreeElement, name, value }) => {
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

  const switchToStore = React.useCallback(() => {
    dispatch({ type: 'SWITCH_TO_STORE' });
    const url = window.location.href.split('#')[0];
    window.history.pushState('', document.title, url);
  }, [dispatch]);

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

  const handleOpenAddComponentDialog = React.useCallback(
    (uuid: string, where: string) => {
      dispatch({ type: 'OPEN_ADD_DIALOG', uuid, where });
    },
    [dispatch],
  );

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

  const codeSandboxData = getCodeSandboxInfo(jsonTree, renderElementToJSX(renderJSONTreeToJSXElement(jsonTree)));
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

      <div style={{ display: 'flex', flex: 1, minWidth: '10rem', overflow: 'hidden' }}>
        <Menu
          accessibility={tabListBehavior}
          vertical
          styles={({ theme }) => ({
            background: '#FAF9F8',
            border: '0px',
            borderRight: `1px solid ${theme.siteVariables.colorScheme.default.border2}`,
            borderRadius: '0px',
            display: 'flex',
            flexDirection: 'column',
            width: '3.4rem',
            transition: 'opacity 0.2s',
            position: 'relative',
            padding: '0px',
            ...(mode === 'use' && {
              pointerEvents: 'none',
              opacity: 0,
            }),
          })}
        >
          <NavBarItem
            title="Add components"
            isSelected={activeTab === 'add'}
            icon={<AddIcon size="large" outline />}
            onClickHandler={() => selectActiveTab('add')}
          />

          <NavBarItem
            title="Navigator"
            isSelected={activeTab === 'nav'}
            icon={<MenuIcon size="large" outline />}
            onClickHandler={() => selectActiveTab('nav')}
          />
        </Menu>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '22.85rem',
            transition: 'opacity 0.2s',
            ...(mode === 'use' && {
              pointerEvents: 'none',
              opacity: 0,
            }),
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px 0 20px',
              borderBottom: '1px solid #E1DFDD',
            }}
          >
            <Header as="h2" style={{ fontSize: '16px', fontWeight: 'bold' }}>
              {activeTab === 'add' ? 'Add components' : 'Navigator'}
            </Header>
          </div>
          {activeTab === 'add' && (
            <div>
              <List style={{ overflowY: 'auto' }} onDragStart={handleDragStart} />
            </div>
          )}
          {activeTab === 'nav' && (
            <div>
              {(!jsonTree?.props?.children || jsonTree?.props?.children?.length === 0) && (
                <Button
                  text
                  content="Insert first component"
                  fluid
                  onClick={() => handleOpenAddComponentDialog('', 'first')}
                />
              )}
              <ComponentTree
                tree={jsonTree}
                selectedComponent={selectedComponent}
                onSelectComponent={handleSelectComponent}
                onCloneComponent={handleCloneComponent}
                onMoveComponent={handleMoveComponent}
                onDeleteSelectedComponent={handleDeleteSelectedComponent}
                onAddComponent={handleOpenAddComponentDialog}
              />
            </div>
          )}
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
                <div key="headerMessage" style={{ marginLeft: 10 }}>
                  {mode === 'use' && <Text error>{headerMessage}</Text>}
                </div>,
                <div key="headrTools" style={{ display: 'flex', alignItems: 'baseline', marginLeft: 'auto' }}>
                  {jsonTreeOrigin === 'url' && (
                    <>
                      <Text error>You are working from a shared URL, no changes are saved!</Text>
                      <Button text styles={{ paddingLeft: '.25em', minWidth: 0 }} onClick={switchToStore}>
                        View local
                      </Button>
                    </>
                  )}
                  {jsonTreeOrigin === 'store' && <GetShareableLink getShareableLink={getShareableLink} />}
                  <CodeSandboxExporter
                    exampleCode={codeSandboxData.code}
                    exampleLanguage="js"
                    exampleName="uibuilder"
                    imports={codeSandboxData.imports}
                  >
                    {(state, onCodeSandboxClick) => {
                      const codeSandboxContent =
                        state === CodeSandboxState.Default
                          ? 'CodeSandbox'
                          : state === CodeSandboxState.Loading
                          ? 'Exporting...'
                          : 'Click to open';

                      const codeSandboxIcon = state === CodeSandboxState.Default ? <FilesCodeIcon /> : <AcceptIcon />;

                      return (
                        <Button
                          loading={state === CodeSandboxState.Loading}
                          styles={{ marginTop: 'auto', marginLeft: '0.7rem' }}
                          onClick={onCodeSandboxClick}
                          icon={codeSandboxIcon}
                          content={codeSandboxContent}
                        />
                      );
                    }}
                  </CodeSandboxExporter>
                </div>,
              ]}
              style={{
                flex: 1,
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
                  onDeleteSelectedComponent={handleDeleteSelectedComponent}
                  onGoToParentComponent={handleGoToParentComponent}
                  enabledVirtualCursor={enabledVirtualCursor}
                  role="main"
                  inUseMode={mode === 'use'}
                  setHeaderMessage={setHeaderMessage}
                />
              </ErrorBoundary>
            </BrowserWindow>

            {(showCode || showJSONTree) && (
              <div style={{ flex: '0 0 auto', maxHeight: '35vh', overflow: 'auto' }}>
                {showCode && (
                  <div role="complementary" aria-label="Code editor">
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
                  <div
                    role="complementary"
                    aria-label="JSON tree"
                    style={{ flex: 1, padding: '1rem', color: '#543', background: '#ddd' }}
                  >
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
            role="complementary"
            aria-label="Component properties"
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
            {!!axeErrors.length && <ErrorPanel axeErrors={axeErrors} />}
            {selectedJSONTreeElement && (
              <Knobs
                onPropChange={handlePropChange}
                onPropDelete={handlePropDelete}
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
