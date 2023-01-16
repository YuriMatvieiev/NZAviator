const users = {
  'ACFD': 'JJKSHJHJJJJKJSBJ',
  '////': 'Weather is bad',
  '/////////': 'Cloud not reported due faulty sensor',
  'METAR AUTO': 'Automatic aerodrome routine meteorological report'
};

let textareaRead = document.querySelector('.js-textarea-read');
let textareaWrite = document.querySelector('.js-textarea-write');
let button = document.querySelector('.button-decode');
button.onclick = function () {
  const name = textareaRead.value.toUpperCase();
  const user = users[name] || null;
  let user_data = '';
  for (let key in user) {
    user_data += `${user[key]}`;
    textareaWrite.innerHTML = user_data;
  }
}