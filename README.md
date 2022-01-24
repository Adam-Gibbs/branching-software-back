
# Branching Software Backend

This is the backend for [demo.branching.software](https://demo.branching.software). Frontend can be found [here](https://git.cardiff.ac.uk/c1922904/branching-software-front).


## Requirements

To run this serverless application offline (locally) you will need to install the [serverless framework](https://www.serverless.com/) to your device.
Follow the link [here](https://www.serverless.com/framework/docs/getting-started).
## Project setup

Installing and running the backend locally is not needed to test the frontend locally. If you dont wish to, find it dificult to install the above requirements, or have dificulty running the following. Follow the intructions on the frontend to serve from the hosted API.

#### Clone this project and cd into the relevent folder

```bash
  git clone git@git.cardiff.ac.uk:c1922904/branching-software-back.git
  cd branching-software-back
```

#### Install the dependencies

```bash
  npm install
```

#### Install the offline database

```bash
  serverless dynamodb install
```

#### Run the application locally

```bash
  serverless offline start
```

#### Run the unit tests

```bash
  npm run test
```
## Assumptions

#### Assumptions made while creating this project:

- This is a serverless-ly deployed REST API. As such function definitions and database table/index creation is located in the serverless.yaml in the root of this project.
 
- This is currently only set to work with the frontend linked at the top of this document.

- This is continiously deployed from msater branch, any change made and pushed will intantly be made live.
## Tech Stack

**Framework:** [NodeJS](https://nodejs.org/en/), [Serverless](https://www.serverless.com/)

**Languages:** [JavaScript](https://www.wikiwand.com/en/JavaScript/)

**Tools:** [NPM](https://www.npmjs.com/), [JestJS](https://jestjs.io/)

**Libraries:** [Falso](https://ngneat.github.io/falso/) - creating dummy data



## Roadmap

- Implement sessions

- Move to TypeScript

- Paginate returns

- Implement sentry

- Encrypt data


## Feedback

If you have any feedback, please reach out to us at contact@branching.software

