#Gomoku Tools


This is a library to simplify common operation with gomoku board.

The plan is to make it work for renju and gomoku games, as well as with any other mnk game.
 
This library is currently in a very rough condition and a lot of things will get changed eventually.


## Example: 

This example works with 3x3 version of the game, but  

```javascript
    var tools = require('../gomoku-tools');
    
    
    var game = new tools.TicTacToe();
    console.log(game.ascii());  
    /*
         A  B  C 
     3           
     2           
     1           
    
    */
    game.moveTo('b2');
    console.log(game.ascii()); 
    /*
         A  B  C 
     3           
     2      x    
     1           
    
    */
    game.moveTo('a1', 'c1', 'a3', 'a2');
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o       
     2   x  x    
     1   o     x 
    
    */
    game.transform.clockwise();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o  x  o 
     2      x    
     1   x       
    
    */
    game.transform.counterClockwise();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o       
     2   x  x    
     1   o     x 
    
    */
    game.transform.vertical();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o     x 
     2   x  x    
     1   o       
    
    */
    game.transform.horizontal();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   x     o 
     2      x  x 
     1         o 
    
    */
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o  x  o 
     2      x    
     1         x 
    
    */
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   x     o 
     2      x  x 
     1         o 
    
    */
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o     x 
     2   x  x    
     1   o       
    
    */
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    game.transform.clockwise();
    game.transform.vertical();
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    kcher-mba-osx:test-gomoku-tools kirill.cherkashin$ node test
    var tools = require('../gomoku-tools');
    
    var game = new tools.TicTacToe();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3           
     2           
     1           
    
    */
    
    game.moveTo('b2');
    console.log(game.ascii()); 
    /*
         A  B  C 
     3           
     2      x    
     1           
    
    */
    
    game.moveTo('a1', 'c1', 'a3', 'a2');
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o       
     2   x  x    
     1   o     x 
    
    */
    
    game.transform.clockwise();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o  x  o 
     2      x    
     1   x       
    
    */
    
    game.transform.counterClockwise();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o       
     2   x  x    
     1   o     x 
    
    */
    
    game.transform.vertical();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o     x 
     2   x  x    
     1   o       
    
    */
    
    game.transform.horizontal();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   x     o 
     2      x  x 
     1         o 
    
    */
    
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o  x  o 
     2      x    
     1         x 
    
    */
    
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   x     o 
     2      x  x 
     1         o 
    
    */
    
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    
    game.transform.diagonalFromLeftTopToRightBottom();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3   o     x 
     2   x  x    
     1   o       
    
    */
    
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    
    game.transform.clockwise();
    game.transform.vertical();
    game.transform.normalizeBasic();
    console.log(game.ascii()); 
    /*
         A  B  C 
     3         x 
     2      x    
     1   o  x  o 
    
    */
    

```

All the methods above will work with gomoku version as well: 
 
```javascript
    var tools = require('../gomoku-tools'); 
    var game = new tools.Gomoku();
```    

## Tests
Run tests: `nmp test`
