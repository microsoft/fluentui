import { memo } from 'react';
import { DEFAULT_BASE_URL } from './initializeFileTypeIcons';
import { FileIconType } from './FileIconType';
import type { FileTypeIconSize } from './getFileTypeIconProps';
import {
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  DEFAULT_ICON_SIZE
} from './getFileTypeIconProps';
import {
    makeStyles,
    shorthands
} from '@fluentui/react-components';

const useStyles = (size: FileTypeIconSize) => makeStyles({
    root: {
        display: 'inline-block',
        width: `${size}px`,
        ...shorthands.overflow('hidden'),
        fontWeight: 'normal',
        fontStyle: 'normal'
    }
})();

export const FileTypeIcon = memo(({
    size = DEFAULT_ICON_SIZE,
    ...props
}: { fileName: string; size?: FileTypeIconSize; }) => {
    const styles = useStyles(size);
    const baseUrl = DEFAULT_BASE_URL;
    const baseSuffix = getFileTypeIconSuffix(size, 'svg'); // eg: 96_3x_svg or 96_png
    const suffixArray = baseSuffix.split('_'); // eg: ['96', '3x', 'svg']
    const fileNameSplit = props.fileName.split('.');
    const baseIconName = fileNameSplit.length > 1 ? getFileTypeIconNameFromExtensionOrType(fileNameSplit[fileNameSplit.length - 1], undefined) : getFileTypeIconNameFromExtensionOrType(undefined, FileIconType.genericFile); // eg: docx
    
    if (suffixArray.length === 3) {
        /** suffix is of type 96_3x_svg  - it has a pixel ratio > 1*/
        return <i className={styles.root}><img src={`${baseUrl}${size}_${suffixArray[1]}/${baseIconName}.${suffixArray[2]}`} height="100%" width="100%" alt={baseIconName} /></i>;
    } 
    /** suffix is of type 96_svg  - it has a pixel ratio of 1*/
    return <i className={styles.root}><img src={`${baseUrl}${size}/${baseIconName}.${suffixArray[1]}`} alt={baseIconName} /></i>;
});
