import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { getId } from 'office-ui-fabric-react/lib/Utilities';
import { useConst } from '@uifabric/react-hooks';
import { mergeStyleSets, getTheme } from 'office-ui-fabric-react/lib/Styling';

const theme = getTheme();
const classNames = mergeStyleSets({
  photoList: {
    display: 'inline-block',
    border: '1px solid ' + theme.palette.neutralTertiary,
    padding: 10,
    lineHeight: 0,
    overflow: 'hidden'
  },
  photoCell: {
    position: 'relative',
    display: 'inline-block',
    padding: 2,
    boxSizing: 'border-box',
    selectors: {
      '&:focus': {
        outline: 'none'
      },
      '&:focus:after': {
        content: '""',
        position: 'absolute',
        right: 4,
        left: 4,
        top: 4,
        bottom: 4,
        border: '1px solid ' + theme.palette.white,
        outline: '2px solid ' + theme.palette.themePrimary
      }
    }
  }
});

const MAX_COUNT = 20;

interface IPhoto {
  id: string;
  url: string;
  width: number;
  height: number;
}

export const FocusZonePhotosExample: React.FunctionComponent = () => {
  //  Initialize the items when the component is first rendered (same array will be reused)
  const items = useConst(_getItems);
  return (
    <FocusZone as="ul" className={classNames.photoList}>
      {items.map((item: IPhoto, index: number) => (
        <li
          key={item.id}
          className={classNames.photoCell}
          aria-posinset={index + 1}
          aria-setsize={items.length}
          aria-label="Photo"
          data-is-focusable={true}
        >
          <Image src={item.url} width={item.width} height={item.height} alt={`${item.width} by ${item.height} placeholder image`} />
        </li>
      ))}
    </FocusZone>
  );
};

function _getItems(): IPhoto[] {
  const items: IPhoto[] = [];

  for (let i = 0; i < MAX_COUNT; i++) {
    const randomWidth = 50 + Math.floor(Math.random() * 150);

    items.push({
      id: getId('photo'),
      url: `http://placehold.it/${randomWidth}x100`,
      width: randomWidth,
      height: 100
    });
  }

  return items;
}
