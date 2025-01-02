import { parse, serialize } from './codeowners-parser'; // Replace with the actual module path

describe('#serialize', () => {
  it('should return an empty string when rules are empty', () => {
    const result = serialize([]);
    expect(result).toEqual('');
  });

  it(`should return valid codeowners file based on rules`, () => {
    const result = serialize([
      { path: 'src/*.js', owners: ['@owner1', '@owner@fluent.com'] },
      { path: 'docs/*.md', owners: ['@owner3'] },
    ]);
    expect(result).toMatchInlineSnapshot(`
      "src/*.js @owner1,@owner@fluent.com
      docs/*.md @owner3"
    `);
  });
});

describe('#parse', () => {
  it('should return an empty array when content is empty', () => {
    const result = parse('');
    expect(result).toEqual([]);
  });

  it('should return an empty array when content only contains comments', () => {
    const content = `
      # This is a comment
      # Another comment line
    `;
    const result = parse(content);
    expect(result).toEqual([]);
  });

  it('should parse a single rule correctly', () => {
    const content = `
      src/*.js @owner1 @owner2 @team/one owner@fluent.com
    `;
    const result = parse(content);
    expect(result).toEqual([
      {
        path: 'src/*.js',
        owners: ['@owner1', '@owner2', '@team/one', 'owner@fluent.com'],
      },
    ]);
  });

  it('should ignore inline comments after rules', () => {
    const content = `
      src/*.js @owner1 @owner2 # inline comment
    `;
    const result = parse(content);
    expect(result).toEqual([
      {
        path: 'src/*.js',
        owners: ['@owner1', '@owner2'],
      },
    ]);
  });

  it('should parse multiple rules correctly', () => {
    const content = `
      src/*.js @owner1 @owner2
      docs/*.md @owner3
      # A comment
      assets/*.png
    `;
    const result = parse(content);
    expect(result).toEqual([
      {
        path: 'src/*.js',
        owners: ['@owner1', '@owner2'],
      },
      {
        path: 'docs/*.md',
        owners: ['@owner3'],
      },
      {
        path: 'assets/*.png',
        owners: [],
      },
    ]);
  });

  it('should trim whitespace from lines and handle empty lines', () => {
    const content = `
      src/*.js @owner1 @owner2

      docs/*.md @owner3

      # Comment
    `;
    const result = parse(content);
    expect(result).toEqual([
      {
        path: 'src/*.js',
        owners: ['@owner1', '@owner2'],
      },
      {
        path: 'docs/*.md',
        owners: ['@owner3'],
      },
    ]);
  });

  it('should handle rules with no owners', () => {
    const content = `
      src/*.js
      docs/*.md
    `;
    const result = parse(content);
    expect(result).toEqual([
      {
        path: 'src/*.js',
        owners: [],
      },
      {
        path: 'docs/*.md',
        owners: [],
      },
    ]);
  });
});
