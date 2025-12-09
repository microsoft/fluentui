# Vega-Lite Schema Adapter - Validation Improvements

## Current State

### ✅ Strengths

1. **Modular Architecture**: Well-structured helper functions for reusable logic
2. **Required Field Validation**: All chart transformers validate required encodings
3. **Error Messages**: Clear, descriptive error messages with adapter prefix
4. **Type Safety**: Strong TypeScript typing throughout

### ⚠️ Gaps

## Recommended Improvements

### 1. Data Validation Layer (High Priority)

Add validation helper functions similar to Plotly:

```typescript
/**
 * Validates that data array is not empty and contains valid values
 */
function validateDataArray(data: Array<Record<string, unknown>>, field: string): void {
  if (!data || data.length === 0) {
    throw new Error(`VegaLiteSchemaAdapter: Empty data array`);
  }

  const hasValidValues = data.some(row => row[field] !== undefined && row[field] !== null);
  if (!hasValidValues) {
    throw new Error(`VegaLiteSchemaAdapter: No valid values found for field '${field}'`);
  }
}

/**
 * Validates data type compatibility with encoding type
 */
function validateEncodingType(
  values: unknown[],
  expectedType: 'quantitative' | 'temporal' | 'nominal' | 'ordinal',
  field: string,
): void {
  // Check first non-null value
  const sampleValue = values.find(v => v !== null && v !== undefined);

  if (expectedType === 'quantitative') {
    if (typeof sampleValue !== 'number') {
      throw new Error(`VegaLiteSchemaAdapter: Field '${field}' marked as quantitative but contains non-numeric values`);
    }
  } else if (expectedType === 'temporal') {
    if (!(sampleValue instanceof Date) && typeof sampleValue !== 'string') {
      throw new Error(`VegaLiteSchemaAdapter: Field '${field}' marked as temporal but contains invalid date values`);
    }
  }
}

/**
 * Validates that nested arrays are not present (unsupported)
 */
function validateNoNestedArrays(data: Array<Record<string, unknown>>, field: string): void {
  const hasNestedArrays = data.some(row => Array.isArray(row[field]));
  if (hasNestedArrays) {
    throw new Error(`VegaLiteSchemaAdapter: Nested arrays not supported for field '${field}'`);
  }
}
```

### 2. Transform Pipeline Warning (Medium Priority)

```typescript
function warnUnsupportedFeatures(spec: VegaLiteSpec): void {
  if (spec.transform && spec.transform.length > 0) {
    console.warn(
      'VegaLiteSchemaAdapter: Transform pipeline is not yet supported. ' + 'Data transformations will be ignored.',
    );
  }

  if (spec.selection) {
    console.warn('VegaLiteSchemaAdapter: Interactive selections are not yet supported.');
  }

  if (spec.repeat || spec.facet) {
    console.warn('VegaLiteSchemaAdapter: Repeat and facet specifications are not yet supported.');
  }
}
```

### 3. Encoding Compatibility Validation (Medium Priority)

```typescript
function validateEncodingCompatibility(mark: string, encoding: VegaLiteEncoding): void {
  // Bar charts require nominal/ordinal x OR y axis
  if (mark === 'bar') {
    const xType = encoding.x?.type;
    const yType = encoding.y?.type;
    const isXCategorical = xType === 'nominal' || xType === 'ordinal';
    const isYCategorical = yType === 'nominal' || yType === 'ordinal';

    if (!isXCategorical && !isYCategorical) {
      throw new Error('VegaLiteSchemaAdapter: Bar charts require at least one categorical axis (nominal/ordinal)');
    }
  }

  // Scatter charts require quantitative axes
  if (mark === 'point' || mark === 'circle') {
    if (encoding.x?.type !== 'quantitative' || encoding.y?.type !== 'quantitative') {
      throw new Error('VegaLiteSchemaAdapter: Scatter charts require quantitative x and y axes');
    }
  }
}
```

### 4. Null/Undefined Handling (High Priority)

Add defensive checks in data processing loops:

```typescript
// In groupDataBySeries and other data iteration functions
dataValues.forEach(row => {
  const xValue = row[xField];
  const yValue = row[yField];

  // Skip rows with invalid values
  if (xValue === undefined || xValue === null || yValue === undefined || yValue === null) {
    return; // Skip this data point
  }

  // Continue processing...
});
```

### 5. Enhanced Error Context (Low Priority)

Improve error messages with more context:

```typescript
throw new Error(
  `VegaLiteSchemaAdapter: Invalid data for ${mark} chart. ` +
    `Field '${field}' contains ${invalidCount} invalid values out of ${totalCount} data points. ` +
    `Expected type: ${expectedType}, found: ${actualType}`,
);
```

## Implementation Priority

### Phase 1 (High Priority - Security & Stability)

1. ✅ Add null/undefined checks in all data iteration loops
2. ✅ Validate data arrays are not empty before processing
3. ✅ Validate no nested arrays in data fields

### Phase 2 (Medium Priority - User Experience)

1. ⚠️ Add transform pipeline warnings
2. ⚠️ Add encoding compatibility validation
3. ⚠️ Add data type validation

### Phase 3 (Low Priority - Polish)

1. ⬜ Enhanced error messages with detailed context
2. ⬜ Validation for edge cases (circular refs, etc.)
3. ⬜ Performance optimization for large datasets

## Testing Requirements

For each validation improvement:

1. Add unit test with invalid data
2. Add unit test with edge cases
3. Add integration test with complete spec
4. Document expected behavior in JSDoc

## Comparison with Plotly

Plotly adapter has:

- ✅ Centralized validation (`DATA_VALIDATORS_MAP`)
- ✅ Type-specific validators
- ✅ Data shape validation
- ✅ Log axis compatibility checks
- ✅ Empty data detection

Vega adapter should match this validation rigor while maintaining its modular architecture.
