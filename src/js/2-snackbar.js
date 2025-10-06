import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const delay = document.querySelector('.form input');
const btn = document.querySelector('button');
const a = 1;
const b = 2;
form.addEventListener('submit', handlerSubmit);

function handlerSubmit(event) {
  event.preventDefault();
  const title = delay.value;
  const message = event.target.elements.state.value;
  if (event.target.elements.state.value === 'fulfilled') {
    iziToast.success({
      title: `OK`,
      message: `Delay: ${title}`,
      position: 'topCenter',
      timeout: 5000,
      progressBar: true,
      transitionIn: 'fadeInDown',
    });
  } else {
    iziToast.error({
      title: `Error`,
      message: `Delay: ${title}`,
      position: 'topCenter',
      timeout: 5000,
      progressBar: true,
      transitionIn: 'fadeInDown',
    });
  }
  form.reset();
}
