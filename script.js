class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newNode;
  }

  insertAtPosition(data, position) {
  const newNode = new Node(data);

  // Insert at the beginning if position <= 0 or list is empty
  if (position <= 0 || !this.head) {
    newNode.next = this.head;
    this.head = newNode;
    return;
  }

  let current = this.head;
  let index = 0;

  // Traverse to node before the insertion point
  while (current !== null && index < position - 1) {
    current = current.next;
    index++;
  }

  // If current is null, the position is out of bounds — do nothing or append at end
  if (current === null) {
    console.log("Position out of bounds. Appending at end.");
    this.append(data);
    return;
  }

  // Insert new node after current
  newNode.next = current.next;
  current.next = newNode;
}


  deleteAtPosition(position) {
    if (!this.head) return false;

    if (position === 0) {
      this.head = this.head.next;
      return true;
    }

    let current = this.head;
    let prev = null;
    let index = 0;

    while (current && index < position) {
      prev = current;
      current = current.next;
      index++;
    }

    if (current) {
      prev.next = current.next;
      return true;
    }
    return false;
  }

  search(key) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.data === key) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  toArray() {
    const nodes = [];
    let current = this.head;
    while (current) {
      nodes.push(current.data);
      current = current.next;
    }
    return nodes;
  }
}

const linkedList = new LinkedList();

const dataInput = document.getElementById('dataInput');
const positionInput = document.getElementById('positionInput');
const listOutput = document.getElementById('listOutput');
const statusDiv = document.getElementById('status');

function renderList(highlightIndex = -1) {
  listOutput.innerHTML = '';
  const nodes = linkedList.toArray();

  nodes.forEach((data, index) => {
    const nodeDiv = document.createElement('div');
    nodeDiv.className = 'node';
    nodeDiv.textContent = data;
    if (index === highlightIndex) {
      nodeDiv.classList.add('highlight');
    }
    listOutput.appendChild(nodeDiv);
  });

  if (nodes.length === 0) {
    listOutput.innerHTML = '<p style="color:#888">Empty list</p>';
  }
}

function updateStatus(message) {
  statusDiv.textContent = message;
}

function appendData() {
  const data = parseInt(dataInput.value);
  if (isNaN(data)) return updateStatus('Enter valid data.');
  linkedList.append(data);
  renderList();
  updateStatus(`Appended ${data} to the list.`);
  dataInput.value = '';
}

function insertData() {
  const data = parseInt(dataInput.value);
  const position = parseInt(positionInput.value);

  if (isNaN(data)) return updateStatus('Enter valid data.');
  if (isNaN(position) || position < 0) return updateStatus('Enter a valid position.');

  linkedList.insertAtPosition(data, position);
  renderList();
  updateStatus(`Inserted ${data} at position ${position}.`);

  dataInput.value = '';
  positionInput.value = '';
}


function deleteData() {
  const position = parseInt(positionInput.value);
  if (isNaN(position)) return updateStatus('Enter a valid position.');
  const success = linkedList.deleteAtPosition(position);
  renderList();
  updateStatus(success ? `Deleted node at position ${position}.` : `Invalid position.`);
  positionInput.value = '';
}

function searchData() {
  const key = parseInt(dataInput.value);
  if (isNaN(key)) return updateStatus('Enter value to search.');
  const index = linkedList.search(key);
  renderList(index);
  updateStatus(index !== -1 ? `Found ${key} at position ${index}.` : `${key} not found in the list.`);
  dataInput.value = '';
}

function displayList() {
  renderList();
  updateStatus('Current list displayed.');
}
