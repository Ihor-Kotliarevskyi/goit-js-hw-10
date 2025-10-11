import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const date = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const howDays = document.querySelector('span[data-days]');
const howHours = document.querySelector('span[data-hours]');
const howMinutes = document.querySelector('span[data-minutes]');
const howSeconds = document.querySelector('span[data-seconds]');
const label = document.querySelectorAll('.label');

label.forEach(item => (item.textContent = item.textContent.toUpperCase()));

btn.addEventListener('click', runAndStopTimer);

let intervalId = null;
let userSelectedDate = '';
btn.disabled = true;
date.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.parse(selectedDates[0]) > Date.now()) {
      btn.disabled = false;
      userSelectedDate = selectedDates[0];
    } else {
      btn.disabled = true;
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'bottomRight',
        timeout: 3000,
        progressBar: false,
        transitionIn: 'fadeInDown',
      });
    }
  },
};

flatpickr('#datetime-picker', options);

function runAndStopTimer() {
  if (btn.dataset.start === '') {
    intervalId = setInterval(() => {
      let deltaTime = Date.parse(userSelectedDate) - Date.now();

      if (deltaTime <= 0) {
        date.disabled = false;
        btn.disabled = true;
        btn.textContent = 'Start';
        btn.dataset.start = '';
        clearInterval(intervalId);
      } else {
        howSeconds.textContent = addLeadingZero(convertMs(deltaTime).seconds);
        howMinutes.textContent = addLeadingZero(convertMs(deltaTime).minutes);
        howHours.textContent = addLeadingZero(convertMs(deltaTime).hours);
        howDays.textContent = addLeadingZero(convertMs(deltaTime).days);
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
