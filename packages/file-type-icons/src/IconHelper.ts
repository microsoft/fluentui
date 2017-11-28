import FileTypeIconMap from './FileTypeIconMap';

let _extensionToIconName: { [key: string]: string };

const GENERIC_FILE = 'genericfile';

/**
 * This function returns the name of a file type icon given the item extension and desired size.
 * It also accounts for different device pixel ratios.
 * For example, getIconName('docx', 16) 'returns docx16' or 'docx16_2x' depending on device pixel ratio.
 * 
 * @param extension File type extension such as docx
 * @param size Desired size of the icon
 */
export function getIconName(extension: string, size: number): string {

    let iconNameNoSize: string = getIconNameFromExtension(extension);

    // Sizes are 16, 20, 32, 40, 48, 64, 96.
    // For each of these sizes, there is also a set of 2x images for higher screen resolution.
    // If this is a retina display, use 2x images
    let isRetinaSupported: boolean = window.devicePixelRatio > 1;
    
    let iconName: string = iconNameNoSize +
                        size +
                        (isRetinaSupported ? '_2x' : '');

    return iconName;

}

export function getIconNameFromExtension(extension: string): string {
    if (!_extensionToIconName) {
        _extensionToIconName = { };

        for (var iconName in FileTypeIconMap) {
            var extensions = FileTypeIconMap[iconName].extensions;

            if (extensions) {
                for (var i = 0; i < extensions.length; i++) {
                    _extensionToIconName[extensions[i]] = iconName;
                }
            }
        }
    }

    // Strip periods, force lowercase.
    extension = extension.replace('.', '').toLowerCase();

    return _extensionToIconName[extension] || GENERIC_FILE;
}
