import * as React from 'react';

const TrashAltRegularIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="far"
    data-icon="trash-alt"
    className="svg-inline--fa fa-trash-alt fa-w-14"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    style={props?.style}
  >
    <path
      fill="currentColor"
      d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"
    />
  </svg>
);

const LevelUpAltIcon = props => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="level-up-alt"
    className="svg-inline--fa fa-level-up-alt fa-w-10"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 320 512"
    style={props?.style}
  >
    <path
      fill="currentColor"
      d="M313.553 119.669L209.587 7.666c-9.485-10.214-25.676-10.229-35.174 0L70.438 119.669C56.232 134.969 67.062 160 88.025 160H152v272H68.024a11.996 11.996 0 0 0-8.485 3.515l-56 56C-4.021 499.074 1.333 512 12.024 512H208c13.255 0 24-10.745 24-24V160h63.966c20.878 0 31.851-24.969 17.587-40.331z"
    />
  </svg>
);

export const DebugButton: React.FunctionComponent<React.HTMLAttributes<HTMLButtonElement>> = props => {
  return (
    <button
      style={{
        border: 'none',
        background: 'none',
        color: 'inherit',
        padding: '0 0 0 .5em',
        outline: 'none',
      }}
      {...props}
    />
  );
};

export const TrashDebugButton: React.FunctionComponent<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
}> = props => (
  <DebugButton {...props}>
    <TrashAltRegularIcon style={{ widht: '1em', height: '1em' }} />
  </DebugButton>
);

export const LevelUpDebugButton: React.FunctionComponent<{
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  title: string;
}> = props => (
  <DebugButton {...props}>
    <LevelUpAltIcon style={{ widht: '1em', height: '1em' }} />
  </DebugButton>
);
