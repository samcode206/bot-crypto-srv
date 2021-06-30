
# bot-services-uphold

to run the application you must have docker installed, once you have installed docker use one of the following commands to run the tests 
run one of the commands below depending on your version of docker.

## design 
I am building this application in containers from the beginning to make it possible to scale while maintaining simple code that lives in containers and communicates via events. 
I am using Redis as a publisher/subscriber service that will handle communicating events between the different services which in my case it will publish an event whenever there is an oscillation percentage greater than what the client has specified.

my master service will consume these events through different channels by subscribing to all the price pairs that the user wants to be notified on, which will be specified in the ```docker-compose.yml``` file. It will then take these messages and log them to the terminal (can easily be extended to text/email client) and save to a Postgres database. 

with this architecture it will be easy to scale the application to handle more traffic and there will be no complex server side code  because each worker service is only concerned about one price pair while still being flexible as far as how often to fetch requests and oscillation rates to set up notifications. A worker container will fully manage a single price pair monitoring, which will allow for more containers to be created and stoped on demand. 


![alttext](https://i.ibb.co/p1z6tsn/bot-infra.png)

## running tests

```bash
docker-compose -f docker-compose-tests.yml up --build
```
or 
```bash
docker compose -f docker-compose-tests.yml up --build
```


## running App
inside of the parent working direction where the docker compose file lives run either

```bash
docker-compose up --build
```
or 
```bash
docker compose up --build
```

## stoping containers 
to stop any container crtl ^c and to remove containers and networking  repeat the same command and replace ```up``` with ```down``` and omit ```--build```

## running multiple pairs 
to run multiple pairs, read the comments carefully uncomment the commented services inside the ```docker-compose.yml``` replace the channels env variables in the master to reflect the new channels to listen on for events. 

## Things to add for production

1. adding a persistent volume to database inside the container or use a managed database service. 
2. use cluster mode to run Redis to improve performance and scaleability.
3. turn the master service into a RESTful Api which will require the use of a service like Dockerode to spin up containers on the fly instead of docker compose (drawback will be that we have to manage container networking instead of delegating to docker compose to manage networking).
4. write out tests for the master (only the worker is currently tested because this is a demo and worker is doing all the heavy-work so its important to test it).
5. instead if simply logging the alert, use a messaging service such as AWS SES, AWS SNS, SendGrid, etc. In order to notify client. 
6. address bug on the first insert (duplicate warning yet everything still works!)
7. figure out how our client will read the data and create indices on the most queried fields (drawback will be slower writes to the database)
8. look into a heavier weight pub/sub system that supports acknowledgments & guaranteed delivery to improve reliability
9. look into database replication and adding a database optimized for data analysis for improved performance
10. add Error Loop Detection to detect if a container is stuck in a loop of errors (fetching request fails, or any other error) and stop/restart/kill that container
