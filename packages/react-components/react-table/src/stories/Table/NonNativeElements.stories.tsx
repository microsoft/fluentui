import * as React from 'react';
import {
  Folder16Regular as FolderRegular,
  Edit16Regular as EditRegular,
  Open16Regular as OpenRegular,
  Document16Regular as DocumentRegular,
  People16Regular as PeopleRegular,
  DocumentPdf16Regular as DocumentPdfRegular,
  Video16Regular as VideoRegular,
} from '@fluentui/react-icons';
import { Avatar } from '@fluentui/react-avatar';
import { TableCell, TableRow } from '../../index';

export const NonNativeElements = () => {
  return (
    <div role="table" style={{ width: '100%' }}>
      <div role="rolegroup">
        <TableRow as="div">
          <TableCell as="div" media={<DocumentRegular />}>
            Meeting notes
          </TableCell>
          <TableCell as="div" media={<Avatar name="Max Mustermann" badge={{ status: 'available' }} />}>
            Max Mustermann
          </TableCell>
          <TableCell as="div">7h ago</TableCell>
          <TableCell as="div" media={<EditRegular />}>
            You edited this
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell as="div" media={<FolderRegular />}>
            Thursday presentation
          </TableCell>
          <TableCell as="div" media={<Avatar name="Erika Mustermann" badge={{ status: 'away' }} />}>
            Erika Mustermann
          </TableCell>
          <TableCell as="div">Yesterday at 1:45 PM</TableCell>
          <TableCell as="div" media={<OpenRegular />}>
            You recently opened this
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell as="div" media={<VideoRegular />}>
            Training recording
          </TableCell>
          <TableCell as="div" media={<Avatar name="John Doe" badge={{ status: 'away' }} />}>
            John Doe
          </TableCell>
          <TableCell as="div">Yesterday at 1:45 PM</TableCell>
          <TableCell as="div" media={<OpenRegular />}>
            You recently opened this
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell as="div" media={<DocumentPdfRegular />}>
            Purchase order
          </TableCell>
          <TableCell as="div" media={<Avatar name="Jane Doe" badge={{ status: 'away' }} />}>
            Jane Doe
          </TableCell>
          <TableCell as="div">Tue at 9:30 AM</TableCell>
          <TableCell as="div" media={<PeopleRegular />}>
            You shared this in a Teams chat
          </TableCell>
        </TableRow>
      </div>
    </div>
  );
};
