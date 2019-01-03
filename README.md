https://courseclub.net/wp-content/uploads/2018/10/CourseClub.NET-AdvancedReact%20-%20FullStack%20Advanced%20React%20%26%20Graphql.torrent
rsync -chavzP -e "ssh" "root@103.27.108.110:/root/\[CourseClub.NET\]\ AdvancedReact\ -\ FullStack\ Advanced\ React\ \&\ Graphql/*" ~/world/opt/farm/video_course/courseclub.net_advanced_react_graphql/

https://linuxacademy.com/
https://github.com/facebook/graphql


# https://www.graphqlhub.com
> https://www.graphqlhub.com/playground?query=%23%20Welcome%20to%20GraphQLHub!%20Type%20your%20GraphQL%20query%20here%2C%20or%0A%23%20explore%20the%20%22Docs%22%20to%20the%20right%0Aquery%20TestQuery%20%7B%0A%20%20graphQLHub%0A%7D&variables=
swapi-graphql

>Autocomplete ctrl+space


### demos
> 1. query TestQuery {
     	graphQLHub
     	github {
         user(username: "qpjoy") {
           id
           company
           avatar_url
           repos {
             name
           }
         }
       }
     }

### examples
> 1. query TestQuery(
       $currentUserName: String!,
       $includeRepos: Boolean!
     ) {       
       github {
       	user(username: $currentUserName) {
           githubid:id
           company
           avatar_url
           repos @include(if: $includeRepos) {
             name
           }
         }
       }
     }
     
     QUERY VARIABLES
     {
       "currentUserName": "leebyron",
       "includeRepos": true
     }
     
> 2. Aliases
     query TestQuery(
       $userName1: String!,
       $userName2: String!
     ) {
       github {
       	user1: user(username: $userName1) {
           githubid:id
           company
           avatar_url    
         }
         user2: user(username: $userName2) {
           githubid:id
           company
           avatar_url
         }
       }
     }
     
     QUERY VARIABLES
     {
       "userName1": "leebyron",
       "userName2": "dschafer"
     }
     
> 3. Fragment
     query TestQuery(
       $userName1: String!,
       $userName2: String!
     ) {
       github {
       	user1: user(username: $userName1) {
           ...UserInfo
         }
         user2: user(username: $userName2) {
           ...UserInfo
         }
       }
     }
     fragment UserInfo on GithubUser {
       id
       company
       avatar_url
     }
     
     QUERY VARIABLES
     {
       "userName1": "leebyron",
       "userName2": "dschafer"
     }
     
> 4. Inline Fragments
     {
       github {
         repo(name: "graphql", ownerUsername: "facebook") {
           commits {
             message
             author {
               ... on GithubUser {
                 login
               }
               ... on GithubCommitAuthor {
                 email
               }
             }
           }
         }
       }
     }

> 5. Mutations
     mutation AddResource($input: CreateLinkInput!) {
       createLink(input: $input) {
         linkEdge {
           node {
             id
           }
         }
       }
     }
         
     QUERY VARIABLES
     {
       "input": {
         "title": "GraphQLHub",
         "url": "https://www.graphqlhub.com/",
         "clientMutationId": 42
       }
     }
     
     
### cmd
> 1. git clone https://github.com/reactjscamp/name-contests
> 2. git checkout m3-02