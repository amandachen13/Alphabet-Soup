class Trie {
  constructor() {
    this.root = new TrieNode("");
  }

  insert(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i ++) {
      let char = word[i];
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        let newChild = new TrieNode(char);
        currentNode.addChild(newChild);
        currentNode = newChild;
      }
    }

    currentNode.isValidWord = true;
  }

  isValidWord(word) {
    let currentNode = this.root;

    for (let i = 0; i < word.length; i ++) {
      let char = word[i];
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      } else {
        return false;
      }
    }

    return currentNode.isValidWord;
  }

}

class TrieNode {
  constructor(char) {
    this.char = char;
    this.children = {};
    this.isValidWord = false;
  }

  addChild(node) {
    this.children[node.char] = node;
  }

}

module.exports = Trie;
