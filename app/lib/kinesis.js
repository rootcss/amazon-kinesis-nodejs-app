var fs = require('fs');
var q  = require('q');
eval(fs.readFileSync('./lib/util.js')+'');
var kin = require('./kinesis');

exports.getAllStreams = function(kinesis, args) {
	var deferred = q.defer();
	print("Listing streams..");
	var params = {
		//ExclusiveStartStreamName: undefined,
		Limit: 1
	};
	params = mergeJsonObject(params, args);
	kinesis.listStreams(params, function(err, data) {
		if (err) {
			deferred.reject({err: err});
		} else {
			deferred.resolve({streams: data['StreamNames']});
		}
	});
	return deferred.promise;
}

exports.getShardsFromStream = function(kinesis, args) {
	var deferred = q.defer();
	var params = {
		//StreamName: streamName, /* required */
		//ExclusiveStartShardId: 'STRING_VALUE',
		Limit: 1
	};
	params = mergeJsonObject(params, args);
	kinesis.describeStream(params, function(err, data) {
		if (err) {
			deferred.reject({err: err});
		}
		else {
	  	    print("Fetching shardIDs from the stream '" + args['StreamName'] + "'..");
	  	    shards = data['StreamDescription']['Shards'];
	  	    deferred.resolve({shards: shards})
		}
	});
	return deferred.promise;
}

exports.getIteratorForShard = function(kinesis, args) {
	var deferred = q.defer();
	var params = {
		ShardId: undefined, /* required */
		ShardIteratorType: 'AT_SEQUENCE_NUMBER', /* required */
		//ShardIteratorType: 'AT_SEQUENCE_NUMBER | AFTER_SEQUENCE_NUMBER | TRIM_HORIZON | LATEST'
		StreamName: undefined, /* required */
		StartingSequenceNumber: undefined
	};
	params = mergeJsonObject(params, args);
	kinesis.getShardIterator(params, function(err, data) {
		if (err) {
			deferred.reject({err: err});
		}
		else {
			print("Fetching ShardIterator from the stream..");
			iterator = data['ShardIterator'];
			deferred.resolve({iterator: iterator})
		}
	});
	return deferred.promise;
}

exports.fetchDataFromIterator = function(kinesis, iterator, data_fetch_limit) {
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
		  	//print("Next iterator 1: "+nextIterator);
			kin.fetchDataFromIterator(kinesis, nextIterator, data_fetch_limit);
		  }
		});
	}, 1000);
}