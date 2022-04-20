import { gsap, Back, MotionPathPlugin, TextPlugin } from 'gsap/all';
import { v4 as uuidv4 } from 'uuid';

import '../css/counter.css';

const { VITE_API } = import.meta.env;

const getLikes = async () => {
  const url = VITE_API;
  const likesCounter = document.querySelector('.number');

  try {
    const fetchResponse = await fetch(url);
    const { data } = await fetchResponse.json();

    likesCounter.textContent = data['likes'];
  } catch (error) {
    likesCounter.textContent = 0;
  }
};

let uuid = '';
const sendRequest = async (create) => {
  const url = VITE_API;

  if (create) uuid = uuidv4();

  try {
    const fetchResponse = await fetch(url, {
      method: create ? 'POST' : 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uuid }),
    });
    const { data } = await fetchResponse.json();

    console.log(data['message']);
  } catch (error) {
    console.log(error);
  }
};

window.addEventListener('load', async () => {
  await getLikes();

  let like = parseInt(document.querySelector('.number').textContent) + 1;
  let flag = true;

  gsap.registerPlugin(MotionPathPlugin, TextPlugin);
  const timeline1 = gsap.timeline({ repeatDelay: 0.7, paused: true });

  timeline1
    .to('.button', { duration: 0.7, width: 50, ease: Back.easeIn })
    .to('.like', { duration: 0.2, opacity: 0 }, '-=0.7')
    .to('.number', { duration: 0.2, opacity: 0, fontSize: 0 }, '-=0.7')
    .to('.far', { duration: 0.4, display: 'none' }, '-=0.5')
    .to('.fa', { duration: 0.1, display: 'inline-block' }, '-=0.1')
    .to('.button', { duration: 0.7, width: 170 })
    .to('.like', { opacity: 1 }, '-=0.5')
    .to('.d', { duration: 0.3, opacity: 1, translateX: 0 }, '-=0.2')
    .to(
      '.number',
      { duration: 0.2, opacity: 1, text: like, fontSize: 25 },
      '-=0.1'
    );

  document.querySelector('.button').addEventListener('click', (e) => {
    e.stopPropagation();
    sendRequest(flag);
    flag ? timeline1.play() : timeline1.progress(0).pause();
    flag = !flag;
  });
});
