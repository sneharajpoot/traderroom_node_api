const { Worker } = require('worker_threads');

const startGetSettingInNewThread = () => {
    const worker = new Worker('./worker/commissionSchedulerWorker.js');

    // Send a message to the worker to start `getSeting`
    worker.postMessage({});

    worker.on('message', (msg) => {
        console.log(`Worker message: ${msg}`);
    });

    worker.on('error', (err) => {
        console.error(`Worker error: ${err.message}`);
    });

    worker.on('exit', (code) => {
        if (code !== 0) {
            console.error(`Worker stopped with exit code ${code}`);
        }
    });
};

module.exports = { startGetSettingInNewThread };