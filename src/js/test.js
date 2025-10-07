// Promise.resolve('success value')
//   .then(value => console.log(value))
//   .catch(error => console.log(error));
// Promise.reject('error value')
//   .then(value => console.log(value))
//     .catch(error => console.log(error));

// const makeGreeting = (guestName, onSuccess, onError) => {
//   if (!guestName) {
//     onError('Guest name must not be empty');
//   } else {
//     onSuccess(`Welcome ${guestName}`);
//   }
// };

// makeGreeting(
//   'Mango',
//   greeting => console.log(greeting),
//   error => console.error(error)
// );
