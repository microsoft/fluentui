#!/bin/bash

# Ensure the script exits on any error
set -e

# Define the input directory and output file
INPUT_DIR=$1
OUTPUT_FILE=$2

# Check if the input directory and output file arguments are provided
if [ -z "$INPUT_DIR" ] || [ -z "$OUTPUT_FILE" ]; then
  echo "Usage: $0 <input_directory> <output_file>"
  exit 1
fi

# Create or clear the output file
> "$OUTPUT_FILE"

# Find all files in the input directory and its subdirectories and append their content to the output file
find "$INPUT_DIR" -type f -exec cat {} + >> "$OUTPUT_FILE"

echo "All files have been concatenated into $OUTPUT_FILE"