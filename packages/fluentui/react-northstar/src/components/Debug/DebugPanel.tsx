import * as React from 'react';
import * as _ from 'lodash';
import { DebugPanelItem } from './DebugPanelItem';
import { FiberNavigator } from './FiberNavigator';
import { getValues, removeNulls } from './utils';
import { DebugComponentViewer } from './DebugComponentViewer';

export type DebugPanelProps = {
  cssStyles?: string[];
  fiberNav: FiberNavigator;
  debugData: {
    componentStyles: { [key: string]: { styles: any; debugId: string } };
    componentVariables: {
      input: { [key: string]: any };
      resolved: { [key: string]: any };
    }[];
    siteVariables: object[];
  };
  onActivateDebugSelectorClick: (e) => void;
  onClose: (e) => void;
  onPositionLeft: (e) => void;
  onPositionRight: (e) => void;
  position: 'left' | 'right';
  onFiberChanged: (fiberNav: FiberNavigator) => void;
  onFiberSelected: (fiberNav: FiberNavigator) => void;
};

export const DebugPanel: React.FC<DebugPanelProps> = props => {
  const {
    cssStyles,
    debugData: inputDebugData,
    fiberNav,
    onActivateDebugSelectorClick,
    onClose,
    position,
    onPositionLeft,
    onPositionRight,
    onFiberChanged,
    onFiberSelected,
  } = props;

  const [slot, setSlot] = React.useState('root');

  const left = position === 'left';

  const debugData =
    _.isNil(inputDebugData) || _.isEmpty(inputDebugData)
      ? {
          componentStyles: {},
          componentVariables: [],
          siteVariables: [],
        }
      : inputDebugData;

  debugData.componentStyles = debugData.componentStyles || {};
  debugData.componentVariables = debugData.componentVariables || [];
  debugData.siteVariables = debugData.siteVariables || [];

  const styleSlots = Object.keys(debugData.componentStyles);
  let siteVariablesUsedInComponentVariables = [];

  debugData.componentVariables
    .map(val => val.input)
    .forEach(
      val =>
        (siteVariablesUsedInComponentVariables = _.concat(
          siteVariablesUsedInComponentVariables,
          getValues(val, val => val.indexOf('siteVariables.') > -1),
        )),
    );

  const uniqUsedSiteVariables = _.uniq(siteVariablesUsedInComponentVariables);
  const siteVariablesDataWithNulls = debugData.siteVariables.map(val => ({
    ...val,
    resolved: uniqUsedSiteVariables.reduce((acc, next) => {
      const key = _.replace(next, 'siteVariables.', '');
      _.set(acc, key, _.get(val['resolved'], key));
      return acc;
    }, {}),
  }));

  const siteVariablesData = siteVariablesDataWithNulls.map(val => ({
    ...val,
    resolved: removeNulls(val.resolved),
  }));

  return (
    <div>
      <div style={debugPanelRoot(left)}>
        <div style={debugPanelHeader}>
          <div tabIndex={0} onClick={onActivateDebugSelectorClick} style={debugPanelArrowIcon}>
            ⇱
          </div>
          <div style={{ float: 'right' }}>
            <div tabIndex={0} style={debugPanelIcon(true, left)} onClick={onPositionLeft} />
            <div tabIndex={0} style={debugPanelIcon(false, left)} onClick={onPositionRight} />
            <div tabIndex={0} onClick={onClose} style={debugPanelCloseIcon}>
              ✕
            </div>
          </div>
        </div>

        <DebugComponentViewer fiberNav={fiberNav} onFiberChanged={onFiberChanged} onFiberSelected={onFiberSelected} />

        <div style={debugPanelBody}>
          {/* Styles */}

          <div style={debugPanel}>
            <div style={debugHeaderContainer()}>
              <div style={debugHeader()}>Styles</div>
              {!_.isEmpty(debugData.componentStyles) && (
                <div style={debugPanelSelectContainer()}>
                  <select value={slot} onChange={e => setSlot(e.target.value)}>
                    {styleSlots.map(val => (
                      <option value={val} key={val}>
                        Slot: {val}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {!_.isEmpty(debugData.componentStyles) ? (
              <DebugPanelItem data={debugData.componentStyles[slot]} valueKey="styles" idKey="debugId" />
            ) : (
              <div style={debugNoData()}>None in use</div>
            )}
          </div>

          {/* Component Variables */}

          <div style={debugPanel}>
            <div style={debugHeaderContainer()}>
              <div style={debugHeader()}>Variables</div>
            </div>
            {!_.isEmpty(debugData.componentVariables) ? (
              <DebugPanelItem
                data={debugData.componentVariables}
                valueKey="resolved"
                idKey="debugId"
                commentKey="input"
                commentKeyPredicate={val => typeof val === 'string' && val.indexOf('siteVariables.') > -1}
              />
            ) : (
              <div style={debugNoData()}>None in use</div>
            )}
          </div>

          {/* Site Variables */}

          <div style={debugPanel}>
            <div style={debugHeaderContainer()}>
              <div style={debugHeader()}>Site variables</div>
            </div>
            {!_.isEmpty(siteVariablesData) && !_.isEmpty(uniqUsedSiteVariables) ? (
              <DebugPanelItem data={siteVariablesData} valueKey="resolved" idKey="debugId" />
            ) : (
              <div style={debugNoData()}>None in use</div>
            )}
          </div>
        </div>

        {!_.isEmpty(cssStyles) && (
          <div style={debugPanel}>
            <div style={debugHeader()}>HTML Styles</div>
            <div style={{ clear: 'both' }}>
              {cssStyles.map(l => (
                <pre key={l}>{l}</pre>
              ))}
            </div>
          </div>
        )}

        <div style={{ padding: '50px 0' }} />
      </div>
    </div>
  );
};

const debugPanelHeader: React.CSSProperties = {
  position: 'sticky',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2px 2px 4px',
  top: '0',
  background: '#f3f3f3',
  zIndex: 1,
};

const commonIconStyle: React.CSSProperties = {
  display: 'inline-block',
  cursor: 'pointer',
  color: '#555',
  lineHeight: 1,
  margin: '0 4px',
};

const debugPanelCloseIcon: React.CSSProperties = {
  ...commonIconStyle,
  fontSize: '20px',
  outline: '0',
  cursor: 'pointer',
};

const debugPanelArrowIcon: React.CSSProperties = {
  ...commonIconStyle,
  fontSize: '24px',
  marginTop: '-4px',
  outline: '0',
};

const debugPanelIcon = (left, isLeftActive): React.CSSProperties => ({
  ...commonIconStyle,
  borderWidth: '2px',
  borderStyle: 'solid ',
  borderColor: '#555',
  [left ? 'borderLeftWidth' : 'borderRightWidth']: '6px',
  width: '16px',
  height: '14px',
  ...(left === isLeftActive && {
    borderColor: '#6495ed',
  }),
});

const debugPanelRoot = (left): React.CSSProperties => ({
  position: 'fixed',
  [left ? 'left' : 'right']: 0,
  top: 0,
  zIndex: 999999999,
  width: '350px',
  height: '100vh',
  color: '#313941',
  background: '#fff',
  lineHeight: 1.1,
  fontSize: '12px',
  overflowY: 'scroll',
  [left ? 'borderRight' : 'borderLeft']: '1px solid rgba(0, 0, 0, 0.2)',
  boxShadow: '0 0 8px rgba(0, 0, 0, .1)',
});

const debugHeaderContainer = (): React.CSSProperties => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px',
  margin: '0 -4px 4px',
  overflow: 'hidden',
  background: '#f3f3f3',
  borderTop: '1px solid #d0d0d0',
  borderBottom: '1px solid #d0d0d0',
});

const debugHeader = (): React.CSSProperties => ({
  fontSize: '14px',
  fontWeight: 'bold',
});

const debugNoData = (): React.CSSProperties => ({
  padding: '8px',
  color: 'rgba(0, 0, 0, 0.75)',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.05)',
  marginBottom: '4px',
});

const debugPanelSelectContainer = (): React.CSSProperties => ({
  width: 'auto',
});

const debugPanelBody: React.CSSProperties = {
  overflowWrap: 'break-word',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  hyphens: 'auto',
};

const debugPanel: React.CSSProperties = {
  padding: '0 4px',
};
