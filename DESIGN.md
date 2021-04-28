**DESIGN**

---
The main goal of our project is to provide support to real persistence by creating an authentication layer, maintain and manage user profiles. We have used Auth0 for authentication and MongoDB (NoSQL database) for data storage. 
We chose to use GraphQL over REST APIs considering the advantages of GraphQL. GraphQL allows faster performance compared to REST APIs, No overfetching or underfetching issues and more efficient.

Brief overview of the new changes added to the codebase are as follows :  
Frontend : 
- Authentication of the user using Auth0 - SignUp, Login, Logout.
- Created appropriate components in frontend to save/view/edit/delete user profiles.
- Created appropirate components in frontend to implement add friend/ accept friend / delete friend.
- Created Apollo Client in front-end to make GraphQL API calls to Apollo GraphQL backend server.
- Implemented functionalities to make GraphQL API calls for user profile functionalities and friend functionalities.
- Refactored the existing REST API calls for Towns to use GraphQL queries and mutations.
- Provided authentication and authorization of GraphQL APIs using JSON Web token and Auth0 access token. 
- Refactored the existing test cases for Covey Town to use GraphQL client instead of REST service client.
 We also 
Backend : 
- Created GraphQL Schema and resolvers for User profile functionalities : view/edit/delete user profiles.
- Created GraphQL schema and resolvers for friend functionalities : add friend/accept friend/delete friend.
- Created GraphQL schema and resolvers for Covey Town functionalities : create town / delete town / join town / list town/ update town.
- Provided authentication and authorization of GraphQL APIs using JSON Web token and Auth0 access token. 
- Refactored the existing test cases for Covey Town to use GraphQL server and GraphQL client.
- Created new test cases to test all the user profile and friend functionalities in backend.

---

UML Sequence Diagrams

---
<img src="https://github.com/trena-dhingra/covey.town/raw/master/screenshots/signup.jpeg"/>
<img src="https://github.com/trena-dhingra/covey.town/raw/master/screenshots/login_logout.jpeg"/>
<img src="https://github.com/trena-dhingra/covey.town/raw/master/screenshots/user_update_delete.jpeg"/>
<img src="https://github.com/trena-dhingra/covey.town/raw/master/screenshots/search.jpeg"/>
<img src="https://github.com/trena-dhingra/covey.town/raw/master/screenshots/friends.jpeg"/>

**DETAILED DESIGN**

**BACKEND**
FORMAT : Folder name -> file name.
---

resolvers -> index.ts

---

- We defined resolvers for GraphQL queries and mutations for user profile and town functionalities. The user profile operations include update user, delete user, search user using different fields such as username and email, add friend request, accept friend request, delete friend request.Since we have used GraphQL, we have also chose to migrate all the existing REST APIs to GraphQL. So this file contains resolvers for Queries/GraphQL mutations for create, list, update, join and delete towns.

---

typeDefs -> index.ts

---

- This file contains the GraphQL schema. We have type Query which has all the queries, type Mutation which has all the modifications we can make such as update, delete user etc. We also have type for User, Player, UserLocation, Towns etc. Each of the mutations has an input and response and we have defined those when necessary. This is one of the biggest advantage of using GraphQL because it makes all of the requests from frontend strictly typed.

---

Client

---

CoveyProfileTest.ts

- This file contains the tests for user profile and friend management functionalities. We have used apollo-server-testing npm package to mock the apollo server and test the graphQL resolvers.  

CoveyTownTest.test.ts

- This file contains the test for Covey Towns. 
- Changes done in this file : 
1. Change to Apollo Server , 
2. User GraphQL client service instead of using REST service
We have made these changes because our whole project is now using GraphQL service instead of REST service.
We have made the change efficiently such that this file does not have many changes.

CoveyTownSocket.test.ts
- This file contains the test for Covey Towns Socket functionalities. 
- Changes done in this file : 
1. Change to Apollo Server , 
2. User GraphQL client service instead of using REST service
We have made these changes because our whole project is now using GraphQL service instead of REST service.
We have made the change efficiently such that this file does not have many changes.

