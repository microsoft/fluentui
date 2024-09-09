import * as React from 'react';

import { TilesListBasicExample } from './TilesList.Basic.Example';
import { TilesListDocumentExample } from './TilesList.Document.Example';
import { TilesListMediaExample } from './TilesList.Media.Example';

export const Basic = () => <TilesListBasicExample />;

export const DocumentSmall = () => <TilesListDocumentExample tileSize="small" />;

export const DocumentLarge = () => <TilesListDocumentExample tileSize="large" />;

export const Media = () => <TilesListMediaExample />;

export default {
  title: 'Components/TilesList',
};
