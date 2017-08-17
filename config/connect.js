// var pg = require('pg'),
//     connectionString = process.env.DATABASE_URL || "postgres://yhemmy@localhost/test_elastic_search";

// pg.defaults.poolSize = 300;

// module.exports = function() {
//     // var deferred = Q.defer();
//    return new Promise((resolve, reject) => {
//        pg.connect(connectionString, function(err, client, drop) {
//        	if(err) reject(err);
//        	resolve({client, drop});
//         // deferred.resolve({err: err, client: client, drop : drop});
//     });	
//    })
// };

const { Client } = require('pg')
const connectionString = process.env.DATABASE_URL || "postgres://yhemmy@localhost/test_elastic_search";
module.exports = async function() {
	const client = new Client({
  	connectionString: connectionString,
	});
 await client.connect()
 return client; 
}