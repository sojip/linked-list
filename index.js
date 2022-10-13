class LinkedList {
  constructor(head = null) {
    this.head = head;
  }

  append(value) {
    let node = new Node(value);
    let lastNode = this.tail;
    if (lastNode === null) {
      this.head = node;
      return;
    }
    lastNode.next = node;
    return;
  }

  prepend(value) {
    let node = new Node(value);
    let firstNode = this.head;
    if (firstNode !== null) {
      node.next = firstNode;
    }
    this.head = node;
  }

  get size() {
    function findSize(node) {
      if (node.next === null) {
        counter++;
        return counter;
      } else {
        counter++;
        return findSize(node.next);
      }
    }

    let counter = 0;
    let head = this.head;
    if (head === null) return counter;
    counter++;
    if (head.next === null) return counter;
    return findSize(head.next);
  }

  get head() {
    return this._head;
  }

  set head(node) {
    this._head = node;
  }

  get tail() {
    function findlastNodeRec(node) {
      if (node.next === null) return node;
      return findlastNodeRec(node.next);
    }
    let head = this.head;
    if (head === null) {
      return null;
    } else {
      return findlastNodeRec(head);
    }
  }

  at(index, options = {}) {
    function findNode(node) {
      if (current === index) return options.node ? node : node.value;
      current++;
      return findNode(node.next);
    }
    if (index >= this.size) throw new Error("index does not exist");
    let head = this.head;
    let current = 0;
    return findNode(head);
  }

  pop() {
    let secondlastnodeindex = this.size - 2;
    if (secondlastnodeindex < 0) return this.head(null);
    let secondlastnode = this.at(secondlastnodeindex, { node: true });
    return (secondlastnode.next = null);
  }

  contains(value) {
    for (let i = 0; i < this.size; i++) {
      if (this.at(i) === value) return true;
    }
    return false;
  }

  find(value) {
    function findIndex(node) {
      if (node.value === value) return index;
      index++;
      return findIndex(node.next);
    }
    if (!this.contains(value)) return null;
    let head = this.head;
    let index = 0;
    return findIndex(head);
  }

  toString() {
    function addNodeValues(node) {
      if (node.next === null) {
        str += `(${node.value}) -> null`;
        return;
      }
      str += `(${node.value}) -> `;
      return addNodeValues(node.next);
    }
    let str = "";
    let head = this.head;
    if (head === null) return str;
    addNodeValues(head);
    return str;
  }

  insertAt(value, index) {
    if (index === 0) return this.prepend(value);
    let node = new Node(value);
    let previousNode = this.at(index - 1, { node: true });
    let nextNode = this.at(index, { node: true });
    previousNode.next = node;
    node.next = nextNode;
  }

  removeAt(index) {
    if (index >= this.size) throw new Error("node does not exist");
    if (index === 0) return (this.head = this.head.next);
    if (index === this.size - 1) return this.pop();
    let node = this.at(index, { node: true });
    let previousNode = this.at(index - 1, { node: true });
    previousNode.next = node.next;
  }
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }
}

let list = new LinkedList();
list.append(15);
list.append(16);
list.append(17);
list.append(18);
list.prepend(10);

console.dir(list, { depth: null });
console.dir(list.size);
