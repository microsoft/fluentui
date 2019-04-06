/**
 * This script uses the icon mapping from file-type-icons/fileTypeIconMap.json and the
 * icons from fabric-cdn and produces an Asset Catalog compatible with Xcode for
 * distribution on iOS and Mac applications.
 *
 * author: kotachte
 */

const fs = require('fs');
const path = require('path');
const argv = require('yargs').argv;
const fileIconMap = require('../packages/file-type-icons/fileTypeIconMap.json');

const assetCatalogContentsJsonFileName = 'Contents.json';
const catalogFolderName = './app-min/assets/FabricFileTypeIcons.xcassets';
const imageAssetPrefix = 'filetype_';

const ICONS_FOLDER_PATH = argv.icons;
const PATH_TO_SAVE_CATALOG = argv.out;

if (!ICONS_FOLDER_PATH) {
  throw new Error(
    'Must specify the folder that contains the fabric-cdn icons. Use --icons=<icons> to provide a path (most often app-min/assets/item-types-fluent).'
  );
}

if (!PATH_TO_SAVE_CATALOGn) {
  throw new Error('Must specify path to save the generated asset catalog. Use --out=<out> to provide a path.');
}

main(ICONS_FOLDER_PATH, PATH_TO_SAVE_CATALOG);

function main(iconsFolderPath, pathToSaveCatalog) {
  const catalogFilePath = pathToSaveCatalog + path.sep + catalogFolderName;

  // delete existing asset catalog folder
  deleteFolder(catalogFilePath);

  // create asset catalog folder
  createFolder(catalogFilePath);

  // create asset catalog Contents.json
  const assetCatalogContents = getAssetCatalogContentsJson();
  createFileWithContentsInPath(assetCatalogContentsJsonFileName, assetCatalogContents, catalogFilePath);

  const filesInAssetsFolder = [];

  getFilesFromFolderRecursive(iconsFolderPath, filesInAssetsFolder);

  const iconGroupings = getIconGroupingsFromMap(fileIconMap);
  for (var i = 0; i < iconGroupings.length; i++) {
    const iconGroupingToProcess = iconGroupings[i];

    const iconGroupingFilePaths = getFilePathForIconGrouping(iconGroupingToProcess, iconsFolderPath, filesInAssetsFolder);

    if (!iconGroupingFilePaths || iconGroupingFilePaths.length < 1) {
      console.log('Could not find corresponding image assets for icon groupping: ' + iconGroupingToProcess);

      continue;
    }

    for (var j = 0; j < iconGroupingFilePaths.length; j++) {
      const iconGroupingFilePath = iconGroupingFilePaths[j];
      const size = path
        .dirname(iconGroupingFilePath)
        .split(path.sep)
        .pop();

      // create asset ImageSet folder
      const iconGroupingAssetFolderPath = catalogFilePath + path.sep + imageAssetPrefix + iconGroupingToProcess + '_' + size + '.imageset';
      createFolder(iconGroupingAssetFolderPath);

      // copy ImageSet
      copyFile(iconGroupingFilePath, iconGroupingAssetFolderPath, size);

      // create ImageSet contents file
      const imageAssetContents = generateImageAssetContentsJsonForIconGrouping(iconGroupingToProcess, iconGroupingFilePath, size);
      createFileWithContentsInPath(assetCatalogContentsJsonFileName, imageAssetContents, iconGroupingAssetFolderPath);
    }
  }
}

function copyFile(sourceFilePath, destinationFolderPath, size) {
  const destinationFilePath =
    destinationFolderPath +
    path.sep +
    imageAssetPrefix +
    path
      .basename(sourceFilePath)
      .split('.')
      .slice(0, -1)
      .join('.') +
    '_' +
    size +
    path.extname(sourceFilePath);

  fs.copyFileSync(sourceFilePath, destinationFilePath.toLowerCase());
}

function deleteFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    return;
  }

  const files = fs.readdirSync(folderPath) || [];
  for (var i = 0; i < files.length; i++) {
    const filePath = folderPath + path.sep + files[i];

    if (fs.statSync(filePath).isFile()) {
      fs.unlinkSync(filePath);
    } else {
      deleteFolder(filePath);
    }
  }

  fs.rmdirSync(folderPath);
}

function createFolder(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
}

function createFileWithContentsInPath(fileName, fileContents, folderPath) {
  const filePath = folderPath + path.sep + fileName;

  fs.writeFileSync(filePath, JSON.stringify(fileContents, null, '\t'), {
    flag: 'w'
  });
}

function generateImageAssetContentsJsonForIconGrouping(iconGroupingName, imageAssetFilePath, size) {
  const imageAssetExt = '.pdf';

  return {
    images: [
      {
        idiom: 'universal',
        filename: imageAssetPrefix + iconGroupingName + '_' + size + imageAssetExt
      }
    ],
    info: {
      version: 1,
      author: 'xcode'
    },
    properties: {
      'preserves-vector-representation': true
    }
  };
}

function getFilePathForIconGrouping(iconGroupingName, rootAssetPath, filesInAssetsFolder) {
  const fileNameToFind = iconGroupingName + '.pdf';

  const filePathsFound = [];
  for (var i = 0; i < filesInAssetsFolder.length; i++) {
    const file = filesInAssetsFolder[i];

    if (file.toLowerCase().endsWith(path.sep + fileNameToFind)) {
      filePathsFound.push(file);
    }
  }

  return filePathsFound;
}

function getFilesFromFolderRecursive(folderPath, existingFiles) {
  if (!fs.existsSync(folderPath)) {
    return existingFiles;
  }

  const files = fs.readdirSync(folderPath) || [];
  for (var i = 0; i < files.length; i++) {
    const filePath = folderPath + path.sep + files[i];

    if (fs.statSync(filePath).isFile()) {
      if (filePath.toLowerCase().endsWith('.pdf')) {
        existingFiles.push(filePath);
      }
    } else {
      getFilesFromFolderRecursive(filePath, existingFiles);
    }
  }
}

function getIconGroupingsFromMap(fileIconsMaps) {
  const iconGroupNames = [];
  for (var i in fileIconsMaps) {
    if (fileIconsMaps.hasOwnProperty(i)) {
      const iconGroupName = i;

      iconGroupNames.push(iconGroupName);
    }
  }

  return iconGroupNames;
}

function getAssetCatalogContentsJson() {
  return {
    info: {
      version: 1,
      author: 'xcode'
    }
  };
}
