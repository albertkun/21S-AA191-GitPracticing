# Hello Welcome to the Git Practicing Repo
This repo was designed for practicing `git` commands for 21S-AsianAm191, expect things to 💥!

Causing a git merge.

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
You only need to run it when the branch DOES NOT exist on GitHub!!! After the branch is on GitHub, you can just to normal `git pushes`.
```
git push
```

## Testing Area
```md
This area is completely for testing!!!
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
