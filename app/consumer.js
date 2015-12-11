// import lib files
var kin = require('./lib/kinesis');
var fs = require('fs');
eval(fs.readFileSync('./lib/util.js')+'');

// import aws libs
var AWS = require('aws-sdk');

// // configurations
AWS.config.region = 'us-west-2';

// //get Kinesis object
var kinesis = new AWS.Kinesis();

// some initializations
var streamName = 'rootCSSStream';
var shardIds = [];
var startingSequenceNumber = {};

// IMP: Set the data fetch limit here
var data_fetch_limit = 2

kin.getShardsFromStream(kinesis, {StreamName: streamName, Limit: 3}).then(function(data){
	shards = data['shards'];
	//pprint(shards);
	shards.forEach(function(shard){
		shardIds.push(shard['ShardId']);
		startingSequenceNumber[shard['ShardId']] = shard['SequenceNumberRange']['StartingSequenceNumber'];
	});
	
	// pprint(startingSequenceNumber);
	// pprint(shardIds);
	shardId = shardIds[0];
	args = {
		ShardId: shardId,
		ShardIteratorType: 'AT_SEQUENCE_NUMBER',
		StreamName: streamName,
		StartingSequenceNumber: startingSequenceNumber[shardId]
	};
	kin.getIteratorForShard(kinesis, args).then(function(data){
		iterator = data['iterator'];
		print("Fetching data from iterator..")
		kin.fetchDataFromIterator(kinesis, iterator, data_fetch_limit)		
	}, function(err){
			print(err, err.stack);
		}
	);

}, function(err){
		print(err, err.stack);
	}
);	// getShardsFromStream() ENDS