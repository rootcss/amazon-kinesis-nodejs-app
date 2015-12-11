var separator = "+++++++++++++++++++++++++++++++++++";
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var kinesis = new AWS.Kinesis();
var sleep = require('sleep');

// Initializing few vars
var shardId = 'shardId-000000000000';
var streamName = 'rootCSSStream';
var startingSequenceNumber = '';
var nextIterator = '';
var iterator = '';
var data_fetch_limit = 50;	//9999 is max

function fetchData (iterator) {
	setTimeout(function (){
		var params = {
		  ShardIterator: iterator, /* required */
		  Limit: data_fetch_limit
		};
		kinesis.getRecords(params, function(err, data) {
		  if (err) {
		  	print(err, err.stack);
		  }
		  else {
			//print(data);
			records = data['Records'];
		  	nextIterator = data['NextShardIterator'];
		  	for (var i = records.length - 1; i >= 0; i--) {
		  		datablob = records[i]['Data'].toString('utf8');
		  		print(datablob);	// Send this to DynamoDB
		  	}
		  	print("Next iterator 1: "+nextIterator);
			fetchData(nextIterator);
		  }
		});
	}, 1000);
}

function print(data) {
	console.log(data);
}

print("Describing a stream..");
var params = {
  StreamName: streamName, /* required */
  //ExclusiveStartShardId: 'STRING_VALUE',
  Limit: 2
};
kinesis.describeStream(params, function(err, data) {
  if (err) print(err, err.stack); // an error occurred
  else {
  	    //print(data);           // successful response
  	    print("Fetching Shards Ids..");
  	    shards = data['StreamDescription']['Shards'];
  	    shardId = shards[0]['ShardId'];
  	    //print(data['StreamDescription']);
  	    startingSequenceNumber = shards[0]['SequenceNumberRange']['StartingSequenceNumber'];

  	    print("Using values:");
		print("Stream Name: " + streamName);
		print("Shard Id: " + shardId);
		print("Starting Seq Number: " + startingSequenceNumber);
		print(separator);

		var params = {
		  ShardId: shardId, /* required */
		  ShardIteratorType: 'AT_SEQUENCE_NUMBER', /* required */
		  //ShardIteratorType: 'AT_SEQUENCE_NUMBER | AFTER_SEQUENCE_NUMBER | TRIM_HORIZON | LATEST'
		  StreamName: streamName, /* required */
		  StartingSequenceNumber: startingSequenceNumber
		};
		kinesis.getShardIterator(params, function(err, data) {
		  if (err) print(err, err.stack);
		  else {
			iterator = data['ShardIterator'];
			print("Fetching the streaming data..");
			print("Data Fetch Limit is set to " + data_fetch_limit);
			fetchData(iterator);
		  }
		});
  }
});