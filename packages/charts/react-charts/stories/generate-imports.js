const fs = require('fs');
const path = require('path');

// Get all schema files
const schemasDir = path.join(__dirname, '../src/VegaDeclarativeChart/schemas');
const files = fs.readdirSync(schemasDir).filter(f => f.endsWith('.json'));

console.log(`Found ${files.length} schema files\n`);

// Generate import statements
const imports = files.map(file => {
  const name = file.replace('.json', '');
  const camelCase = name
    .split(/[-_]/)
    .map((part, i) => i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
  const varName = camelCase + 'Schema';
  
  return {
    file: name,
    varName,
    import: `import ${varName} from './schemas/${name}.json';`
  };
});

// Output imports
console.log('// Import statements:');
console.log('// ==================\n');
imports.forEach(imp => console.log(imp.import));

console.log('\n\n// Schema map entries:');
console.log('// ===================\n');
imports.forEach(imp => {
  console.log(`  '${imp.file}': ${imp.varName},`);
});

console.log(`\n\nTotal: ${imports.length} schemas`);
