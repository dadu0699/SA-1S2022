import '../css/style.css';

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

window.addEventListener('load', () => {
  document.getElementsByClassName('left-column')[0].style.display = '';
  document.getElementsByClassName('right-column')[0].style.display = '';
});
