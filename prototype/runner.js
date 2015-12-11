var arg = process.argv[2];

var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var kinesis = new AWS.Kinesis();

if(arg == 'create_stream') {
	console.log("Creating a stream..")
	var params = {
	  ShardCount: 1, /* required */	
	  StreamName: 'rootCSSStream' /* required */
	};
	kinesis.createStream(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});	
}
else if(arg == 'delete_stream') {
	console.log("Deleting a stream..")
	var params = {
	  StreamName: 'rootCSSStream' /* required */
	};
	kinesis.deleteStream(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else     console.log(data);           // successful response
	});
}
else if(arg == 'list_streams') {
	console.log("Listing streams..");
	var params = {
	  //ExclusiveStartStreamName: 'STRING_VALUE',
	  Limit: 2
	};
	kinesis.listStreams(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else {
	  	     console.log(data);           // successful response
	  	     console.log(data['StreamNames']);	
	  }
	});
}
else if(arg == 'describe_stream') {
	console.log("Describing a stream..");
	var params = {
	  StreamName: 'rootCSSStream', /* required */
	  //ExclusiveStartShardId: 'STRING_VALUE',
	  Limit: 2
	};
	kinesis.describeStream(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else {
	  	    console.log(data);           // successful response
	  	    // console.log("Shards: ");
	  	    // shards = data['StreamDescription']['Shards'];
	  	    // console.log(shards[0]['ShardId']);
	  }
	});
}
else {
	console.log("Nothing was selected!")
}
