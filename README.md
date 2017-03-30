# A sample NodeJs app to benchmark and compare AWS Lambda & PCF####
I was tasked with comparingan APi endpoint utilzing AWS Gateway API and Lambda services versus running the exact same app in Pivotal Cloud Foundry. This app is a very basic example of user registration, login, logout, view profile, and upload a profile picture.asd

To use it in AWS Lambda, the index.js file is utilized as entry points into the app. To use it in PCF (on a standalone NodeJs server), the normal server.js file is utilized to start an ExpressJs server and sever the endpoints.
#
## Lambda Version#
The Lambda version uses the AWS Gateway API as the endpoints, which I build using a swagger.yml reference file (also in this repo). Once the API is created and the Lambda functions are created, you can go into the API and associate each HTTP verb with the appropriate Lambda function. The app uses CloudWatch for logging, an RDP MySQL database, and the all the baked-in stuff from AWS. The database connection params are set as environment variables in GatewayAPI, to mimic how PCF does it.

## PCF Version
The full NodeJs app uses winston for logging, sequilize for interfacing a MySQL database (made available via the PCF Marketplace), expressjs as the web server, and AutoScaling (made available via the PCF Marketplace). It gets settings like web server port # and database connection params from the environment variables made available by PCF runtime (/config/vcap_services.js). The manifest.yml file is the configuration used to push the app to PCF, there are no arguments provided when executing $ cf push.

I have also created an AngularJs site using these different versions, which you can find in my repos.
