import '../css/ticket.css';

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
