# Grail Frontend Take Home

## Description

This is the Grail take home test. As well as making a microservice to register and manage patients, I have created a basic frontend to interact with this.

## Libraries/Tools used

#### Backend

- Typescript with Fastify
- Prisma with Postgresql
- Jest for testing
- Docker

#### Frontend

- React with Typescript
- Mantine UI
- Vite for building
- TailwindCSS
- Package manager pnpm

## Running project

### Backend - registry-microservice

1. Install [docker](https://docs.docker.com/get-docker/)
2. Navigate to `registry-service` - `cd registry-service`
3. Run `docker-compose up --build`
4. Wait for a few minutes. Everything is ready when you see this line: `registryservice_1 | Server ready at http://localhost:5000`

Service is now available at [http://localhost:5000](http://localhost:5000)

### Frontend

1. Install node version 16.x.x or higher from [here](https://nodejs.org/en/)
2. Install pnpm from [here](https://pnpm.io/installation)
3. Navigate to `web` - `cd web`
4. Install the project dependencies `pnpm install`
5. Run the app `pnpm dev`

You can now access the frontend from your preferred browser at address: `http://localhost:3000`

## Example

![example](./example-usage.gif)

## Improvements/Explanations

The data model I chose can be seen here. I chose to make a new field for the patientIdentifier on the basis that this may be updated in the future (possibly patient can not remember).

When deleting a user, I am currently deleting the entire record. Instead of deleting the data straight away, it may be beneficial to disable the user instead. This would keep the patient's details whilst we can choose not to send these back.

In the current tests, they are running against the same database as the main database. When tests are run inside ci/cd or locally, a mock database could be run from a container to test against. It can be best to test against the real thing so unexpected behaviors are caught early.

I experimented by using a framework (fastify) that I have never used before. Next time I would structure the project differently by having each route logic in a different file. This would be the same for the tests as these currently all live in one file. I believe this would make it more readable and easier to maintain.

Due to time constraints I was not able to test the entire backend, I would strive for 100% test coverage if I had more time.

I made a route that gets all patients. This would not be viable when the system has 100,000 patients. Pagination would need to be added if we want to display a list of patients. This might be useful if the route was extended such that we could search for people using certain attributes, i.e. name, city etc.

I would add further validation, both on the frontend and backend for user entered data. i.e. validate phone number etc.

I would enable logging whilst ensuring we do not log any sensitive data.

The frontend has no tests or error handling due to time constraints. I would preferably have used `react-query` for data fetching as this provides a great api for managing data fetching state.

Unit and integration tests can be added using react testing library and e2e testing could be added using cypress.

Would make it so you can filter by all fields, or the search would return data from the api rather than pulling everything and filtering.

## Documentation

### Register a patient

#### Request

    POST /api/patient HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Accept: */*
    Content-Length: 189

    {
      "firstName": "first name",
      "lastName": "last name",
      "dateOfBirth": "2022-06-02",
      "phoneNumber": "123",
      "addressLineOne": "Line 1",
      "addressLineTwo": "Line 2",
      "city": "city",
      "postcode": "ABC"
    }

#### Response

    HTTP/1.1 201 Created
    content-type: application/json; charset=utf-8
    content-length: 260

    {
      "firstName": "first name",
      "lastName": "last name",
      "dateOfBirth": "2022-06-02T00:00:00.000Z",
      "phoneNumber": "123",
      "id": "748313e3-b67f-4018-819c-19a7bfbba863",
      "patientIdentifier": "201",
      "address": {
        "addressLineOne": "Line 1",
        "addressLineTwo": "Line 2",
        "city": "city",
        "postcode": "ABC"
      }
    }

### Get all patients

#### Request

    GET /api/patient HTTP/1.1
    Host: localhost:5000
    Accept: */*

#### Response

    HTTP/1.1 200 OK
    content-type: application/json; charset=utf-8
    content-length: 2

    [
      {
        "firstName": "first name",
        "lastName": "last name",
        "dateOfBirth": "2022-06-02T00:00:00.000Z",
        "phoneNumber": "123",
        "id": "748313e3-b67f-4018-819c-19a7bfbba863",
        "patientIdentifier": "201",
        "address": {
          "addressLineOne": "Line 1",
          "addressLineTwo": "Line 2",
          "city": "city",
          "postcode": "ABC"
        }
      }
    ]

### Get a single patient by ID

#### Request

    GET /api/patient/:patientId HTTP/1.1
    Host: localhost:5000
    Accept: */*

#### Response

    HTTP/1.1 200 OK
    content-type: application/json; charset=utf-8
    content-length: 260

    {
      "firstName": "first name",
      "lastName": "last name",
      "dateOfBirth": "2022-06-02T00:00:00.000Z",
      "phoneNumber": "123",
      "id": "748313e3-b67f-4018-819c-19a7bfbba863",
      "patientIdentifier": "201",
      "address": {
        "addressLineOne": "Line 1",
        "addressLineTwo": "Line 2",
        "city": "city",
        "postcode": "ABC"
      }
    }

### Update patient by ID

#### Request

    PATCH /api/patient/:patientId HTTP/1.1
    Host: localhost:5000
    Content-Type: application/json
    Accept: */*
    Content-Length: 23

    {
      "firstName": "111"
    }

#### Response

    HTTP/1.1 200 OK
    content-type: application/json; charset=utf-8
    content-length: 259

    {
      "firstName": "first name",
      "lastName": "last name",
      "dateOfBirth": "2022-06-02T00:00:00.000Z",
      "phoneNumber": "123",
      "id": "748313e3-b67f-4018-819c-19a7bfbba863",
      "patientIdentifier": "201",
      "address": {
        "addressLineOne": "Line 1",
        "addressLineTwo": "Line 2",
        "city": "city",
        "postcode": "ABC"
      }
    }

### Delete patient by ID

#### Request

    DELETE /api/patient/:patientId HTTP/1.1
    Host: localhost:5000
    Accept: */*

#### Response

    HTTP/1.1 204 No Content
    content-type: application/json; charset=utf-8
    content-length: 2
