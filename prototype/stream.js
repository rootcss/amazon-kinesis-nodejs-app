var data = process.argv[2];

var separator = "+++++++++++++++++++++++++++++++++++";
var AWS = require('aws-sdk');
AWS.config.region = 'us-west-2';
var kinesis = new AWS.Kinesis();

//PUT A RECORD IN A STREAM
console.log(separator);
var params = {
  //Data: new Buffer('...') || data, /* required */
  Data: data, /* required */
  PartitionKey: '1', /* required */
  StreamName: 'rootCSSStream', /* required */
  //ExplicitHashKey: 'csstime',
  //#SequenceNumberForOrdering: 'STRING_VALUE'
};
kinesis.putRecord(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});



//console.log(data);