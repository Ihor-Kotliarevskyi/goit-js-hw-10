import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const delay = Number(event.target.elements.delay.value);
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
        title: 'Ok',
        message: `Fulfilled promise in ${delay}ms`,
        position: 'bottomRight',
        timeout: 3000,
        progressBar: false,
        transitionIn: 'fadeInDown',
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay}ms`,
        position: 'bottomRight',
        timeout: 3000,
        progressBar: false,
        transitionIn: 'fadeInDown',
      });
    });

  form.reset();
}
