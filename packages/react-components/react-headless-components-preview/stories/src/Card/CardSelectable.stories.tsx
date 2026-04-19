import * as React from 'react';
import type { CardOnSelectionChangeEvent } from '@fluentui/react-headless-components-preview';
import { Card, CardHeader, CardPreview } from '@fluentui/react-headless-components-preview';
import { MoreHorizontalRegular } from '@fluentui/react-icons';

const classes = {
  card:
    'relative flex flex-col gap-3 w-80 p-3 bg-white rounded-lg border border-gray-200 shadow-sm cursor-pointer ' +
    'hover:bg-gray-50 transition-colors ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ' +
    'data-[state=checked]:border-blue-500 data-[state=checked]:ring-2 data-[state=checked]:ring-blue-500 ' +
    'aria-disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:hover:bg-white',
  checkbox:
    'absolute top-3 left-3 h-4 w-4 cursor-pointer accent-blue-600 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
  preview: 'flex items-center justify-center bg-gray-100 rounded-md overflow-hidden -mx-3 -mt-3',
  previewImage: 'block w-full h-40 object-cover',
  header: 'flex items-center gap-3 pl-6',
  headerImage: 'flex h-10 w-10 rounded-md overflow-hidden bg-gray-100',
  headerImg: 'h-full w-full object-cover',
  headerTitle: 'text-sm font-semibold text-gray-900 leading-tight',
  headerDescription: 'text-xs text-gray-500 leading-tight',
  headerAction: 'ml-auto flex items-center',
  iconButton:
    'inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-600 ' +
    'hover:bg-gray-100 active:bg-gray-200 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
  body: 'text-sm text-gray-700 leading-snug',
  status: 'text-xs text-gray-500',
};

const CardContent = ({ title }: { title: string }): React.ReactNode => (
  <>
    <CardPreview className={classes.preview}>
      <img
        className={classes.previewImage}
        src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/image.png"
        alt="Preview"
      />
    </CardPreview>

    <CardHeader
      className={classes.header}
      image={
        <div className={classes.headerImage}>
          <img
            className={classes.headerImg}
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png"
            alt=""
          />
        </div>
      }
      header={<div className={classes.headerTitle}>{title}</div>}
      description={<div className={classes.headerDescription}>Developer</div>}
      action={
        <div className={classes.headerAction}>
          <button type="button" aria-label="More options" className={classes.iconButton}>
            <MoreHorizontalRegular />
          </button>
        </div>
      }
    />

    <div className={classes.body}>
      Donut chocolate bar oat cake. Dragée tiramisu lollipop bear claw. Marshmallow pastry jujubes toffee sugar plum.
    </div>
  </>
);

export const Selectable = (): React.ReactNode => {
  const [selected, setSelected] = React.useState(false);

  const onSelectionChange = (_event: CardOnSelectionChangeEvent, data: { selected: boolean }) => {
    setSelected(data.selected);
  };

  return (
    <div className="flex flex-col gap-3">
      <Card
        className={classes.card}
        data-state={selected ? 'checked' : 'unchecked'}
        selected={selected}
        onSelectionChange={onSelectionChange}
        checkbox={{ className: classes.checkbox, 'aria-label': 'Select card' }}
      >
        <CardContent title="Selectable card" />
      </Card>

      <p className={classes.status}>Selected: {String(selected)}</p>
    </div>
  );
};
