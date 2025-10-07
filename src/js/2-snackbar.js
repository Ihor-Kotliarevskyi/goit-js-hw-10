import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delayInput = document.querySelector('.form input');
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const delay = delayInput.value;
  const message = event.target.elements.state.value;
  if (event.target.elements.state.value === 'fulfilled') {
    iziToast.success({
      message: `Fulfilled promise in ${delay}ms`,
      position: 'topCenter',
      timeout: 5000,
      progressBar: false,
      transitionIn: 'fadeInDown',
    });
  } else {
    iziToast.error({
      message: `Rejected promise in ${delay}ms`,
      position: 'topCenter',
      timeout: 5000,
      progressBar: false,
      transitionIn: 'fadeInDown',
    });
  }
  form.reset();
}
