// verifyFileExists.test.ts
import * as path from 'path';
import * as fs from 'fs';
import { tsUtils, verifyFileExists } from '../moduleResolver';

// Setup test directory and files
const TEST_DIR = path.join(__dirname, 'test-verify-files');
const EXISTING_FILE = path.join(TEST_DIR, 'exists.txt');
const NON_EXISTENT_FILE = path.join(TEST_DIR, 'does-not-exist.txt');

beforeAll(() => {
  if (!fs.existsSync(TEST_DIR)) {
    fs.mkdirSync(TEST_DIR, { recursive: true });
  }

  // Create a file we know exists
  fs.writeFileSync(EXISTING_FILE, 'This file exists');

  // Make sure our non-existent file really doesn't exist
  if (fs.existsSync(NON_EXISTENT_FILE)) {
    fs.unlinkSync(NON_EXISTENT_FILE);
  }
});

afterAll(() => {
  if (fs.existsSync(TEST_DIR)) {
    fs.rmSync(TEST_DIR, { recursive: true, force: true });
  }
});

describe('verifyFileExists', () => {
  // Store original functions to restore after tests
  const originalFileExists = tsUtils.fileExists;

  afterEach(() => {
    // Restore original functions after each test
    tsUtils.fileExists = originalFileExists;
  });

  test('returns true for existing files', () => {
    expect(verifyFileExists(EXISTING_FILE)).toBe(true);
  });

  test('returns false for non-existent files', () => {
    expect(verifyFileExists(NON_EXISTENT_FILE)).toBe(false);
  });

  test('returns false for null or undefined paths', () => {
    expect(verifyFileExists(null)).toBe(false);
    expect(verifyFileExists(undefined)).toBe(false);
  });

  test('uses tsUtils.fileExists when available', () => {
    // Mock the tsUtils.fileExists function
    tsUtils.fileExists = jest.fn().mockImplementation(filePath => {
      return filePath === EXISTING_FILE;
    });

    expect(verifyFileExists(EXISTING_FILE)).toBe(true);
    expect(verifyFileExists(NON_EXISTENT_FILE)).toBe(false);
    expect(tsUtils.fileExists).toHaveBeenCalledTimes(2);
  });

  test('falls back to fs.existsSync when tsUtils.fileExists throws', () => {
    // Mock tsUtils.fileExists to throw an error
    tsUtils.fileExists = jest.fn().mockImplementation(() => {
      throw new Error('fileExists not available');
    });

    // Spy on fs.existsSync
    const existsSyncSpy = jest.spyOn(fs, 'existsSync');

    // Test should still work using fs.existsSync
    expect(verifyFileExists(EXISTING_FILE)).toBe(true);
    expect(verifyFileExists(NON_EXISTENT_FILE)).toBe(false);

    // Verify tsUtils.fileExists was called and threw an error
    expect(tsUtils.fileExists).toHaveBeenCalledTimes(2);

    // Verify fs.existsSync was used as fallback
    expect(existsSyncSpy).toHaveBeenCalledTimes(2);

    // Restore the original spy
    existsSyncSpy.mockRestore();
  });

  test('returns false when both fileExists mechanisms fail', () => {
    // Mock tsUtils.fileExists to throw
    tsUtils.fileExists = jest.fn().mockImplementation(() => {
      throw new Error('fileExists not available');
    });

    // Mock fs.existsSync to throw
    const existsSyncSpy = jest.spyOn(fs, 'existsSync').mockImplementation(() => {
      throw new Error('existsSync not available');
    });

    // Should safely return false when everything fails
    expect(verifyFileExists(EXISTING_FILE)).toBe(false);

    // Restore the original spy
    existsSyncSpy.mockRestore();
  });
});
