# amazon-kinesis-nodejs-app
<ol>
<li>Don't forget to add AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY in your environment variables.</li>
<li>npm install aws-sdk</li>
<li>npm install q</li>
</ol>


<b><u>To run the 'prototype'. Use commands:</u></b>:
cd prototype
node runner.js create_stream
node runner.js list_streams
node runner.js list_streams
node runner.js describe_stream
sh streamer.sh and keep it running..

then, <i>node read.js</i> in a separate tab.

<b><u>To run the main 'app'. Use commands:</u></b>:
To create stream use the commands and scripts of prototype. [Producer]
For the [Consumer], use: <i>node consumer.js</i>
