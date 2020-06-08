import * as React from 'react';
import { Button, Checkbox, Image, RadioGroup, RadioGroupItemProps } from '@fluentui/react-northstar';
import { DesignerMode } from './types';
import { OpenOutsideIcon, TrashCanIcon } from '@fluentui/react-icons-northstar';

const Toolbar = ({
  isExpanding,
  isSelecting,
  onExpandLayoutChange,
  onModeChange,
  onReset,
  onShowCodeChange,
  onShowJSONTreeChange,
  onSelectingChange,
  mode,
  showCode,
  showJSONTree,
  style,
}: {
  isExpanding: boolean;
  isSelecting: boolean;
  onExpandLayoutChange: (isExpanding: boolean) => void;
  onModeChange: (mode: DesignerMode) => void;
  onReset: () => void;
  onShowCodeChange: (showCode: boolean) => void;
  onShowJSONTreeChange: (showJSONTree: boolean) => void;
  onSelectingChange: (isSelecting: boolean) => void;
  mode: DesignerMode;
  showCode: boolean;
  showJSONTree: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: 'flex',
      padding: '0 1rem',
      alignItems: 'center',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.25)',
      ...style,
    }}
  >
    <Image styles={{ height: '1.5rem', marginRight: '0.25rem' }} src={`public/images/fluent-ui-logo.png`} />
    <div style={{ position: 'relative', width: '8em', fontSize: '18px', lineHeight: 1 }}>
      FluentUI
      <div style={{ position: 'absolute', fontSize: '11px', opacity: 0.625 }}>Builder</div>
    </div>
    <div>
      <strong>Mode:</strong>
      &emsp;
      <RadioGroup
        style={{ display: 'inline-block' }}
        checkedValue={mode}
        onCheckedValueChange={(e, data: RadioGroupItemProps & { value: DesignerMode }) => {
          onModeChange(data.value);
        }}
        items={[
          {
            key: 'build',
            label: 'Build',
            value: 'build',
          },
          {
            key: 'design',
            label: 'Design',
            value: 'design',
          },
          {
            key: 'use',
            label: 'Use',
            value: 'use',
          },
        ]}
      />
    </div>
    &nbsp; &nbsp;
    <Button
      text
      icon={<OpenOutsideIcon />}
      content="Popout"
      onClick={() => {
        window.open(`/builder/maximize${window.location.hash}`, '_blank', 'noopener noreferrer');
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
      {/*
      <Checkbox
        toggle
        label="Expand Layout"
        checked={!!isExpanding}
        onChange={(e, data) => onExpandLayoutChange(data.checked)}
      />
      &emsp;
      <Checkbox
        toggle
        label="Select Components"
        checked={!!isSelecting}
        onChange={(e, data) => onSelectingChange(data.checked)}
      />
      &emsp;
      */}
      <Checkbox label="Show Code" toggle checked={!!showCode} onChange={(e, data) => onShowCodeChange(data.checked)} />
      &emsp;
      <Checkbox
        label="Show JSON"
        toggle
        checked={!!showJSONTree}
        onChange={(e, data) => onShowJSONTreeChange(data.checked)}
      />
      &emsp;
      <Button text onClick={onReset} icon={<TrashCanIcon />} content="Start Over" />
    </div>
  </div>
);

export default Toolbar;
