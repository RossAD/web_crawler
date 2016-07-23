## Web Crawler

### This application exposes a REST API that has two functions:
1.) Adding jobs to a queue whose workers fetch data from a URL and stores the results in a database.
2.) Checking the status of a given job.
  2a.) If the job is complete, the response should include the HTML from a given URL.

User submits www.google.com to the API. The user gets back a job id. The system fetches www.google.com (the result of which would be HTML) and stores the result. The user asks for the status of the job id and if the job is complete, he or she gets a response that includes the HTML for www.google.com

### Getting Started:

### Architecture:

### Technologies:
  Node.js, Express, RabbitMQ, Chai, Supertest