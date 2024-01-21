<p align=”center”>
    <img src="https://i.ibb.co/T1PRHMw/chess-com-1.png" alt="banner">
    <img src="https://img.shields.io/npm/dt/chess-com?logo=npm" alt="NPM Downloads">
</p>

# About
## Interact with chess.com API
chess-com is a Node.js module written in TypeScript that allows you to interact with chess.com public APIs and retrieve informations such as:

- User's general profile info
- User's name, country, followers count, etc.
- User's rating
- User's best rating match
- User's winrate

</br>

# Installation
### Node.js and npm required!
Run into your projects terminal:
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
import chess from 'chess-com-test';

async function run() {
    const player = await chess.getPlayer('davipccunha');
    if (!player) return;

    console.log(player.profile.joined); //1614884411
    console.log(player.stats.rapid.rating); //1202
}

run();
```

<br>

# Found a problem?
Please let me know of any problems found by filing an issue in [GitHub issue](https://github.com/davipccunha/chess-com/issues). If you have any suggestion or just want to contact me, please send an email to davipccunha@gmail.com

# Known issues
Here is the list of already known problems that I'm working on a fix:

-
