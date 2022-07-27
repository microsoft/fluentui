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
import { TableCell, TableRow, TableBody, Table } from '../../index';

export const SizeSmall = () => {
  return (
    <Table size="small">
      <TableBody>
        <TableRow>
          <TableCell media={<DocumentRegular />}>Meeting notes</TableCell>
          <TableCell media={<Avatar name="Max Mustermann" badge={{ status: 'available' }} size={24} />}>
            Max Mustermann
          </TableCell>
          <TableCell>7h ago</TableCell>
          <TableCell media={<EditRegular />}>You edited this</TableCell>
        </TableRow>
        <TableRow>
          <TableCell media={<FolderRegular />}>Thursday presentation</TableCell>
          <TableCell media={<Avatar name="Erika Mustermann" badge={{ status: 'away' }} size={24} />}>
            Erika Mustermann
          </TableCell>
          <TableCell>Yesterday at 1:45 PM</TableCell>
          <TableCell media={<OpenRegular />}>You recently opened this</TableCell>
        </TableRow>
        <TableRow>
          <TableCell media={<VideoRegular />}>Training recording</TableCell>
          <TableCell media={<Avatar name="John Doe" badge={{ status: 'away' }} size={24} />}>John Doe</TableCell>
          <TableCell>Yesterday at 1:45 PM</TableCell>
          <TableCell media={<OpenRegular />}>You recently opened this</TableCell>
        </TableRow>
        <TableRow>
          <TableCell media={<DocumentPdfRegular />}>Purchase order</TableCell>
          <TableCell media={<Avatar name="Jane Doe" badge={{ status: 'away' }} size={24} />}>Jane Doe</TableCell>
          <TableCell>Tue at 9:30 AM</TableCell>
          <TableCell media={<PeopleRegular />}>You shared this in a Teams chat</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
