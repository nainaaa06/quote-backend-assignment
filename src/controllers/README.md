# Quote Backend Assignment

## Tech Stack

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* SQLite
* Axios

## Project Structure

```
src/
├── controllers/
├── routes/
├── services/
├── repositories/
├── middleware/
├── lib/
├── app.ts
└── server.ts
```

## Installation

```bash
npm install
```

## Run the project

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

## Database

Run migrations:

```bash
npx prisma migrate dev
```

## APIs

### Get all quotes

```
GET /quotes
```

### Search quotes

```
GET /quotes?search=ABC
```

### Get quote by ID

```
GET /quotes/:id
```

### Create quote

```
POST /quotes
```

Body:

```json
{
  "customer": "ABC Builders",
  "project": "Office Complex",
  "estimated_value": 500000
}
```

### Update quote status

```
PATCH /quotes/:id/status
```

Body:

```json
{
  "status": "Completed"
}
```

Allowed status values:

* New
* In Review
* Needs Info
* Completed

### Analyze quote

```
POST /quotes/:id/analyze
```

This project uses a mocked FastAPI analysis service as allowed by the assignment.

## Validation

* Customer required
* Project required
* Estimated value must be positive
* Status validation
* Quote not found handling

## Bonus Features

* Logging Middleware
* Search API