TestQueries.ts

- Test GraphQL Queries contains the necessary queries and mutation calls that are required to make API calls to Apollo server.
These queries and mutations are used by the other test files in this folder.

TownsGraphQLClient.ts
- This file contains the class to create the graphQL client and to make GraphQL API calls to server. The functionalities in this file are used by the town test files.

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

server.ts

---

- This file contains the necessary changes to shift to GraphQL server.
Apollo server is used for GraphQL.
This file also contains changes necessary to ensure that the calls made to the backend are authenticated and authorized. 
For this we have used JSON WEB Token methods and passed the appropriate information as context to the GraphQL resolvers.

---

Existing files deleted : 

---

router -> town.ts
- This existing file was deleted because it contained all REST API calls. Since we have migrated to GraphQL , this file was not used anymore. So we have deleted it.

client -> TownsServiceClient.ts
- This existing file was deleted because it contained the rest service client making REST API calls , but since we have migrated to GraphQL we have made a seperate file called TownsGraphQLClient.ts to handle the GraphQL API calls. So this file was innappropriate and deleted.

**FRONTEND**

---

graphql -> client.ts

---
- This file contains the code to create Apollo client and authentication context information.


---
graphql -> quries.ts

---
- This file contains the code to make GraphQL API calls to the Apollo server backend using Apollo Client.

---

components -> Login

---

TownSelection.tsx

- Create town and list town that was using REST API client was changed to use GraphQL API client - since we are migrating our project to GraphQL.

TownSelection.Part1.test.tsx, TownSelection.Part2.test.tsx, TownSelection.Part3.test.tsx

- The only modification that was done to tests was to use our GraphQL API client instead of REST API client -  to match out migration from REST to GraphQL. There were no other changes done to the test cases other than this.

TownSettings.test.tsx

- The only modification that was done to tests was to use our GraphQL API client instead of REST API client -  to match out migration from REST to GraphQL. There were no other changes done to the test cases other than this.

TownSettings.tsx

- Update town and delete town that was using REST API client was changed to use GraphQL API client - since we are migrating our project to GraphQL.
- CoveyAppState now uses TownsGraphQLClient instead of TownsServiceClient - this was done because of the shift to GraphQL APIs.

---

App.tsx

---
- This file now contains the appropriate changes to include the profile component , friend component , header component and auth0 parameters.
- We have also made a small change for CoveyAppState to use our new GraphQL client service.

---

components -> ProfileManagement -> FriendSearch.tsx

---

- Implemented component for searching a friend from the list of users.

---

components -> ProfileManagement -> InviteFriendComponent.tsx

---

- Implemented component to add a friend if the user is not already a friend or  invite user if user is already a friend of user.
- Added 'Add as friend' and 'Invite Button'.
- Shows all the information of the user who is being add as a friend or invited.

---

components -> ProfileManagement -> ProfileComponent.tsx

---

- Implemented component to see profile of a user which consists of information like email, Location, Occupation, Linkedin Link, Facebook link, Instagram Link. 
- It has feature to deactivate the account, update the user profile, see friend list and friend requests and Change password.
- Added buttons for Friend List, Update profile, Change Password and Delete account.
- Added search bar for searching users.

---

components -> ProfileManagement -> StarterPage.tsx

---

- Home Page of our application.
- Added Log in button.


---

components -> UserProfiles -> FriendsPage.tsx

---

- Implemented Friends page so the user can see the friend list and friend requests.
- Friend request can be accepted or denied.

---

services -> auth0Service.ts

---
- changes necessary to connect with Auth0.

---

CoveyTypes.ts

---
- Made a small change to remove the exsisting TownsServiceClient and use our TownsGraphQLClient.

---

classes -> TownsServiceClient.ts

---
- Removed the TownsServiceClient class that used REST APIs. This was removed because we shifted to GraphQL APIs and these changes are present in TownsGraphQLClient class under graphql folder->queries.ts
