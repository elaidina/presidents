const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');

const panovnici = [
  'George Washington',
  'John Adams',
  'Thomas Jefferson',
  'James Madison',
  'James Monroe',
  'John Quincy Adams',
  'Andrew Jackson',
  'Martin Van Buren',
  'William Henry Harrison',
  'John Tyler',
  'James K. Polk',
  'Zachary Taylor',
  'Millard Fillmore',
  'Franklin Pierce',
  'James Buchanan',
  'Abraham Lincoln',
  'Andrew Johnson',
  'Ulysses S. Grant',
  'Rutherford B. Hayes',
  'James A. Garfield',
  'Chester A. Arthur',
  'Grover Cleveland',
  'Benjamin Harrison',
  'Grover Cleveland',
  'William McKinley',
  'Theodore Roosevelt',
  'William Howard Taft',
  'Woodrow Wilson',
  'Warren G. Harding',
  'Calvin Coolidge',
  'Herbert Hoover',
  'Franklin D. Roosevelt',
  'Harry S. Truman',
  'Dwight D. Eisenhower',
  'John F. Kennedy',
  'Lyndon B. Johnson',
  'Richard Nixon',
  '	Gerald Ford',
  'Jimmy Carter',
  'Ronald Reagan',
  'George H. W. Bush',
  'Bill Clinton',
  'George W. Bush',
  'Barack Obama',
  'Donald Trump',
  'Joe Biden',
  'Donald Trump',
  
  
];

// Store listitems
const listItems = [];

let dragStartIndex;

createList();

// Insert list items into DOM
function createList() {
  [...panovnici]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement('li');

      listItem.setAttribute('data-index', index);

      listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
         
        </div>
      `;

      listItems.push(listItem);

      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

function dragStart() {
  // console.log('Event: ', 'dragstart');
  dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
  // console.log('Event: ', 'dragenter');
  this.classList.add('over');
}

function dragLeave() {
  // console.log('Event: ', 'dragleave');
  this.classList.remove('over');
}

function dragOver(e) {
  // console.log('Event: ', 'dragover');
  e.preventDefault();
}

function dragDrop() {
  // console.log('Event: ', 'drop');
  const dragEndIndex = +this.getAttribute('data-index');
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable');
  const itemTwo = listItems[toIndex].querySelector('.draggable');

  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}

// Check the order of list items
function checkOrder() {
  listItems.forEach((listItem, index) => {
    const personName = listItem.querySelector('.draggable').innerText.trim();

    if (personName !== panovnici[index]) {
      listItem.classList.add('wrong');
    } else {
      listItem.classList.remove('wrong');
      listItem.classList.add('right');
    }
  });
}

function addEventListeners() {
  const draggables = document.querySelectorAll('.draggable');
  const dragListItems = document.querySelectorAll('.draggable-list li');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart);
  });

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('dragleave', dragLeave);
  });
  
  draggable_list.addEventListener('mousemove', checkOrder);
}
