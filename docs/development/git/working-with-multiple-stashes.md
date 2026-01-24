# Working with Multiple Git Stashes

This guide explains how to manage multiple named stashes in Git, allowing you to maintain different sets of changes (like configuration A, configuration B, etc.) and switch between them.

## Overview

Git stash supports multiple stashes with descriptive names. You can save, list, apply, and manage specific stashes by their index or name.

---

## Creating Named Stashes

Instead of just using `git stash push -S`, give each stash a descriptive name using the `-m` flag:

```bash
# Save staged changes with a descriptive message
git stash push -S -m "feature-flag-implementation"
git stash push -S -m "temporary-debug-code"
git stash push -S -m "experimental-refactor"
```

**Flags:**
- `-S` or `--staged`: Only stash staged changes (keeps unstaged changes in working directory)
- `-m "message"`: Add a descriptive message to identify this stash later

---

## Listing All Stashes

View all your stashes with their indices and messages:

```bash
git stash list
```

**Output example:**
```
stash@{0}: On main: experimental-refactor
stash@{1}: On main: temporary-debug-code
stash@{2}: On main: feature-flag-implementation
```

**Note:** Stashes are numbered from `0` (most recent) to `n` (oldest).

---

## Applying a Specific Stash

### Apply Without Removing (Recommended)

Use `apply` to restore changes while keeping the stash for later use:

```bash
# Apply by index
git stash apply stash@{1}

# Apply the most recent stash (index 0)
git stash apply
```

**Benefits:**
- Keeps the stash in your stash list
- Allows reusing the same stash multiple times
- Safer than `pop` if you're experimenting

### Apply and Remove

Use `pop` to apply and immediately remove the stash:

```bash
# Pop specific stash
git stash pop stash@{1}

# Pop most recent stash
git stash pop
```

**Warning:** If there are conflicts during `pop`, the stash will NOT be removed automatically.

---

## Inspecting Stash Contents

Before applying a stash, preview what changes it contains:

```bash
# Summary of changes
git stash show stash@{1}

# Full diff with line-by-line changes
git stash show -p stash@{1}

# Show stats (files changed, insertions, deletions)
git stash show --stat stash@{1}
```

---

## Managing Stashes

### Drop a Specific Stash

Remove a stash you no longer need:

```bash
git stash drop stash@{1}
```

**Important:** Dropped stashes are difficult to recover. Make sure you don't need them before dropping.

### Clear All Stashes

Remove all stashes at once:

```bash
git stash clear
```

**Warning:** This is irreversible. Use with caution.

### Create a Branch from a Stash

Convert a stash into a new branch for proper development:

```bash
git stash branch my-feature-branch stash@{1}
```

This command:
1. Creates a new branch named `my-feature-branch`
2. Checks out that branch
3. Applies the stash
4. Drops the stash if application was successful

---

## Updating an Existing Stash

### The Problem with Duplicate Names

**Important:** Stash names are NOT unique identifiers. When you run `git stash push -m "same-name"`, Git does NOT override an existing stash with that name. Instead, it creates a NEW stash with the same name, resulting in duplicates:

```bash
git stash list
# Output:
# stash@{0}: On main: config-A
# stash@{1}: On main: config-A  ← Same name, different content
# stash@{2}: On main: config-B
```

This can lead to confusion about which stash contains which version of your changes.

### Solution: Drop Old Stash, Then Create New One

To truly "update" a stash with the same name:

1. Apply the stash you want to update
2. Make your edits
3. Stage the changes
4. **Drop the old stash**
5. Create a new stash with the same name

**Complete Workflow:**

```bash
# 1. Apply the stash you want to update (keeps it in the list)
git stash apply stash@{0}

# 2. Make your edits to the files...
# (edit files here)

# 3. Stage all changes
git add .

# 4. Drop the old stash (IMPORTANT: do this BEFORE creating new one)
git stash drop stash@{0}

# 5. Create new stash with the same name
git stash push -S -m "config-A-local-settings"

# 6. Verify it worked
git stash list
```

