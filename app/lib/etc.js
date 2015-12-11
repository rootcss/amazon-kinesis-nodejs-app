kin.getAllStreams(kinesis, {Limit: 3}).then(function(data) {
	streams = data['streams'];
	streams.forEach(function(stream){
		kin.getShardsFromStream(kinesis, {StreamName: stream}).then(function(data){
			shards.push(data['shards']);
		}, function(err){
			print(err, err.stack);
		});
	});	// getShardsFromStream() ENDS
}, function(err) {
	print(err, err.stack);
}); // getAllStreams() ENDS