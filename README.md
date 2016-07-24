## Web Crawler

### This application exposes a REST API that has two functions:
1. Adding jobs to a queue whose workers fetch data from a URL and stores the results in a database.
2. Checking the status of a given job.
   * If the job is complete, the response should include the HTML from a given URL.

User submits www.google.com to the API. The user gets back a job id. The system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he or she gets a response that includes the HTML for www.google.com

### Getting Started:
```
  Dependencies: Node 6.2.1, RabbitMQ 3.6.1, MongoDB 3.2.8
  If you are using Mac OSX for development, installation of these is fairly straightforward using homebrew: `brew install <x>`
  If this is your first time installing mongodb, you may have to `sudo mkdir /data/db`
  If this is your first time installing RabbitMQ, you may have to add `/usr/local/sbin` to your $PATH

  Make sure to run npm install in the web_crawler directory.

  You can start each service separately:
    1. mongod
    2. rabbitmq-server
    3. node worker for each worker
    4. node web

  I have also written a bash script that should start all of the above for you.
    npm start [number of workers]

  After all processes are running, the web server exposes two REST API endpoints:
```

### REST API endpoints:
```
POST   /api/scrape    Submits a URL to be scraped, expecting 'uri' or 'url' in body as JSON. Responds with a job ID.
GET    /api/job/:id   Requests status on a job of given ID. Responds with a site's HTML if complete.
```


### Architecture:
  The system consists of four parts:
  1. A web server that exposes 2 RESTful API endpoints.
  2. A queuing system that manages flow of jobs from the web server(s) to one or more web workers.
  3. Web workers that extract the html from a given page and place that information in a persistant data store.
  4. A persistant data store.

### Technologies:
  Node.js, Express, RabbitMQ, MongoDB, Chai, Supertest

### Tradeoffs:
  There are several tradeoffs that I was concerned with while designing this system.
  
  I chose to use MongoDB because the key-value store allows me to sync keys with job IDs, and because if this were to scale even further MongoDB could be broken out and run on its own machine. If I were to use something like, say, the file system to store the collected HTML in order to make the system more lightweight I would have to then devise a way to generate keys and otherwise manage the database. If I were to use something like Redis, I would potentially lose information if the system died. Using MongoDB has the added cost of installation difficulties, but in scaling this could be automated through the use of something like Docker. If the 'job' API endpoint were directed toward a given URL rather than a specific job ID, I would also worry about duplicating already-scraped pages, but that was not a concern. 
  
  I chose to use RabbitMQ despite the extra cost in installation rather than something like a cronjob because it is very robust and helps to protect against failures. Also because of scaling concerns: If I were to continue to scale this upward with multiple web servers and/or workers, RabbitMQ can help to handle the input from multiple servers and also distributes the load to multiple workers.

### Tests:
  Use `npm test` to run test suite.
  