**Critical Order:** You must drop the old stash BEFORE creating the new one. If you create the new stash first, the indices shift and you might drop the wrong stash.

### Version Your Stashes (Alternative Approach)

Instead of overwriting, consider versioning your stashes:

```bash
# Initial version
git stash push -S -m "config-A-v1"

# After updates
git stash push -S -m "config-A-v2"
git stash push -S -m "config-A-v3"

# Clean up old versions when no longer needed
git stash drop stash@{2}  # Drop v1
```

**Benefits:**
- Keep history of different iterations
- Can compare different versions
- No risk of losing work if you make a mistake
- Can always go back to a previous version

### Complete "Update Stash" Workflow Example

Here's a real-world scenario:

```bash
# Starting state: You have a stash with local config
git stash list
# stash@{0}: On main: local-api-endpoints

# Apply it to work with those settings
git stash apply stash@{0}

# Make changes (e.g., update API endpoint URL)
# Edit src/config/api.ts...

# Stage your changes
git add src/config/api.ts

# Drop the old version
git stash drop stash@{0}

# Create updated stash with same name
git stash push -S -m "local-api-endpoints"

# Confirm
git stash list
# stash@{0}: On main: local-api-endpoints  ← Updated version
```

### Pro Tip: Script It

Create a shell function to automate the update process:

```bash
# Add to your ~/.bashrc or ~/.zshrc
update-stash() {
    if [ -z "$1" ]; then
        echo "Usage: update-stash <stash-index>"
        echo "Example: update-stash 0"
        return 1
    fi

    local stash_ref="stash@{$1}"

    # Get the stash message
    local stash_msg=$(git stash list | grep "$stash_ref" | sed 's/.*: //')

    if [ -z "$stash_msg" ]; then
        echo "Error: Stash $stash_ref not found"
        return 1
    fi

    echo "Updating $stash_ref: $stash_msg"

    # Apply stash
    git stash apply "$stash_ref" || return 1

    # Stage changes
    git add . || return 1

    # Drop old stash
    git stash drop "$stash_ref" || return 1

    # Create new stash with same message
    git stash push -S -m "$stash_msg" || return 1

    echo "✓ Stash updated successfully"
}
```

**Usage:**
```bash
# Apply stash 0, make edits, then:
update-stash 0
```

### Summary

- **Stash names are NOT unique** - `git stash push -m "name"` creates duplicates
- **To update a stash:** apply → edit → stage → **drop old** → create new
- **Alternative approach:** Use versioning (v1, v2, v3) instead of overwriting
- **Automate it:** Create a shell function for frequently updated stashes
- **Be careful with indices:** They shift when you drop stashes

---

## Recommended Workflow for Multiple Configurations

Here's a workflow for managing multiple configuration sets (A, B, etc.):

### 1. Save Configuration A

```bash
git add .
git stash push -S -m "config-A-local-settings"
```

### 2. Save Configuration B

```bash
git add .
git stash push -S -m "config-B-debug-mode"
```

### 3. Check Available Configurations

```bash
git stash list
```

Output:
```
stash@{0}: On main: config-B-debug-mode
stash@{1}: On main: config-A-local-settings
```

### 4. Switch to Configuration A

```bash
# Apply config-A (keeps it in stash)
git stash apply stash@{1}

# Work with config-A...

# When done, clean working directory
git reset --hard
```

### 5. Switch to Configuration B

```bash
# Apply config-B
git stash apply stash@{0}

# Work with config-B...
```

---

## Pro Tips

### 1. Use Descriptive Names

Always use clear, descriptive names that explain what the stash contains:

