const cluster = require('cluster');
var nockhost = require('./nockhost.js');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  cluster.fork();

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    var newworker = cluster.fork();
    console.log("Spawning new worker " + newWorker.pid);
  });
} else {
  nockhost.listener();
  console.log(`Worker ${process.pid} started`);
}
