/**
 * Enumerates special file type icons that do not map to any file extensions.
 * For example, the 'pptx' icon maps to the extensions 'ppt', 'pptm', 'pptx',
 * but the 'folder' icon does not map to any extensions and should be obtained
 * via this enum.
 */

export const enum FileIconType {
    Docset = 1, // Start at 1 so it will evaluate as "truthy"
    Folder,
    GenericFile,
    ListItem,
    SharedFolder
}
