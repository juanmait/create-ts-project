# Filtering TypeScript Errors

When running `tsc` on the entire codebase, you often get hundreds of errors. This guide shows how to filter the output to focus on specific files or directories.

## Basic Approach

Since `tsc` doesn't have built-in filtering, we use `grep` to filter the output:

```bash
pnpm run typecheck 2>&1 | grep "pattern"
```

The `2>&1` redirects stderr to stdout so grep can filter it.

## Common Filtering Patterns

### Filter by Specific File

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/types.ts"
```

### Filter by Directory

Show all errors from files in a specific directory:

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/"
```

### Exclude Subdirectories

Show errors from a directory but exclude certain subdirectories (e.g., tests, examples):

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep -v "__tests__" | grep -v "examples"
```

### Filter by Specific Files in a Directory

Use extended regex with `-E` to match multiple specific files:

```bash
pnpm run typecheck 2>&1 | grep -E "leads-pipeline/(types|LeadPipeline|stages|createLeadPipeline)"
```

### Combine Multiple Filters

Check core implementation files only, excluding tests and examples:

```bash
pnpm run typecheck 2>&1 | grep -E "leads-pipeline/(types|LeadPipeline|stages|createLeadPipeline)" | grep -v "__tests__" | grep -v "examples"
```

## Analysis Commands

### Count Errors

Count total errors in a directory:

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep "error TS" | wc -l
```

### Show Only Error Messages

Filter out context and show only error lines:

```bash
pnpm run typecheck 2>&1 | grep "error TS"
```

### Show File and Line Numbers Only

Extract just the file path, line, and column:

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep "error TS" | cut -d: -f1-3
```

Output example:
```
src/leads-pipeline/types.ts:45:3
src/leads-pipeline/LeadPipeline.ts:37:25
```

### Group Errors by File

Count how many errors per file:

```bash
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep "error TS" | cut -d: -f1 | sort | uniq -c
```

Output example:
```
   5 src/leads-pipeline/types.ts
   2 src/leads-pipeline/LeadPipeline.ts
   3 src/leads-pipeline/stages/ValidateLeadStage.ts
```

## Advanced Filtering with awk

For more complex filtering, use `awk`:

```bash
# Show only errors from a specific directory
pnpm run typecheck 2>&1 | awk '/src\/leads-pipeline.*error TS/ {print}'

# Show errors with custom formatting
pnpm run typecheck 2>&1 | awk -F: '/error TS/ {print $1 ":" $2 " - " $4}'
```

## Practical Examples

### Check if new implementation has type errors

Before committing new code in `src/my-feature/`:

```bash
pnpm run typecheck 2>&1 | grep "src/my-feature/" | grep "error TS"
```

### Verify a refactoring didn't introduce new errors

After refactoring, check that only expected files have errors:

```bash
pnpm run typecheck 2>&1 | grep -E "(src/file1|src/file2|src/file3)" | grep "error TS"
```

### Monitor error count during cleanup

While fixing errors, track progress:

```bash
# Before fixes
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep "error TS" | wc -l
# Output: 45

# After some fixes
pnpm run typecheck 2>&1 | grep "src/leads-pipeline/" | grep "error TS" | wc -l
# Output: 12
```

## Tips

1. **Always use `2>&1`** - TypeScript outputs to stderr, so redirect it to stdout for grep
2. **Use `-v` to invert match** - Exclude patterns with `grep -v pattern`
3. **Use `-E` for regex** - Enable extended regex with `grep -E "pattern1|pattern2"`
4. **Chain multiple greps** - Each grep filters the previous output
5. **Save output to file** - For large outputs: `pnpm run typecheck 2>&1 > errors.txt`

## Limitations

- These techniques filter the **output** of `tsc`, not the compilation itself
- `tsc` still checks the entire project, so it takes the same amount of time
- For faster checks of specific files, consider using your IDE's built-in TypeScript checker
- Path aliases require the full project context, so isolated file checks may show false errors

## Alternative: Using the Project's typecheck Script

The project's typecheck script runs against specific TypeScript configs:

```bash
# Check server-side code (what the main typecheck script does)
pnpm run typecheck

# Check if there's a client-side typecheck (check package.json)
pnpm run typecheck:client  # if it exists
```

Always check `package.json` scripts for project-specific typecheck commands.
