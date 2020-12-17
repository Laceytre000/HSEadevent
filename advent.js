console.log('Winter Break is almost here!!!');
let daysOpened = JSON.parse(localStorage.getItem('clickedDays'));
let icons = [
    '&#x1F6F7;',
    '&#x1F328;',
    '&#x1F43B;',
    '&#x1F332;',
    '&#x1F381;',
    '&#x1F936;',
    '&#x1F9E4;',
    '&#x1F9E3;',
    '&#x1F976;',
    '&#x1F31F;',
    '&#x26F8;',
    '&#x1F36A;',
    '&#x1F98C;',
    '&#x1F3C2;',
    '&#x26F7;',
    '&#x1F3BF;',
    '&#x1F3D2;',
    '&#x1F514;',
    '&#x1F6CF;',
    '&#x1F385;',
    '&#x1F3BF;',
    '&#x1F56F;',
    '&#x26c4;'
  ];
  icons = randomizeIcons(icons);
const boxes = document.querySelectorAll('.num');
function handleBoxClick(event){
  const clickedBox =event.currentTarget.dataset.day;
  const today = new Date();
  if (today.getDate() >= Number(clickedBox)) {
    console.log(icons[Number(clickedBox)]);
    const day = event.currentTarget;
    day.innerHTML = icons[Number(clickedBox)];
    storedaysclicked(Number(clickedBox));
  } else {
    console.log('No peaking you cannot open this yet.');
  }
  console.log(clickedBox);
}
boxes.forEach(function(box){
  box.addEventListener('click', handleBoxClick);
});
function storedaysclicked (day){
  if (!localStorage.getItem('clickedDays')) {
    daysOpened = [];
  } else {
    daysOpened = JSON.parse(localStorage.getItem('clickedDays'));
  }
  if (daysOpened.includes(day)) {
    daysOpened.push(day);
  }

  localStorage.getItem('clickedDays', JSON.stringify(daysOpened));
}
function randomizeIcons(oldList){
  let randomList = [];
  if (!localStorage.getItem('icons')) {
    while (oldList.length > 0) {
      const index = Math.floor(Math.random()* oldList.length);
      randomList.push(oldList[index]);
      oldList.splice(index, 1);
    }
    localStorage.setItem('icons', JSON.stringify(randomList));
  } else {
    randomList = JSON.parse(localStorage.getItem('icons'));
  }
  return randomList;

}
function showClickedBoxes(){
  boxes.forEach(function (box){
    const day = Number(box.dataset.day);
    if (daysOpened.includes(day)) {
      box.innerHTML = icons[day];
    }
  });
}
if (daysOpened !== null) {
  showClickedBoxes();
}
function resetCalendar(){
  const answer = confirm('Are you sure you want to reset the calendar? This action cannot be undone.');
  if (answer) {
    localStorage.clear();
    document.location.reload();
  }

}
const resetButton = document.createElement('button');
resetButton.innerHTML = 'Reset Calendar';
resetButton.addEventListener('click', resetCalendar);
const footer = document.querySelector('footer');
footer.insertAdjacentElement('afterbegin', resetButton);
footer.style.textAlign = 'center';
footer.style.paddingTop = '20px';
