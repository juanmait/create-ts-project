# Bringing Changes from Another Branch Without Merge/Rebase

This guide explains how to bring changes from another branch into your current branch without using
merge or rebase operations.

## Methods Overview

| Method         | Use Case                   | Result                                 |
| -------------- | -------------------------- | -------------------------------------- |
| Cherry-pick    | Copy specific commits      | Commits are replicated with new hashes |
| Checkout files | Copy specific files        | Files brought as staged changes        |
| Restore        | Copy files (Git 2.23+)     | Files brought to working directory     |
| Show/Apply     | Preview and apply manually | More control over what gets applied    |

## 1. Cherry-pick (Copy Specific Commits)

Cherry-pick copies commits from another branch to your current branch. Each cherry-picked commit
gets a new commit hash.

### Basic Usage

```bash
# Copy a single commit
git cherry-pick <commit-hash>

# Copy multiple commits
git cherry-pick <commit1> <commit2> <commit3>

# Copy a range of commits (inclusive)
git cherry-pick <start-commit>^..<end-commit>
```

### Examples

```bash
# Copy commit abc123 to current branch
git cherry-pick abc123

# Copy three specific commits
git cherry-pick abc123 def456 789ghi

# Copy all commits from feature branch since it diverged from main
git cherry-pick main..feature-branch
```

### Options

```bash
# Cherry-pick without committing (stage changes only)
git cherry-pick --no-commit <commit-hash>

# Continue after resolving conflicts
git cherry-pick --continue

# Abort cherry-pick operation
git cherry-pick --abort
```

### When to Use

- You need specific bug fixes from another branch
- You want to port a feature to a different branch
- You need to backport commits to a release branch

## 2. Checkout Files (Copy Specific Files)

Checkout files from another branch without switching branches. Files are brought as staged changes.

### Basic Usage

```bash
# Copy a single file
git checkout <branch-name> -- path/to/file.ts

# Copy multiple files
git checkout <branch-name> -- file1.ts file2.ts

# Copy entire directory
git checkout <branch-name> -- src/

# Copy all files from specific directory
git checkout <branch-name> -- "src/**/*.ts"
```

### Examples

```bash
# Copy package.json from feature branch
git checkout feature-branch -- package.json

# Copy all TypeScript files from src
git checkout feature-branch -- "src/*.ts"

# Copy the entire src directory
git checkout feature-branch -- src/

# Copy multiple specific files
git checkout feature-branch -- src/index.ts src/lib.ts
```

### Workflow

```bash
# 1. Check current branch
git branch

# 2. Copy files from another branch
git checkout other-branch -- path/to/file.ts

# 3. Check status (files will be staged)
git status

# 4. Review changes
git diff --staged

# 5. Unstage if needed
git restore --staged path/to/file.ts

# 6. Commit the changes
git commit -m "Bring changes from other-branch"
```

### When to Use

- You need specific files from another branch
- You want configuration files from another branch
- You're syncing specific files between branches

## 3. Restore (Modern Git 2.23+)

The `restore` command is the modern alternative to `checkout` for file operations.

### Basic Usage

```bash
# Restore file from another branch (to working directory)
git restore --source=<branch-name> path/to/file.ts

# Restore and stage the file
git restore --source=<branch-name> --staged path/to/file.ts

# Restore to both working directory and staging
git restore --source=<branch-name> --staged --worktree path/to/file.ts
```

### Examples

```bash
# Restore package.json from feature branch
git restore --source=feature-branch package.json

# Restore and stage it immediately
git restore --source=feature-branch --staged package.json

# Restore from a specific commit
git restore --source=abc123 src/index.ts
```

### When to Use

- Modern Git installations (2.23+)
- Clearer intent than `checkout`
- More explicit control over staging

## 4. Show and Apply (Manual Preview)

Preview changes before applying them, with full control over what gets applied.

### View File Contents

```bash
# Show file contents from another branch
git show <branch-name>:path/to/file.ts

# Show file from specific commit
git show <commit-hash>:path/to/file.ts

# Save to a new file
git show <branch-name>:path/to/file.ts > new-file.ts
```

