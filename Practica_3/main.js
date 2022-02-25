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
