#Gomoku Tools


This is a library to simplify common operation with gomoku board.

The plan is to make it work for renju and gomoku games, as well as with any other mnk game.
 
## Example: 
 
```javascript
    var game = new Game();
    game.moveTo('H8');
    game.moveTo('H9');
    game.moveTo('I8');
    
    console.log(game.ascii());
   /**
        A  B  C  D  E  F  G  H  I  J  K  L  M  N  O 
    15                                              
    14                                              
    13                                              
    12                                              
    11                                              
    10                                              
    9                        o                      
    8                        x  x                   
    7                                               
    6                                               
    5                                               
    4                                               
    3                                               
    2                                               
    1      
    */

    

'''

## Tests
Run tests: `nmp test`