### Create and Apply Patches

```bash
# Create patch for specific file
git diff <branch-name> -- path/to/file.ts > changes.patch

# Create patch for entire branch
git diff main..feature-branch > feature.patch

# Apply patch
git apply changes.patch

# Apply patch and check first
git apply --check changes.patch

# Apply with three-way merge if conflicts
git apply --3way changes.patch
```

### Examples

```bash
# Preview changes to package.json
git diff feature-branch -- package.json

# Create patch for review
git diff feature-branch -- src/ > feature-changes.patch

# Review patch
cat feature-changes.patch

# Apply patch
git apply feature-changes.patch

# Commit changes
git add .
git commit -m "Apply changes from feature branch"
```

### When to Use

- You want to preview changes before applying
- You need to review/modify changes before applying
- You're creating patches to share with others
- You need fine-grained control over what gets applied

## 5. Interactive Patch Application

Apply changes interactively, choosing which hunks to include.

```bash
# Apply changes interactively
git checkout -p <branch-name> -- path/to/file.ts

# Or with restore
git restore --source=<branch-name> --patch path/to/file.ts
```

### Example Workflow

```bash
# Start interactive checkout
git checkout -p feature-branch -- src/index.ts

# For each hunk, you'll see options:
# y - apply this hunk
# n - skip this hunk
# s - split this hunk into smaller hunks
# q - quit
# ? - help
```

## Comparison: Merge vs These Methods

### Merge/Rebase

- Creates a merge commit or rebases branch
- Brings entire branch history
- Updates branch pointer
- Can affect commit history

### Cherry-pick/Checkout

- Copies specific commits or files
- No merge commit created (unless conflicts)
- Doesn't update branch pointers
- Clean, targeted changes

## Common Scenarios

### Scenario 1: Need one bug fix from feature branch

```bash
# Find the commit hash
git log feature-branch --oneline

# Cherry-pick the specific fix
git cherry-pick abc123
```

### Scenario 2: Need updated config files

```bash
# Copy specific config files
git checkout feature-branch -- package.json tsconfig.json

# Review and commit
git diff --staged
git commit -m "Update config from feature branch"
```

### Scenario 3: Port feature to different branch

```bash
# Copy all commits for the feature
git cherry-pick feature-start^..feature-end

# Or copy specific files
git checkout feature-branch -- src/new-feature/
git commit -m "Port new feature from feature branch"
```

### Scenario 4: Sync documentation

```bash
# Copy docs directory
git checkout main -- docs/

# Review and commit
git status
git commit -m "Sync docs with main branch"
```

## Tips and Best Practices

1. **Always check git status** before and after operations to understand what changed
2. **Review changes** with `git diff` before committing
3. **Use descriptive commit messages** that mention the source branch
4. **Test thoroughly** after bringing changes from another branch
5. **Consider conflicts** - cherry-pick and apply can have conflicts just like merge
6. **Use `--no-commit`** with cherry-pick if you want to review changes first

## Troubleshooting

### Conflicts During Cherry-pick

```bash
# If conflicts occur
git status  # See conflicting files
# Resolve conflicts manually
git add resolved-files
git cherry-pick --continue

# Or abort
git cherry-pick --abort
```

### Undo Accidental Checkout

```bash
# If you accidentally copied wrong files
git restore --staged file.ts  # Unstage
git restore file.ts           # Restore from current branch
```

### Finding Commit Hashes

```bash
# View commit history of another branch
git log other-branch --oneline

# View commits with file changes
git log other-branch --oneline -- path/to/file.ts

# Find commits by message
git log other-branch --oneline --grep="bug fix"
```

## References

- [Git Cherry-pick Documentation](https://git-scm.com/docs/git-cherry-pick)
- [Git Checkout Documentation](https://git-scm.com/docs/git-checkout)
- [Git Restore Documentation](https://git-scm.com/docs/git-restore)
- [Git Apply Documentation](https://git-scm.com/docs/git-apply)
