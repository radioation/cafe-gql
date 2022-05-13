# Description
This project is a toy-example using [NestJS](https://github.com/nestjs/nest) and GraphQL.  
I created it to teach myself how to implement a GraphQL server with NestJS, PostgreSQL and TypeORM.



# Running
This server requires a PostgreSQL database.  It also expects a database configuration file
name ".env.stage.dev" in the root directory.  The file should provide the database name 
and credentials you want to use.  For example, I created a database named 'cafe_gql' 
in a docker container with the username and password set to 'postgres'.  So my ".env.stage.dev"
file looks like the following: 

~~~txt
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=cafe_gql
DB_USERNAME=postgres
DB_PASSWORD=postgres
~~~

To run the server use
~~~bash
$ yarn start:dev
~~~
And connect to the server with a web-browser at http://localhost:3000/graphql


# License
THis project is [MIT licensed](LICENSE).
