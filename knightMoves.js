class Square {
  constructor(x, y, parent = null) {
    this.x = x;
    this.y = y;
    this.parent = parent;
  }

  getPosition() {
    return [this.x, this.y];
  }
}

class Offset {
  constructor(dx, dy) {
    this.dx = dx;
    this.dy = dy;
  }
}

const OFFSETS = [
  new Offset(-2, 1),
  new Offset(-2, -1),
  new Offset(-1, 2),
  new Offset(-1, -2),
  new Offset(1, 2),
  new Offset(1, -2),
  new Offset(2, 1),
  new Offset(2, -1),
];

function knightMoves(start, target) {
  const queue = [];
  const visitedSquares = [];

  const startSquare = new Square(start[0], start[1]);
  const targetSquare = new Square(target[0], target[1]);

  queue.push(startSquare);

  while (queue) {
    const currentSquare = queue.shift();
    visitedSquares.push(currentSquare);

    if (
      currentSquare.x === targetSquare.x &&
      currentSquare.y === targetSquare.y
    ) {
      const path = [];
      let pointer = currentSquare;

      while (pointer) {
        path.unshift(pointer);
        pointer = pointer.parent;
      }

      const steps = path.length - 1;

      console.log('♞ Knights Travails ♞\n');
      console.log(
        `>> Start: [${startSquare.getPosition()}], Target: [${targetSquare.getPosition()}] <<\n`
      );

      if (!steps) {
        console.log('You were already at the target square!');
        return;
      }

      console.log(
        `You can travel this path in ${steps} move${steps === 1 ? '' : 's'}:`
      );

      for (let i = 1; i < path.length; i++) {
        const squareA = path[i - 1];
        const squareB = path[i];
        console.log(
          ` ♞ ${i}  [${squareA.getPosition()}] -> [${squareB.getPosition()}]`
        );
      }

      return;
    }

    for (const offset of OFFSETS) {
      const newX = currentSquare.x + offset.dx;
      const newY = currentSquare.y + offset.dy;

      if (newX < 1 || newX > 8 || newY < 1 || newY > 8) continue;

      let wasVisited = false;

      for (const visitedSquare of visitedSquares) {
        if (newX === visitedSquare.x && newY === visitedSquare.y) {
          wasVisited = true;
          break;
        }
      }

      if (wasVisited) continue;

      const newSquare = new Square(newX, newY, currentSquare);
      queue.push(newSquare);
    }
  }
}

knightMoves([1, 1], [8, 8]);
