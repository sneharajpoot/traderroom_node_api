const { parentPort } = require('worker_threads');
const { getSeting } = require('../controller/commission.controller');

// Listen for messages from the main thread
parentPort.on('message', async () => {
    console.log(`Worker thread: Calling getSeting`);
    try {
        await getSeting(); // Call getSeting without parameters
        parentPort.postMessage('getSeting executed successfully');
    } catch (error) {
        console.error(`Error in worker thread: ${error.message}`);
        parentPort.postMessage(`Error: ${error.message}`);
    }
});