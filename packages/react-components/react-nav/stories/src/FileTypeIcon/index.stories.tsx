import { FileIconType, FileTypeIcon, getFileTypeIconAsUrl, getFileTypeIconProps } from '@fluentui/react-file-type-icons';

export const Default = () => (
  <div>
    <FileTypeIcon extension="docx" />
    <FileTypeIcon extension="xlsx" size={20} />
    <FileTypeIcon extension="pptx" size={24} />
    <FileTypeIcon type={FileIconType.folder} size={32} imageFileType="png" />
    <FileTypeIcon extension="unknown" size={40} />
  </div>
);

export const ByFileIconType = () => (
  <div>
    <FileTypeIcon type={FileIconType.folder} size={20} />
    <FileTypeIcon type={FileIconType.sharedFolder} size={24} />
    <FileTypeIcon type={FileIconType.list} size={32} />
    <FileTypeIcon type={FileIconType.campaign} size={40} />
  </div>
);

export const SizeAndFormats = () => (
  <div>
    <FileTypeIcon extension="pdf" size={16} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={24} imageFileType="svg" />
    <FileTypeIcon extension="pdf" size={32} imageFileType="png" />
    <FileTypeIcon extension="pdf" size={48} imageFileType="png" />
  </div>
);

export const CustomBaseUrl = () => (
  <div>
    <FileTypeIcon
      extension="docx"
      size={24}
      baseUrl="https://res.cdn.office.net/files/fabric-cdn-prod_20250805.001/assets/item-types/"
    />
    <FileTypeIcon
      type={FileIconType.folder}
      size={24}
      baseUrl="https://res.cdn.office.net/files/fabric-cdn-prod_20250805.001/assets/item-types/"
    />
  </div>
);

export const V8UtilityInterop = () => {
  const iconProps = getFileTypeIconProps({ extension: 'docx', size: 16, imageFileType: 'svg' });
  const iconUrl = getFileTypeIconAsUrl({ extension: 'docx', size: 16, imageFileType: 'svg' });

  return (
    <div>
      <div>Utility iconName: {iconProps.iconName}</div>
      <div>Utility URL: {iconUrl}</div>
      <FileTypeIcon extension="docx" size={16} imageFileType="svg" />
    </div>
  );
};

export default {
  title: 'Components/FileTypeIcon',
  component: FileTypeIcon,
};
