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

TownSelection.tsx

- We have modified the call to createTown and listTown migrating it from REST API call to GraphQL call.

TownSelection.Part1.test.tsx, TownSelection.Part2.test.tsx, TownSelection.Part3.test.tsx

- We have modified the tests to match out migration from REST to GraphQL.

TownSettings.test.tsx

- We have modified the tests to match out migration from REST to GraphQL.

TownSettings.tsx

- We have modified the call to updateTown and deleteTown migrating it from REST API call to GraphQL call.

---

App.tsx

---

---

FriendSearch.tsx

---

- Implemented component for searching a friend from the list of users.

---

InviteFriendComponent.tsx

---

- Implemented component to add a friend if the user is not already a friend or  invite user if user is already a friend of user.
- Added 'Add as friend' and 'Invite Button'.
- Shows all the information of the user who is being add as a friend or invited.

---

ProfileComponent.tsx

---

- Implemented component to see profile of a user which consists of information like email, Location, Occupation, Linkedin Link, Facebook link, Instagram Link. 
- It has feature to deactivate the account, update the user profile, see friend list and friend requests and Change password.
- Added buttons for Friend List, Update profile, Change Password and Delete account.
- Added search bar for searching users.

---

StarterPage.tsx

---

- Home Page of our application.
- Added Log in button.


---

FriendsPage.tsx

---

- Implemented Friends page so the user can see the friend list and friend requests.
- Friend request can be accepted or denied.

---

auth0Service.ts

---


---
