# Manage your employees with IdentWork

![IdentWork Logo](assets/identwork-logo.jpg)

> ResFull API to manage employees and companies. This project arose from a need of store employee data for a freelance job of making ID Card. From there this api is the backend for the application.
---
## Technologies used
- Node.js + Typescript
- Express
- Prisma
---
## Features

- CRUD operations to Employees and Companies.
- Testing
- API Error Handler
---
## Configuration
After clone repository, install the dependencies.

```
npm install
```

Create and configure .env file with this keys:
```
DATABASE_URL="file:./dev.db" # Sqlite3 used in this project.
PORT=7777
```
---
## Migrations
```
npx prisma migrate dev
```
---
## Usage
To run this application just type in root directory:

```
npm run dev
```

To testing:
```
npx run test
```
---
## Documentation

### Schemas

### Company

| atribute | type   | extra             |
| -------- | ------ | ----------------- |
| name     | string | required - unique |

---
### Employee
| atribute       | type    | extra             |
| -------------- | ------- | ----------------- |
| id             | string  | required - unique |
| name           | string  | required          |
| war_name       | string  | required          |
| role           | string  | required          |
| identification | string  | required          |
| admission_date | date    | required          |
| print          | boolean | default: true     |
| company_id     | string  | required          |
---
### Endpoints

####  Employees

| Method | Endpoint              | Parameters  | Body            | Description                       |
| ------ | --------------------- | ----------- | --------------- | --------------------------------- |
| GET    | employees/            |             | -               | Get all employees                 |
| GET    | employees/print       |             | -               | Get all employees with print true |
| GET    | employees/\<id>       | employee id | -               | Get employee by id                |
| POST   | employees/            | -           | employee Schema | Create a employee                 |
| PUT    | employees/\<id>       | employee id | employee Schema | Update employee                   |
| PATCH  | employees/\<id>/print | employee id | -               | Change print attribute            |
| DELETE | employees/\<id>       | employee id | employee Schema | Delete employee                   |


#### Companies

| Method | Endpoint                  | Parameters | Body           | Description                  |
| ------ | ------------------------- | ---------- | -------------- | ---------------------------- |
| GET    | companies/                | -          | -              | Get all companies            |
| GET    | companies/\<id>           | company id | -              | Get company by id            |
| GET    | companies/\<id>/employees | company id | -              | Get all employees of company |
| POST   | companies/                | -          | company Schema | Create a company             |
| PUT    | companies/\<id>           | company id | company Schema | Update company               |
| DELETE | companies/\<id>           | company id | company Schema | Delete company               |