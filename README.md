<p align=”center”>
    <img src="https://i.ibb.co/T1PRHMw/chess-com-1.png" alt="banner">
    <img src="https://img.shields.io/npm/dt/chess-com?logo=npm" alt="NPM Downloads">
</p>

# About
## Interact with chess.com API
chess-com is a Node.js module written in TypeScript that allows you to interact with chess.com public APIs and retrieve informations such as:

- User's general profile info
- User's rating
- User's best rating match
- User's winrate
- Daily puzzles

</br>

# Installation
### Node.js and npm required!
Run into your project's terminal:
```
npm install chess-com
```

</br>

# Examples

### Importing the package:
```typescript
import chess from 'chess-com';
```

### Getting a player's information
```typescript
import chess from 'chess-com';

async function run() {
    const player = await chess.getPlayer('davipccunha');
    if (!player) return;

    console.log(player.profile.joined); //1614884411
    console.log(player.stats.getStats('rapid').rating); //1202
}

run();
```

### Getting a random daily puzzle
```typescript
import chess from 'chess-com';

async function run() {
    const puzzle = await chess.getDailyPuzzle(true);
    if (!puzzle) return;

    console.log(puzzle.fen); // 2r5/5Npk/4p2p/8/3P4/3pP2P/5PP1/R5K1 b - - 0 1
    console.log(puzzle.solution); // 1...d2 2.Rd1 Rc1 3.Kf1 Rxd1+ 4.Ke2 Rf1 5.Kxd2 Rxf2+
}

run();
```

<br>

# Found a problem?
Please let me know of any problems found by filing an issue in [GitHub issue](https://github.com/davipccunha/chess-com/issues). If you have any suggestion or just want to contact me, please send an email to davipccunha@gmail.com

# Known issues
Here is the list of already known problems that I'm working on a fix:

-
