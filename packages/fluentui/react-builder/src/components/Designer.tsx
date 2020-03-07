import * as _ from 'lodash';
import * as React from 'react';

import { ComponentDesignProp } from '@fluentui/react-bindings';
import componentInfoContext from '@fluentui/docs/src/utils/componentInfoContext';
import { ComponentInfo } from '@fluentui/docs/src/types';

import Anatomy from './Anatomy';
import BrowserWindow from './BrowserWindow';
import Canvas from './Canvas/Canvas';
import Description from './Description';
import Knobs from './Knobs';
import List from './List';
import Toolbar from './Toolbar';

import { renderJSONTreeToJSXElement, resolveComponent, resolveDraggingProps, resolveDrop } from '../config';
import { DesignerMode, JSONTreeElement } from './types';
import { EventListener } from '@fluentui/react-component-event-listener';
import { CodeSnippet } from '@fluentui/docs-components';
import renderElementToJSX from '@fluentui/docs/src/components/ExampleSnippet/renderElementToJSX';

const getElementById = (tree: JSONTreeElement, uuid) => {
  if (tree.uuid === uuid) return tree;

  return tree?.children?.find((childTree: JSONTreeElement) => {
    return getElementById(childTree, uuid);
  });
};

const HEADER_HEIGHT = '3rem';

const getUUID = () =>
  Math.random()
    .toString(36)
    .slice(2);

export type DesignerState = {
  design: {
    [key: string]: ComponentDesignProp;
  };
  selectedInstance: any;
  draggingElement: JSONTreeElement;
  draggingPosition: { x: number; y: number };
  jsonTree: JSONTreeElement;
  mode: DesignerMode;
  selectedComponentInfo: ComponentInfo;
  showCode: boolean;
  showJSONTree: boolean;
};

class Designer extends React.Component<any, DesignerState> {
  constructor(props) {
    super(props);

    const storedJSONTree = localStorage.getItem('jsonTree');
    const jsonTree = storedJSONTree ? JSON.parse(storedJSONTree) : null;

    if (jsonTree) {
      // restore drop listener on root element
      jsonTree.props.onMouseUp = () => this.handleDropOn('tree-root');
    }

    this.state = {
      draggingElement: null,
      draggingPosition: { x: 0, y: 0 },
      design: {},
      jsonTree: jsonTree || this.getDefaultJSONTree(),
      mode: 'build',
      selectedComponentInfo: null,
      selectedInstance: null,
      showCode: false,
      showJSONTree: false
    };
  }

  getDefaultJSONTree = (): JSONTreeElement => {
    const uuid = getUUID();
    return {
      type: 'div',
      uuid,
      props: {
        onMouseUp: () => {
          this.handleDropOn(uuid);
        }
      }
    };
  };

  componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<DesignerState>, snapshot?: any): void {
    localStorage.setItem('jsonTree', JSON.stringify(this.state.jsonTree));
  }

  handleReset = () => {
    if (confirm('Lose your changes?')) {
      localStorage.removeItem('jsonTree');

      this.setState({
        jsonTree: this.getDefaultJSONTree(),
        selectedComponentInfo: null
      });
    }
  };

  handleShowCodeChange = showCode => {
    this.setState({ showCode });
  };

  handleShowJSONTreeChange = showJSONTree => {
    this.setState({ showJSONTree });
  };

  handleDragStart = (info, e) => {
    // console.log('Designer:handleDragStart')
    this.setState({
      draggingElement: {
        uuid: getUUID(),
        type: info.displayName,
        props: resolveDraggingProps(info.displayName)
      },
      draggingPosition: { x: e.clientX, y: e.clientY }
    });
  };

  handleDragAbort = () => {
    this.setState({
      draggingElement: null,
      draggingPosition: null
    });
  };

  handleDrag = (e: MouseEvent) => {
    // console.log('Designer:handleDrag', this.state.draggingDisplayName, e)
    this.setState({ draggingPosition: { x: e.clientX, y: e.clientY } });
  };

  handleDropOn = uuid => {
    // console.log('Designer:handleDropOn')
    const { draggingElement, jsonTree } = this.state;
    if (!draggingElement) {
      return;
    }

    const source = draggingElement;
    const target = getElementById(jsonTree, uuid);

    resolveDrop(source, target);

    this.setState({
      draggingElement: null
    });
  };

  handleDragEnd = info => {
    // console.log('Designer:handleDragEnd', this.state.draggingDisplayName)
    this.setState(({ draggingElement, jsonTree }) => {
      const uuid = getUUID();

      const droppingElement: JSONTreeElement = {
        type: draggingElement.type,
        uuid,
        props: {
          ...draggingElement.props,
          onMouseUp: e => {
            e.preventDefault();
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            // TODO: wrap resolved mouseup listener if exists
            this.handleDropOn(uuid);
          }
        }
      };

      resolveDrop(droppingElement, jsonTree);

      return {
        draggingElement: null,
        jsonTree
      };
    });
  };

  handleSelectComponent = elementLike => {
    // console.log('Designer:handleSelectComponent', displayName)
    this.setState({
      selectedInstance: elementLike,
      selectedComponentInfo: componentInfoContext.byDisplayName[elementLike.displayName]
    });
  };

  handleModeChange = mode => {
    // console.log('Designer:onModeChange')
    this.setState({ mode });
  };

  handlePropChange = ({ name, value }) => {
    // console.log('Designer:handlePropChange')
    this.setState(({ design, selectedInstance }) => ({
      design: {
        ...design,
        [selectedInstance.displayName]: {
          ...design[selectedInstance.displayName],
          [name]: value
        }
      }
    }));
  };

  render() {
    const {
      draggingElement,
      draggingPosition,
      jsonTree,
      mode,
      selectedComponentInfo,
      selectedInstance,
      showCode,
      showJSONTree
    } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: '#fff',
          width: '100vw',
          height: '100vh',
          overflow: 'hidden'
        }}
      >
        {draggingElement && (
          <>
            <EventListener type="mousemove" listener={this.handleDrag} target={document} />
            <EventListener type="mouseup" listener={this.handleDragAbort} target={document} />
            <div
              style={{
                display: 'block',
                flex: '0 0 auto',
                position: 'fixed',
                ...(draggingPosition && {
                  left: draggingPosition.x,
                  top: draggingPosition.y
                }),
                pointerEvents: 'none',
                zIndex: 999999
              }}
            >
              {React.createElement(resolveComponent(draggingElement.type), draggingElement.props)}
            </div>
          </>
        )}

        <Toolbar
          showCode={showCode}
          showJSONTree={showJSONTree}
          onShowCodeChange={this.handleShowCodeChange}
          onShowJSONTreeChange={this.handleShowJSONTreeChange}
          onReset={this.handleReset}
          onModeChange={this.handleModeChange}
          style={{ flex: '0 0 auto', width: '100%', height: HEADER_HEIGHT }}
          mode={mode}
        />

        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {mode === 'build' && <List onDragStart={this.handleDragStart} style={{ overflowY: 'auto' }} />}

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              overflow: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                minHeight: `calc(100vh - ${HEADER_HEIGHT}`
              }}
            >
              <BrowserWindow
                style={{
                  flex: 1,
                  margin: mode === 'build' ? '2rem' : '1rem',
                  transition: 'margin 0.2s'
                }}
              >
                <Canvas
                  {...(draggingElement && {
                    onMouseMove: this.handleDrag,
                    onMouseUp: this.handleDragEnd
                  })}
                  onSelectComponent={this.handleSelectComponent}
                  jsonTree={jsonTree}
                />
              </BrowserWindow>

              {mode === 'build' && (showCode || showJSONTree) && (
                <div style={{ flex: '0 0 auto', maxHeight: '30vh', overflow: 'auto' }}>
                  {showCode && (
                    <CodeSnippet fitted mode="jsx" label="Copy" value={renderElementToJSX(renderJSONTreeToJSXElement(jsonTree))} />
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

          {selectedInstance && mode !== 'use' && (
            <div style={{ width: '20rem', padding: '1rem', overflow: 'auto' }}>
              <Description componentInfo={selectedComponentInfo} />
              <Anatomy componentInfo={selectedComponentInfo} />
              <Knobs onPropChange={this.handlePropChange} info={selectedComponentInfo} instance={selectedInstance} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Designer;
