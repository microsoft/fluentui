#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
/**
 * Script to apply custom styled components to the freshly built web components
 * This script runs from within packages/web-components after the build process
 * It pulls custom files from a separate repository containing the modified dist files
 */

class ComponentCustomizer {
  constructor() {
    this.targetDir = process.cwd();
    this.config = {
      customFilesRepo: 'https://github.com/NBS-Sandbox/npds-fluentui-custom-files.git',
      branch: 'main',
      tempDir: '.temp-custom-files'
    };

    this.filesToCopy = [
      // Button Component Files
      'esm/button/button.styles.js',
      'esm/button/index.js',

      // Badge Component Files
      'esm/badge/badge.styles.js',

      // Tab Component Files
      'esm/tabs/tab/tab.styles.js',
      'esm/tabs/tabs.styles.js',

      // Tooltip Component Files
      'esm/tooltip/tooltip.styles.js',

      // Icons Files
      'esm/icons/index.js',

      // Main index file (for icons export)
      'esm/index.js'
    ];
  }

  /**
   * Clone the custom files repository
   */
  cloneCustomFiles() {
    console.log('Cloning custom files repository...');

    // Clean up any existing temp directory
    if (fs.existsSync(this.config.tempDir)) {
      this.cleanupTempDir();
    }

    try {
      const cloneCommand = `git clone ${this.config.customFilesRepo} ${this.config.tempDir}`;
      if (this.config.branch && this.config.branch !== 'main') {
        execSync(`${cloneCommand} --branch ${this.config.branch}`, { stdio: 'pipe' });
      } else {
        execSync(cloneCommand, { stdio: 'pipe' });
      }

      console.log('Custom files repository cloned successfully');
      return true;
    } catch (error) {
      console.error('Failed to clone custom files repository:', error.message);
      return false;
    }
  }

  /**
   * Clean up temporary directory
   */
  cleanupTempDir() {
    try {
      if (fs.existsSync(this.config.tempDir)) {
        fs.rmSync(this.config.tempDir, { recursive: true, force: true });
        console.log('Cleaned up temporary directory');
      }
    } catch (error) {
      console.warn('Warning: Could not clean up temporary directory:', error.message);
    }
  }

