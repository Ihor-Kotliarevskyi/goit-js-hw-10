import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.form input');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const delay = delayInput.value;
  const state = event.target.elements.state.value;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  })
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        progressBar: false,
        transitionIn: 'fadeInDown',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
        timeout: 3000,
        progressBar: false,
        transitionIn: 'fadeInDown',
      });
    });

  // if (state === 'fulfilled') {
  //   iziToast.success({
  //     message: `Fulfilled promise in ${delay}ms`,
  //     position: 'topRight',
  //     timeout: 50000,
  //     progressBar: false,
  //     transitionIn: 'fadeInDown',
  //   });
  // } else {
  //   iziToast.error({
  //     message: `Rejected promise in ${delay}ms`,
  //     position: 'topRight',
  //     timeout: 50000,
  //     progressBar: false,
  //     transitionIn: 'fadeInDown',
  //   });
  // }

  form.reset();
}
