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
const btn = document.querySelector('button[data-start]');
const howDays = document.querySelector('span[data-days]');
const howHours = document.querySelector('span[data-hours]');
const howMinutes = document.querySelector('span[data-minutes]');
const howSeconds = document.querySelector('span[data-seconds]');
const label = document.querySelectorAll('.label');

label.forEach(item => (item.textContent = item.textContent.toUpperCase()));

date.addEventListener('input', chooseDate);
btn.addEventListener('click', runAndStopTimer);

let intervalId = null;
btn.disabled = true;
date.disabled = false;

function chooseDate() {
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

function runAndStopTimer() {
  if (btn.dataset.start === '' && Date.parse(date.value) > Date.now()) {
    intervalId = setInterval(() => {
      let deltaTime = Date.parse(date.value) - Date.now();

      if (deltaTime <= 0) {
        date.disabled = false;
        btn.disabled = true;
        btn.textContent = 'Start';
        btn.dataset.start = '';
        clearInterval(intervalId);
      } else {
        howSeconds.textContent = String(convertMs(deltaTime).seconds).padStart(
          2,
          '0'
        );
        howMinutes.textContent = String(convertMs(deltaTime).minutes).padStart(
          2,
          '0'
        );
        howHours.textContent = String(convertMs(deltaTime).hours).padStart(
          2,
          '0'
        );
        howDays.textContent = String(convertMs(deltaTime).days).padStart(
          2,
          '0'
        );
      }
    }, 1000);

    date.disabled = true;
    btn.textContent = 'Stop';
    btn.dataset.start = 'Stop';
  } else {
    date.disabled = false;
    btn.textContent = 'Start';
    btn.dataset.start = '';
    clearInterval(intervalId);
  }
}
