function print(data) {
	data = "[*] " + data
	console.log(data);
}

function pprint(data) {
	//pretty-print JSON
	console.log(JSON.stringify(data,null,2));
}

function mergeJsonObject(obj1, obj2) {
	for (var key in obj2) { 
		obj1[key] = obj2[key]; 
	}
	return obj1;
}