```bash
# Good names
git stash push -S -m "local-api-endpoints-for-testing"
git stash push -S -m "feature-SMP-3672-wip"
git stash push -S -m "experimental-performance-optimization"

# Bad names
git stash push -S -m "stuff"
git stash push -S -m "temp"
git stash push -S -m "WIP"
```

### 2. Search Stashes with Grep

Find stashes by keyword:

```bash
git stash list | grep "debug-mode"
git stash list | grep "local"
git stash list | grep "SMP-3672"
```

### 3. Prefer `apply` Over `pop`

Use `apply` instead of `pop` to keep stashes around:
- Safer for experimentation
- Allows reuse of the same configuration
- Can always `drop` manually later if not needed

### 4. Stash Indices Change

Remember that stash indices shift when you drop or pop stashes:
- `stash@{2}` becomes `stash@{1}` after dropping `stash@{0}`
- Always check `git stash list` before applying by index

### 5. Stash Untracked Files

By default, stash only saves tracked files. To include untracked files:

```bash
git stash push -u -m "includes-untracked-files"
```

Flags:
- `-u` or `--include-untracked`: Include untracked files in stash
- `-a` or `--all`: Include untracked AND ignored files

### 6. Partial Stash (Interactive)

Stash only specific changes interactively:

```bash
git stash push -p -m "partial-changes"
```

Git will ask you about each hunk of changes, allowing you to choose what to stash.

---

## Common Scenarios

### Scenario 1: Multiple Local Configurations

You have different local environment configs (dev, staging, production endpoints):

```bash
# Save dev config
git add .env
git stash push -S -m "local-env-dev"

# Save staging config
git add .env
git stash push -S -m "local-env-staging"

# Switch between them
git stash apply stash@{0}  # staging
git reset --hard           # clean up
git stash apply stash@{1}  # dev
```

### Scenario 2: Feature Work in Progress

You're working on multiple features and need to switch contexts:

```bash
# Save feature A work
git add src/features/feature-a/
git stash push -S -m "feature-a-wip"

# Work on feature B...

# Resume feature A
git stash apply stash@{0}
```

### Scenario 3: Debug vs Production Code

You have temporary debug code you toggle on/off:

```bash
# Save debug instrumentation
git add .
git stash push -S -m "debug-logging-enabled"

# Work with clean code...

# Enable debug logging when needed
git stash apply stash@{0}
```

---

## Troubleshooting

### Conflict When Applying Stash

If applying a stash causes conflicts:

```bash
# Apply stash (conflicts occur)
git stash apply stash@{1}

# Resolve conflicts manually, then:
git add <resolved-files>

# The stash remains in the list for reuse
```

### Accidentally Applied Wrong Stash

If you applied the wrong stash:

```bash
# Undo the application
git reset --hard

# Or if you want to keep some changes
git reset --mixed  # unstages changes but keeps them in working directory
```

### Lost Stash Reference

If you dropped a stash by mistake, you might be able to recover it:

```bash
# Find dangling commits (recently dropped stashes)
git fsck --unreachable | grep commit

# View the commit
git show <commit-hash>

# If it's the right one, apply it
git stash apply <commit-hash>
```

---

## Summary of Key Commands

| Command | Description |
|---------|-------------|
| `git stash push -S -m "name"` | Create named stash of staged changes |
| `git stash list` | List all stashes |
| `git stash apply stash@{n}` | Apply specific stash (keeps it) |
| `git stash pop stash@{n}` | Apply and remove specific stash |
| `git stash show stash@{n}` | Preview stash contents |
| `git stash show -p stash@{n}` | Show full diff of stash |
| `git stash drop stash@{n}` | Delete specific stash |
| `git stash clear` | Delete all stashes |
| `git stash branch name stash@{n}` | Create branch from stash |

---

## Additional Resources

- [Official Git Stash Documentation](https://git-scm.com/docs/git-stash)
- [Git Book - Stashing and Cleaning](https://git-scm.com/book/en/v2/Git-Tools-Stashing-and-Cleaning)
