# amazon-kinesis-nodejs-app
<ol>
<li>Don't forget to add AWS_ACCESS_KEY_ID & AWS_SECRET_ACCESS_KEY in your environment variables.</li>
<li>npm install aws-sdk</li>
<li>npm install q</li>
</ol>


<b><u>To run the 'prototype'. Use commands:</u></b>:
<ul>
<li>cd prototype</li>
<li>node runner.js create_stream</li>
<li>node runner.js list_streams</li>
<li>node runner.js list_streams</li>
<li>node runner.js describe_stream</li>
<li>sh streamer.sh and keep it running..</li>
<li>then, <i>node read.js</i> in a separate tab.</li>
</ul>

<b><u>To run the main 'app'. Use commands:</u></b>:
<li>To create stream use the commands and scripts of prototype. [Producer]</li>
<li>For the [Consumer], use: <i>node consumer.js</i></li>
