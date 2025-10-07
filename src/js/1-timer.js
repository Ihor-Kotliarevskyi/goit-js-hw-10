import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const howDays = document.querySelector('[data-days]');
const howHours = document.querySelector('[data-hours]');
const howMinutes = document.querySelector('[data-minutes]');
const howSeconds = document.querySelector('[data-seconds]');

date.addEventListener('input', handlerInput);
btn.addEventListener('click', handlerClick);

let intervalId = 0;
btn.disabled = true;

function handlerInput() {
  if (Date.parse(date.value) > Date.now()) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
    iziToast.error({
      message: 'Please choose a date in the future',
      position: 'topCenter',
      timeout: 5000,
      progressBar: false,
      transitionIn: 'fadeInDown',
    });
  }
}

function handlerClick() {
  if (btn.dataset.start === '' && Date.parse(date.value) > Date.now()) {
    intervalId = setInterval(() => {
      let interval = Date.parse(date.value) - Date.now();

      if (interval === 0) {
        clearInterval(intervalId);
      } else {
        howDays.textContent = convertMs(interval).days;
        howHours.textContent = convertMs(interval).hours;
        howMinutes.textContent = convertMs(interval).minutes;
        howSeconds.textContent = convertMs(interval).seconds;
      }
    }, 1000);

    date.disabled = true;
    btn.textContent = 'Stop';
    btn.dataset.start = 'Stop';
    console.log(btn.dataset, intervalId);
  } else {
    btn.textContent = 'Start';
    btn.dataset.start = '';
    console.log(btn.dataset, intervalId);
    clearInterval(intervalId);
  }
}
