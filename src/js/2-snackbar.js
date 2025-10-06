// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const btn = document.querySelector('button');

form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  console.log(event.element);
}

// iziToast.show({
//   title: `${}`,
//   message: `${}`,
// });
