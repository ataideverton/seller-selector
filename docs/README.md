# VTEX React App Template

Our guide repository to structure for react apps, that should be used as a template.

We use `yarn` as our default package manager, before coding make sure to run yarn on: `root` and `react` folders.

## Description:

Seller Selector enables your visitors to easily see how many sellers your marketplace has for certain products, check their prices
and add then to their cart.

## Preview:

## Usage:

## Installation:

### Ci

#### Install:

```yml
install:
  commands:
    - echo Installing Packages...
    - cd react
    - npm install
    - echo Packages installed!
```

#### Pre-build:

```yml
pre_build:
  commands:
    - echo Running tests...
    - npm run verify
    - echo Lint and tests finished!
```