  /**
   * Ensure directory exists, create if it doesn't
   */
  ensureDirectoryExists(filePath) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${path.relative(this.targetDir, dir)}`);
    }
  }

  /**
   * Copy a single file from temp directory to target
   */
  copyFile(relativePath) {
    const sourcePath = path.join(this.config.tempDir, 'dist', relativePath);
    const targetPath = path.join(this.targetDir, 'dist', relativePath);

    if (!fs.existsSync(sourcePath)) {
      console.warn(`Custom file not found: ${relativePath}`);
      return false;
    }

    // Ensure target directory exists
    this.ensureDirectoryExists(targetPath);

    // Create backup of existing file if it exists
    if (fs.existsSync(targetPath)) {
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      fs.copyFileSync(targetPath, backupPath);
      const relativeBackup = path.relative(this.targetDir, backupPath);
      console.log(`Backed up: ${path.basename(targetPath)} -> ${path.basename(relativeBackup)}`);
    }

    // Copy the file
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Applied custom: ${relativePath}`);
    return true;
  }

  /**
   * Handle special case for index.js - merge icons export with existing exports
   */
  handleIndexFile() {
    const relativePath = 'esm/index.js';
    const sourcePath = path.join(this.config.tempDir, 'dist', relativePath);
    const targetPath = path.join(this.targetDir, 'dist', relativePath);

    if (!fs.existsSync(targetPath)) {
      console.warn(`Target index.js not found: ${relativePath}`);
      return false;
    }

    // If we have a custom index.js, we need to be smart about merging it
    if (fs.existsSync(sourcePath)) {
      const customContent = fs.readFileSync(sourcePath, 'utf8');
      const targetContent = fs.readFileSync(targetPath, 'utf8');

      // Extract the icons export line
      const iconsExportMatch = customContent.match(/export \* from ['"]\.\/icons\/['"];?/);
      if (iconsExportMatch) {
        const iconsExportLine = iconsExportMatch[0];

        // Check if icons export already exists
        if (targetContent.includes(iconsExportLine)) {
          console.log(`Icons export already exists in ${relativePath}`);
          return true;
        }

        // Add icons export to the target file
        const updatedContent = targetContent.trimEnd() + '\n' + iconsExportLine + '\n';

        // Create backup
        const backupPath = `${targetPath}.backup.${Date.now()}`;
        fs.copyFileSync(targetPath, backupPath);
        console.log(`Backed up: ${path.basename(targetPath)}`);

        // Write updated content
        fs.writeFileSync(targetPath, updatedContent);
        console.log(`Added icons export to: ${relativePath}`);
        return true;
      }
    } else {
      // Just add the standard icons export
      const targetContent = fs.readFileSync(targetPath, 'utf8');
      const iconsExportLine = "export * from './icons/';";

      if (targetContent.includes(iconsExportLine)) {
        console.log(`Icons export already exists in ${relativePath}`);
        return true;
      }

      const updatedContent = targetContent.trimEnd() + '\n' + iconsExportLine + '\n';

      // Create backup
      const backupPath = `${targetPath}.backup.${Date.now()}`;
      fs.copyFileSync(targetPath, backupPath);
      console.log(`Backed up: ${path.basename(targetPath)}`);

      // Write updated content
      fs.writeFileSync(targetPath, updatedContent);
      console.log(`Added icons export to: ${relativePath}`);
      return true;
    }

    return false;
  }

  /**
   * Validate that we're in the right directory and structure exists
   */
  validateEnvironment() {
    console.log(' Validating environment...');

    // Check if we're in packages/web-components
    const currentDir = path.basename(this.targetDir);
    if (currentDir !== 'web-components') {
      console.warn(`Expected to be in 'web-components' directory, but found '${currentDir}'`);
    }

    // Check if dist directory exists (should be freshly built)
    const distPath = path.join(this.targetDir, 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error(`Built dist directory not found: ${distPath}. Please run the build process first.`);
    }

    const esmPath = path.join(distPath, 'esm');
    if (!fs.existsSync(esmPath)) {
      throw new Error(`ESM dist directory not found: ${esmPath}. Build may have failed.`);
    }

    console.log('Environment validation complete');
    console.log(`Working directory: ${this.targetDir}`);
    console.log(`Target dist: ${distPath}`);
  }

  async run() {
    try {
      console.log('Starting custom component application process...\n');

      this.validateEnvironment();

      if (!this.cloneCustomFiles()) {
        throw new Error('Failed to clone custom files repository');
      }

      console.log('\n Applying custom component files...');

      let successCount = 0;
      let failureCount = 0;

      for (const filePath of this.filesToCopy) {
        if (filePath === 'esm/index.js') {
          continue;
        }

        if (this.copyFile(filePath)) {
          successCount++;
        } else {
          failureCount++;
        }
      }

      console.log('\n Handling main index file...');
      if (this.handleIndexFile()) {
        successCount++;
      } else {
        failureCount++;
      }

      this.cleanupTempDir();

      console.log('\nCustomization Summary:');
      console.log(`Successful: ${successCount}`);
      console.log(`Failed: ${failureCount}`);

      if (failureCount > 0) {
        console.log('\n Some customizations failed to apply. Please check the warnings above.');
        process.exit(1);
      } else {
        console.log('\n All customizations applied successfully!');
        console.log('Your web components now include:');
        console.log('- NPDS design token integration');
        console.log('- Custom button styling with icon support and loading states');
        console.log('- Enhanced badge styling');
        console.log('- Updated tab components with NPDS theming');
        console.log('- Improved tooltip positioning');
        console.log('- Icon registry and exports');
        console.log('\n Ready for publishing!');
      }

    } catch (error) {
      console.error('Error during customization process:', error.message);

      // Cleanup on error
      this.cleanupTempDir();
      process.exit(1);
    }
  }
}

// Execute if run directly
const entrypoint = fileURLToPath(import.meta.url);
const invoked = process.argv[1];

if (entrypoint === invoked) {
  const customizer = new ComponentCustomizer();
  customizer.run();
}

