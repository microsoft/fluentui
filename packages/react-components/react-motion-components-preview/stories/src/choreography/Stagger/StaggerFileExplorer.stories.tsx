import * as React from 'react';
import {
  Button,
  Card,
  Text,
  makeStyles,
  tokens,
  createPresenceComponentVariant,
  motionTokens,
  Badge,
} from '@fluentui/react-components';
import { Stagger, Collapse } from '@fluentui/react-motion-components-preview';
import {
  Folder20Regular,
  Document20Regular,
  Image20Regular,
  Video20Regular,
  Archive20Regular,
  Code20Regular,
  MoreHorizontal20Regular,
  Eye20Regular,
  Share20Regular,
} from '@fluentui/react-icons';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    padding: '20px',
    maxWidth: '800px',
  },
  controls: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    border: `${tokens.strokeWidthThicker} solid ${tokens.colorNeutralForeground3}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow8,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fileCard: {
    cursor: 'pointer',
    transition: `all ${tokens.durationFast} ${tokens.curveDecelerateMin}`,
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralForeground3}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground1Hover,
    },
  },
  fileContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
  },
  fileIcon: {
    flexShrink: 0,
  },
  fileInfo: {
    flex: 1,
    minWidth: 0,
  },
  fileName: {
    display: 'block',
    marginBottom: '2px',
  },
  fileDetails: {
    display: 'flex',
    gap: '16px',
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground2,
  },
  fileActions: {
    display: 'flex',
    gap: '4px',
    opacity: 0,
    transition: `opacity ${tokens.durationFast}`,
  },
  'fileCard:hover fileActions': {
    opacity: 1,
  },
  fileBadges: {
    display: 'flex',
    gap: '4px',
    marginLeft: '8px',
  },
  ctaButton: {
    minWidth: '120px',
  },
});

// Collapse animation for file appearance
const CollapseVariant = createPresenceComponentVariant(Collapse, {
  duration: motionTokens.durationSlow,
});

interface FileItem {
  id: number;
  name: string;
  type: 'folder' | 'document' | 'image' | 'video' | 'archive' | 'code';
  size?: string;
  modified: string;
  isShared?: boolean;
  isRecent?: boolean;
}

// Sample file system items
const fileItems: FileItem[] = [
  {
    id: 1,
    name: 'Documents',
    type: 'folder',
    modified: '2 hours ago',
    isShared: true,
  },
  {
    id: 2,
    name: 'Project_Proposal.docx',
    type: 'document',
    size: '2.4 MB',
    modified: '1 hour ago',
    isRecent: true,
  },
  {
    id: 3,
    name: 'Screenshots',
    type: 'folder',
    modified: '3 hours ago',
  },
  {
    id: 4,
    name: 'hero-banner.jpg',
    type: 'image',
    size: '1.8 MB',
    modified: '45 minutes ago',
    isRecent: true,
  },
  {
    id: 5,
    name: 'demo-video.mp4',
    type: 'video',
    size: '24.5 MB',
    modified: '2 days ago',
  },
  {
    id: 6,
    name: 'src',
    type: 'folder',
    modified: '30 minutes ago',
    isRecent: true,
  },
  {
    id: 7,
    name: 'component.tsx',
    type: 'code',
    size: '12.3 KB',
    modified: '15 minutes ago',
    isRecent: true,
  },
  {
    id: 8,
    name: 'backup.zip',
    type: 'archive',
    size: '156.7 MB',
    modified: '1 week ago',
  },
  {
    id: 9,
    name: 'styles.css',
    type: 'code',
    size: '8.9 KB',
    modified: '25 minutes ago',
    isRecent: true,
  },
  {
    id: 10,
    name: 'presentation.pptx',
    type: 'document',
    size: '5.6 MB',
    modified: '3 days ago',
  },
];

// File type to icon mapping
const getFileIcon = (type: FileItem['type']) => {
  switch (type) {
    case 'folder':
      return <Folder20Regular />;
    case 'document':
      return <Document20Regular />;
    case 'image':
      return <Image20Regular />;
    case 'video':
      return <Video20Regular />;
    case 'archive':
      return <Archive20Regular />;
    case 'code':
      return <Code20Regular />;
    default:
      return <Document20Regular />;
  }
};

// File type to color mapping
const getFileColor = (type: FileItem['type']): 'brand' | 'success' | 'warning' | 'danger' | 'informative' => {
  switch (type) {
    case 'folder':
      return 'brand';
    case 'document':
      return 'informative';
    case 'image':
      return 'success';
    case 'video':
      return 'danger';
    case 'archive':
      return 'warning';
    case 'code':
      return 'brand';
    default:
      return 'informative';
  }
};

export const FileExplorer = () => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(false);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Button className={classes.ctaButton} appearance="primary" size="large" onClick={() => setVisible(v => !v)}>
          {visible ? 'Hide' : 'Show'} Files
        </Button>
      </div>

      <div className={classes.fileList}>
        <Stagger presence visible={visible} appear itemDelay={80} itemDuration={400}>
          {fileItems.map(file => (
            <CollapseVariant key={file.id}>
              <Card className={classes.fileCard}>
                <div className={classes.fileContent}>
                  <div className={classes.fileIcon}>{getFileIcon(file.type)}</div>

                  <div className={classes.fileInfo}>
                    <Text weight="medium" className={classes.fileName} truncate>
                      {file.name}
                    </Text>
                    <div className={classes.fileDetails}>
                      {file.size && <span>{file.size}</span>}
                      <span>Modified {file.modified}</span>
                    </div>
                  </div>

                  <div className={classes.fileBadges}>
                    {file.isRecent && (
                      <Badge appearance="tint" color="success" size="small">
                        Recent
                      </Badge>
                    )}
                    {file.isShared && (
                      <Badge appearance="tint" color="brand" size="small">
                        Shared
                      </Badge>
                    )}
                    <Badge appearance="outline" color={getFileColor(file.type)} size="small">
                      {file.type}
                    </Badge>
                  </div>

                  <div className={classes.fileActions}>
                    <Button appearance="subtle" icon={<Eye20Regular />} size="small" />
                    <Button appearance="subtle" icon={<Share20Regular />} size="small" />
                    <Button appearance="subtle" icon={<MoreHorizontal20Regular />} size="small" />
                  </div>
                </div>
              </Card>
            </CollapseVariant>
          ))}
        </Stagger>
      </div>
    </div>
  );
};

FileExplorer.parameters = {
  docs: {
    description: {
      story:
        'A file explorer interface showing files and folders with staggered collapse animations. ' +
        'Features file type icons, metadata display, status badges, and quick actions. ' +
        'Perfect for file management interfaces, cloud storage apps, or document libraries.',
    },
  },
};
