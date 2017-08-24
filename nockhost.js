

function listener() {
const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const  exec   = require('child_process').exec;

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.on('message', (msg, rinfo) => {
  console.log(`request from ${rinfo.address}:${rinfo.port}`);
  if (msg.equals(new Buffer('9d16703cb6622e3f08d13b1c20334419\n', 'utf8'))) {
	console.log(`Creating access to ${rinfo.address}`); 
	exec(`ipset add nockhost ${rinfo.address} -!`, (err, stdout, stderr) => {
	  if (err) {
    		console.error(err);
    		return;
  	  }
          console.log(stdout);
	  var buf = new Buffer('OK,  you have gained access for 24 hours');
	  server.send(buf, 0, buf.length, rinfo.port, rinfo.address);
	} ) ; 	
//	server.close();
  	}
});

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(4444);
}

module.exports.listener = listener;
