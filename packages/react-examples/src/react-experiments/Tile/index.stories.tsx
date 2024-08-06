import * as React from 'react';

import { TileDocumentExample } from './Tile.Document.Example';
import { TileFolderExample } from './Tile.Folder.Example';
import { TileMediaExample } from './Tile.Media.Example';

export const Document = () => <TileDocumentExample />;

export const Folder = () => <TileFolderExample />;

export const Media = () => <TileMediaExample />;

export default {
  title: 'Components/Tile',
};
