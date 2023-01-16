            // Abbreviation all capital letters must be entered here
            // AcFD will not work 
            const lists = {
              'ACFD': 'JJKSHJHJJJJKJSBJ',
              '////': 'Weather is bad',
              '/////////': 'Cloud not reported due faulty sensor',
              'METAR AUTO': 'Automatic aerodrome routine meteorological report'
            };

            let textareaRead = document.querySelector('.js-textarea-read');
            let textareaWrite = document.querySelector('.js-textarea-write');
            let button = document.querySelector('.button-decode');
            button.onclick = function () {
              const abbreviation = textareaRead.value.toUpperCase();
              const list = lists[abbreviation] || null;
              let list_data = '';
              for (let key in list) {
                list_data += `${list[key]}`;
                textareaWrite.innerHTML = list_data;
              }
            }
            function checkForEnter(e) {
              if (e.keyCode == 13) {
                event.preventDefault();
                button.click();
              }
            }