# Alphabet Soup

[Play](http://www.amandachen.io/Alphabet-Soup/)

Alphabet Soup is a letter-unscrambling word game, built with JavaScript, jQuery, and HTML5 Canvas.

![game](./assets/images/game.png)

## Gameplay

When a player starts the game, six randomly generated letters will appear in a bowl of alphabet soup and the one minute timer will start to count down. The player will type and enter a word using two to six of these letters. If the word is valid, new letters will replace the ones used. The word will be added to a list of found words and points will be added to the score depending on the length, with bonuses awarded for keeping a streak going. If the word is not valid, the same letters will return to the bowl. The player can choose to press the space bar to generate a new set of letters. When time is up, the player's final score and the top ten high scores will pop up. The player can then submit their name and score or play again.

## Implementation

### Dictionary Lookup

A trie structure was built from a large dictionary text file containing 30,000 words in order to optimize word validation. Each node of the trie represents a letter and tracks any child nodes representing possible subsequent letters. When a word is submitted, the dictionary trie will look at the root node for the first letter. Then, it will look at its children for the next letter, and so on. If the next letter is not found, the word is invalid. Lookup is O(1), where the worst case is for a six-letter word.

```javascript
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
```

### ANOTHER FEATURE

### High Scores

## Future Improvements

### ...
