import * as React from 'react';
import { Button, Checkbox, Image, RadioGroup, RadioGroupItemProps, EyeIcon } from '@fluentui/react-northstar';
import { DesignerMode } from './types';
import { OpenOutsideIcon, TrashCanIcon, FilesUploadIcon } from '@fluentui/react-icons-northstar';

export type ToolbarProps = {
  isExpanding: boolean;
  isSelecting: boolean;
  onModeChange: (mode: DesignerMode) => void;
  onReset: () => void;
  showAxeErrors: () => void;
  onUpload: (jsonTree: {}) => void;
  onShowCodeChange: (showCode: boolean) => void;
  onShowJSONTreeChange: (showJSONTree: boolean) => void;
  onShowAccSpecChange: (showAccSpec: boolean) => void;
  eenabledVirtualCursor: boolean;
  onEnableVirtualCursor: (enableVirtualCursor: boolean) => void;
  mode: DesignerMode;
  showCode: boolean;
  showJSONTree: boolean;
  showAccSpec: boolean;
  style?: React.CSSProperties;
};

export const Toolbar: React.FunctionComponent<ToolbarProps> = ({
  isExpanding,
  isSelecting,
  onModeChange,
  onReset,
  showAxeErrors,
  onUpload,
  onShowCodeChange,
  onShowJSONTreeChange,
  mode,
  showCode,
  showJSONTree,
  style,
  eenabledVirtualCursor,
  onEnableVirtualCursor,
  onShowAccSpecChange,
  showAccSpec,
}) => {
  const uploadInputRef = React.useRef<HTMLInputElement>();
  return (
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
        <strong id="editor-mode-label">Mode:</strong>
        &emsp;
        <RadioGroup
          aria-labelledby="editor-mode-label"
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
        <Checkbox
          label="Enable virtual cursor"
          toggle
          checked={!!eenabledVirtualCursor}
          onChange={(e, data) => onEnableVirtualCursor(data.checked)}
        />
        &emsp;
        <Checkbox
          label="Show Code"
          toggle
          checked={!!showCode}
          onChange={(e, data) => onShowCodeChange(data.checked)}
        />
        &emsp;
        <Checkbox
          label="Show JSON"
          toggle
          checked={!!showJSONTree}
          onChange={(e, data) => onShowJSONTreeChange(data.checked)}
        />
        &emsp;
        <Checkbox
          label="Show Acc Spec"
          toggle
          checked={!!showAccSpec}
          onChange={(e, data) => {
            onShowAccSpecChange(data.checked);
          }}
        />
        &emsp;
        <input
          hidden
          onChange={e => {
            const fr = new FileReader();
            console.log();
            fr.onload = event => {
              const result = JSON.parse(event.target.result as string);
              console.log('File content:', event.target.result);
              console.log(result);
              onUpload(result);
            };
            fr.readAsText(e.target.files[0]);
          }}
          type="file"
          ref={uploadInputRef}
        />
        <Button
          text
          onClick={() => {
            uploadInputRef.current.click();
          }}
          icon={<FilesUploadIcon />}
          content="Upload"
        />
        &emsp;
        <Button text onClick={showAxeErrors} icon={<EyeIcon />} content="Accessibility check" />
        &emsp;
        <Button text onClick={onReset} icon={<TrashCanIcon />} content="Start Over" />
      </div>
    </div>
  );
};
