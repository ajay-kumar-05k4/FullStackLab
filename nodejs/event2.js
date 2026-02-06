const EventEmitter = require('events');

const myEmitter = new EventEmitter();


myEmitter.on('greet', (msg) => {
  console.log('Hello there!',msg);
});

myEmitter.emit('greet','ajay');