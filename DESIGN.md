**BACKEND**

---

Resolvers -> index.ts

---

- We defined the GraphQL queries and mutations for user and town operations. The user operations include update, delete and search user using different fields such as username, email etc. Since we have used GraphQL, we also migrated all the existing REST APIs to GraphQL mutations and so this file has GraphQL mutations for create, list, update, join and delete towns.

---

typeDefs -> index.ts

---

- We defined the GraphQL types in this file. We have type Query which has all the queries, type Mutation which has all the modifications we can make such as update, delete etc. We also have type for User, Player, UserLocation, Towns etc. Each of the mutations has an input and response and we have defined those when necessary.

---

Client

---

CoveyProfileTest.ts

- This file contains the tests for user functionality.

CoveyTownREST.test.ts

-

CoveyTownSocket.test.ts

-

TestQueries.ts

- Test GraphQL Queries used for testing in CoveyProfileTest.ts .

---

Data -> models -> users

---

user.model.server.ts

- Export userModel which is the mongoose model.

user.schema.server.ts

- Defines User schema.

Utils -> index.ts

- Creates the mongodb connection.

---

GraphQLServer.ts

---

- We are making a connection to the Apollo Server.

---

Server.ts

---

-

**FRONTEND**

---

Login

---
