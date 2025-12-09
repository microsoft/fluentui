# Vega-Lite Validation Test Schemas

This directory contains test schemas designed to validate the error handling and validation logic in `VegaLiteSchemaAdapter.ts`.

## Test Cases

### 1. Empty Data Array (test-empty-data.json)

**Expected Behavior**: ❌ Throws Error

```
Error: "VegaLiteSchemaAdapter: Empty data array for LineChart"
```

**Description**: Tests that the adapter properly validates that data arrays are not empty before processing.

---

### 2. Nested Arrays (test-nested-arrays.json)

**Expected Behavior**: ❌ Throws Error

```
Error: "VegaLiteSchemaAdapter: Nested arrays not supported for field 'x'. Use flat data structures only."
```

**Description**: Tests that the adapter detects and rejects nested array data structures, which are not supported.

---

### 3. Type Mismatch (test-type-mismatch.json)

**Expected Behavior**: ❌ Throws Error

```
Error: "VegaLiteSchemaAdapter: Field 'x' marked as quantitative but contains non-numeric values"
```

**Description**: Tests that the adapter validates data types match the encoding type specification (quantitative fields must contain numbers).

---

### 4. Bar Chart Without Categorical Axis (test-bar-no-categorical.json)

**Expected Behavior**: ❌ Throws Error

```
Error: "VegaLiteSchemaAdapter: Bar charts require at least one categorical axis (nominal/ordinal) or use bin encoding for histograms"
```

**Description**: Tests that the adapter enforces encoding compatibility rules (bar charts need at least one categorical axis).

---

### 5. Null Values (test-null-values.json)

**Expected Behavior**: ✅ Success (Graceful Degradation)

**Description**: Tests that the adapter gracefully handles null and undefined values by:

- Skipping data points with null/undefined values
- Rendering only valid data points
- Not crashing or throwing errors

**Result**: Chart should render with 4 valid data points (x=1,y=28; x=3,y=43; x=4,y=91; x=5,y=81)

---

### 6. Transform Pipeline Warning (test-transform-warning.json)

**Expected Behavior**: ⚠️ Warning (Renders with Warning)

```
Warning: "VegaLiteSchemaAdapter: Transform pipeline is not yet supported. Data transformations will be ignored. Apply transformations to your data before passing to the chart."
```

**Description**: Tests that the adapter warns users about unsupported features (transform pipeline) but still renders the chart with unfiltered data.

**Result**: Chart should render all 5 data points with a console warning about the ignored transform.

---

## Testing Instructions

### Manual Testing

To manually test these schemas in the Storybook:

1. Navigate to the Vega-Lite stories in Storybook
2. Copy the content of a test schema
3. Paste into the JSON editor
4. Observe the expected behavior (error message, warning, or successful render)

### Automated Testing

These test cases are covered in `VegaLiteSchemaAdapterUT.test.tsx`:

```bash
cd library
npm test -- VegaLiteSchemaAdapterUT
```

**Test Suites**:

- Empty Data Validation
- Null/Undefined Value Handling
- Nested Array Detection
- Encoding Type Validation
- Encoding Compatibility Validation
- Unsupported Features Warnings

## Validation Summary

| Test Case                  | Type    | Expected Result   |
| -------------------------- | ------- | ----------------- |
| Empty Data Array           | Error   | ❌ Throws error   |
| Nested Arrays              | Error   | ❌ Throws error   |
| Type Mismatch              | Error   | ❌ Throws error   |
| Bar Chart (No Categorical) | Error   | ❌ Throws error   |
| Null Values                | Success | ✅ Graceful skip  |
| Transform Pipeline         | Warning | ⚠️ Warns, renders |

## Related Documentation

- **VEGA_VALIDATION_IMPLEMENTATION.md**: Full implementation details
- **VEGA_VALIDATION_IMPROVEMENTS.md**: Validation roadmap (Phase 1, 2, 3)
- **VegaLiteSchemaAdapter.ts**: Main adapter with validation logic
- **VegaLiteSchemaAdapterUT.test.tsx**: Automated unit tests

## Notes

- **Fail-Fast**: Critical errors (empty data, type mismatches) throw immediately
- **Graceful Degradation**: Invalid values (null, undefined, NaN) are skipped
- **User Guidance**: Clear error messages indicate what's wrong and how to fix
- **Warnings**: Unsupported features warn but don't block rendering
