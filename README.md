# Pickles  Email


## Description

Using [Nest](https://github.com/nestjs/nest) framework TypeScript for REST API

## Flow

```bash

$ yarn && yarn start

```

```bash

$ curl --location --request POST 'localhost:3000' \
--header 'Content-Type: application/json' \
--data-raw '{
     "receivers": ["test@test.com"],
      "subject": "Hello!",
      "text": "Hello World!",
      "html": "<b>Hello World from another world!</b>"
}'

```


## Testing

```bash

$ yarn test # unit test

$ yarn test:e2e # e2e test

```


## Build

```bash

$ yarn build

```



## Directory Layout

```

.
├── dist                                # Compiled files
├── src                                 # Source files 
│   │  
│   ├── email                             # Email Module
│   │   │ 
│   │   ├── email.controller.spec.ts        # Unit test
│   │   ├── email.controller.ts             # Controller (API entry)
│   │   ├── email.model.ts                  # Model/Data Schema
│   │   ├── email.module.ts                 # Module entry
│   │   └── email.service.ts                # Services
│   └── main.ts                           # Entry Point
│
├── test                                # Automated tests 
│   ├── __mocks__                         # Mock 3rd party libraries
│   └── app.e2e-spec.ts                   # End-to-end testing
│
├── .env.local                          # Environment variables (local)
└── README.md

```