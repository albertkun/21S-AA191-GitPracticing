# Hello Welcome to the Git Practicing Repo
This repo was designed for practicing `git` commands for 21S-AsianAm191, expect things to 💥!

## Testing Area
```md
This area is completely for testing!!!
```

## Making a new branch:

```
git checkout -b helloNewBranch
```
This creates a branch called `helloNewBranch` and switches to it!

### `git add .` your changes to the new branch:
Make some changes and add them to the branch:
```
git add .
```

### Add a message to your commit
```
git commit -am "message"
```

### Push your changes to your new branch

This code creates a new branch called `helloNewBranch` on GitHub to push to:
```
git push --set-upstream origin helloNewBranch
```
You only need to run it when the branch DOES NOT exist on GitHub!!! After the branch is on GitHub, use `git push`:
```
git push
```

This is all great when you are working one file at a time, but what happens when a `git push` affects in a file that was changed locally but someone else edited on GitHub?

## Merge Conflicts!!!
A `merge conflict` occurs when one file was changed in two places. For example, Person A edits line 1 of `readme.md` and `Person B` also edits line 1 of `readme.md`. A `git` doesn't know which changes to keep, so a person needs to take a look and manually `merge` them.

First, do a `git pull` which will show that you are behind a commit:

```
git pull
```

When your commit is behind, you will receive this message:
```
error: Pulling is not possible because you have unmerged files.
hint: Fix them up in the work tree, and then use 'git add/rm <file>'
hint: as appropriate to mark resolution and make a commit.
fatal: Exiting because of an unresolved conflict.
```



In the meantime, here are some friendly tips for using `markdown`, which is used in `readme.md` files on `GitHub`.

## 1.0 Headings 
Use `#` to demarcate headings and levels!

```md
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
```
### Result:
# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4

## 2.0 Images
You can add images using this syntax:
```md
![alt text for the image](https://via.placeholder.com/150)
```
### Result:

![alt text](https://via.placeholder.com/150)
## 3.0 Links
Add links using the following:
```md
[text for the link](./index.html)
```
### Result:
[text for the link](./index.html)

## 4.0 Tables
You can create a table using this syntax:
```md
column header | column header 2
--|---
hi| this is a row in column 2
etc| pretty nifty, right?
```
### Result:
column header | column header 2
--|---
hi| this is a row in column 2
etc| pretty nifty, right?
