# Hello Welcome to the Git Practicing Repo
This repo was designed for practicing `git` commands for 21S-AsianAm191, expect things to 💥!



Start by cloning this repo:
```
git clone https://github.com/albertkun/21S-AA191-GitPracticing.git
```

Remember, here is the basic git commands for adding new changes:

```
git add .
git commit -am "message"
git push
```

[Refer to this medium post for a refresher on git merges](https://medium.com/swlh/git-branching-and-merging-made-easy-f7dacd4aa75e)
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


## Updating your branch
Sometimes you want to make sure your branch is up to date, so you can use the following command:
```
git merge <branch_you_want_to_merge>
```
For example this command will `merge` content from `main` to the branch I am currently on:
```
git merge main
```
However!!!

What happens when a `git push` affects in a file that was changed locally but someone else edited on GitHub?

## Merge Conflicts!!!
A `merge conflict` occurs when one file was changed in two places. For example, Person A edits line 1 of `readme.md` and `Person B` also edits line 1 of `readme.md`. A `git` doesn't know which changes to keep, so a person needs to take a look and manually `merge` them.

First, do a `git pull` which will show that you are behind a commit:

```
git pull
```

When your commit is behind, you may receive this message:
```
error: Your local changes to the following files would be overwritten by merge:
        readme.md
Please commit your changes or stash them before you merge.
Aborting
Updating 6ac38e2..4dbc13c
```

Do a git commit:

```
git add .
git commit -am "message"
git push
```
After you try to push, this message should pop-up:

```
error: failed to push some refs to 'https://github.com/albertkun/21S-AA191-GitPracticing.git'
hint: Updates were rejected because the tip of your current branch is behind
hint: its remote counterpart. Integrate the remote changes (e.g.
hint: 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.```
```
Run another `git pull`
```
git pull
```
If files didn't change at the same time, then auto-merging could take place.

Then proceed to push as normal:
```
git push
```
If files did change at the same time, you have to choose which version to keep:

![]()

After choosing an option, you can can push as normal:

```
git push
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
