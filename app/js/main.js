/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// helper functions ----------

function logResult(result) {
  console.log(result);
}

function logError(error) {
  console.log('Looks like there was a problem:', error);
}

function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
  //untuk memberikan pesan dan menguji apakah fungsi bekerja dengan benar
}

function readResponseAsJSON(response) {
  return response.json();
}

function readResponseAsBlob(response) {
  return response.blob();
}

function readResponseAsText(response) {
  return response.text();
}

function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}

function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}

function logSize(response) {
  const url = response.url;
  const size = response.headers.get('content-length');
  console.log(`${url} is ${size} bytes`);
}


// Fetch JSON ----------

function fetchJSON() {
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(readResponseAsJSON)
    .then(logResult) //jika promise berhasil maka akan masuk ke logResult
    .catch(logError); //jika promise gagal maka akan masuk ke logError
}
const jsonButton = document.getElementById('json-btn');
jsonButton.addEventListener('click', fetchJSON);


// Fetch Image ----------

function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage) //jika berhasil mengambil gambar maka, gambar akan di tampilkan
    .catch(logError); // jika tdk berhasil mengambilgambar maka, gambar tdk akan ditampilkan
}
const imgButton = document.getElementById('img-btn');
imgButton.addEventListener('click', fetchImage);


// Fetch text ----------

function fetchText() {
  fetch('examples/words.txt')
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const textButton = document.getElementById('text-btn');
textButton.addEventListener('click', fetchText);


// HEAD request ----------

function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
    .then(validateResponse)
    .then(logSize)
    .catch(logError);
}
const headButton = document.getElementById('head-btn');
headButton.addEventListener('click', headRequest);


// POST request ----------

/* NOTE: Never send unencrypted user credentials in production! */
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  const messageHeaders = new Headers({
    'Content-Type': 'application/json',
    // 'Content-Length': 'kittens' // Content-Length can't be modified!
    'X-Custom': 'hello world',
    // 'Y-Custom': 'this will not work' // Y-Custom is not accepted by our echo server!
  })
  fetch('http://localhost:5000/', {
    method: 'POST',
    // body: formData,
    body: JSON.stringify({ lab: 'fetch', status: 'fun' }),
    headers: messageHeaders
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
const postButton = document.getElementById('post-btn');
postButton.addEventListener('click', postRequest);

