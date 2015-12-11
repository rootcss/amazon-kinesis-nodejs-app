var separator = "+++++++++++++++++++++++++++++++++++";
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var kinesis = new AWS.Kinesis();
//console.log(kinesis);

// var s3bucket = new AWS.S3({params: {Bucket: 'myBucket'}});

// console.log(s3bucket);

// s3bucket.createBucket(function() {
//   var params = {Key: 'myKey', Body: 'Hello!'};
//   s3bucket.upload(params, function(err, data) {
//     if (err) {
//       console.log("Error uploading data: ", err);
//     } else {
//       console.log("Successfully uploaded data to myBucket/myKey");
//     }
//   });
// });

//CREATE A NEW STREAM
// console.log(separator);
// var params = {
//   ShardCount: 2, /* required */
//   StreamName: 'rootCSSStream' /* required */
// };
// kinesis.createStream(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

// DESCRIBE A STREAM
// console.log(separator);
// var params = {
//   StreamName: 'rootCSSStream', /* required */
//   //ExclusiveStartShardId: 'STRING_VALUE',
//   Limit: 2
// };
// kinesis.describeStream(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

// LIST ALL STREAM
console.log(separator);
var params = {
  //ExclusiveStartStreamName: 'STRING_VALUE',
  Limit: 2
};
kinesis.listStreams(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


// DELETE A STREAM
// var params = {
//   StreamName: 'rootCSSStream' /* required */
// };
// kinesis.deleteStream(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });
// var params = {
//   StreamName: 'rootCSSStream2' /* required */
// };
// kinesis.deleteStream(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });


// //PUT A RECORD IN A STREAM
// console.log(separator);
// var params = {
//   Data: new Buffer('...') || 'hellow worl testinsgd sdg sd sdf sdf sdf ', /* required */
//   PartitionKey: '1', /* required */
//   StreamName: 'rootCSSStream', /* required */
//   //ExplicitHashKey: 'STRING_VALUE',
//   //#SequenceNumberForOrdering: 'STRING_VALUE'
// };
// kinesis.putRecord(params, function(err, data) {
//   if (err) console.log(err, err.stack); // an error occurred
//   else     console.log(data);           // successful response
// });

var params = {
  ShardId: 'shardId-000000000001', /* required */
  ShardIteratorType: 'AFTER_SEQUENCE_NUMBER', /* required */
  //ShardIteratorType: 'AT_SEQUENCE_NUMBER | AFTER_SEQUENCE_NUMBER | TRIM_HORIZON | LATEST'
  StreamName: 'rootCSSStream', /* required */
  StartingSequenceNumber: '49556900816266307298830090192550686886802838186478272530'
};
kinesis.getShardIterator(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});


var params = {
  ShardIterator: 'AAAAAAAAAAE0k8NL+4EXpvUJBF75cRuSK1SqMIrPD7nfAUIdsmT08RZkgEgy/WTkMfSXq0UaEW6z0nC3pCeVv9flZkyJwJ+XrPbLiP8f8eQitE/FVGeXKQ4COYi0p0zpVrM9HinodRBV58rNwHUpvjXt7MWN7amON7OTqP9SsJv+ee4aZSHUGk80ysqBAvlInziqCYca5CfS1Uvg/v0PpKT91ujyUd+H', /* required */
  Limit: 1
};
kinesis.getRecords(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});