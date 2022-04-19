import { gsap, Back, MotionPathPlugin, TextPlugin } from 'gsap/all';

import './style.css';

const {
  VITE_STUDENT1ID,
  VITE_STUDENT1NICKNAME,
  VITE_STUDENT1NAME,
  VITE_STUDENT1IMG,
  VITE_STUDENT2ID,
  VITE_STUDENT2NICKNAME,
  VITE_STUDENT2NAME,
  VITE_STUDENT2IMG,
} = import.meta.env;

/* Tickets */
// Adding data to the DOM
const addIMG = (element, src, alt) => {
  const image = document.getElementById(element);
  image.src = src;
  image.alt = alt;
};

const addText = (element, content) => {
  const paragraph = document.getElementById(element);
  const text = document.createTextNode(content);
  paragraph.appendChild(text);
};

addText('ticket-1-number', VITE_STUDENT1ID);
addText('ticket-1-name', VITE_STUDENT1NAME);
addText('ticket-1-username', VITE_STUDENT1NICKNAME);
addIMG('ticket-1-profile_image', VITE_STUDENT1IMG, VITE_STUDENT1NICKNAME);

addText('ticket-2-number', VITE_STUDENT2ID);
addText('ticket-2-name', VITE_STUDENT2NAME);
addText('ticket-2-username', VITE_STUDENT2NICKNAME);
addIMG('ticket-2-profile_image', VITE_STUDENT2IMG, VITE_STUDENT2NICKNAME);

// Adding event listeners
const ticket1 = document.getElementById('ticket-1');
ticket1.addEventListener('mousemove', (e) => mousemove(e, ticket1));

const ticket2 = document.getElementById('ticket-2');
ticket2.addEventListener('mousemove', (e) => mousemove(e, ticket2));

const mousemove = (event, element) => {
  const { x, y, width, height } = element.getBoundingClientRect();
  const centerPoint = { x: x + width / 2, y: y + height / 2 };

  const degreeX = (event.clientY - centerPoint.y) * 0.01;
  const degreeY = (event.clientX - centerPoint.x) * -0.01;
  element.style.transform = `perspective(1000px) rotateX(${degreeX}deg) rotateY(${degreeY}deg)`;
};
/* END Tickets */

/* Counter of likes */
addText('like-count', 0);

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
  flag ? timeline1.play() : timeline1.progress(0).pause();
  flag = !flag;
});
/* END Counter of likes */
