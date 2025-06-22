export default class Minesweeper {
    nbBombByDifficulty = {
        1: 10,
        2: 30,
        3: 75,
    }

    dimensionByDifficulty = {
        1: 10,
        2: 15,
        3: 20,
    }

    constructor(level) {
        this.level = level;
        this.dimension = this.dimensionByDifficulty[level];
        this.score = 0;
        this.end = false;
        this.success = this.dimension * this.dimension - this.nbBombByDifficulty[level];
        this.flagMode = false;
        this.grid = [];
        this.init();
    }

    #placeBombs() {
        let bombs = this.nbBombByDifficulty[this.level];

        while (bombs > 0) {
            const x = Math.floor(Math.random() * this.dimension);
            const y = Math.floor(Math.random() * this.dimension);

            if (!this.#isBomb({ x, y })) {
                this.grid[y][x] = 'B';
                bombs--;
            }
        }
    }

    #countBomb(coords) {
        let count = 0
        this.#explore(coords, (currentCoords) => this.#isBomb(currentCoords) ? count++ : count)

        return count.toString()
    }

    #placeNumbers() {
        this.grid = this.grid.map((row, y) => row.map((el, x) => this.#isBomb({ x, y }) ? el : this.#countBomb({ x, y })))
    }

    #explore({ x, y }, callback, strict = false) {
        callback({ x: x - 1, y })
        callback({ x: x + 1, y })

        if (this.grid[y + 1]) {
            callback({ x, y: y + 1 })
            if (!strict) {
                callback({ x: x - 1, y: y + 1 })
                callback({ x: x + 1, y: y + 1 })
            }
        }

        if (this.grid[y - 1]) {
            callback({ x, y: y - 1 })
            if (!strict) {
                callback({ x: x + 1, y: y - 1 })
                callback({ x: x - 1, y: y - 1 })
            }
        }
    }

    #isBomb({ x, y }) {
        return this.#exist({ x, y }) && this.grid[y][x] === 'B';
    }

    #exist({ x, y }) {
        return this.grid[y][x];
    }

    init() {
        for (let row = 0; row < this.dimension; row++) {
            this.grid.push([]);
            for (let column = 0; column < this.dimension; column++) {
                this.grid[row].push(0);
            }
        }
        this.#placeBombs();
        this.#placeNumbers();
    }

    try(coords) {
        if (!this.#exist(coords)) {
            return null;
        }

        if (this.#isBomb(coords)) {
            this.end = true;

            return null;
        }

        return this.grid[coords.y][coords.x]
    }

    getValue({ x, y }) {
        if (!this.end) {
            throw new Error("Game is not finished yet.");
        }

        return this.#exist({ x, y }) ? this.grid[y][x] : null;
    }

    getNeighbors(coords, strict = false) {
        let neighbors = []
        this.#explore(coords, (neighborsCoords) => this.#exist(neighborsCoords) ? neighbors.push(neighborsCoords) : neighbors, strict);

        return neighbors
    }

    incrementScore(point) {
        this.score += point

        if (this.isWon()) {
            this.end = true
        }
    }

    handleFlagMode() {
        this.flagMode = !this.flagMode
    }

    isFlagMode() {
        return this.flagMode
    }

    isFinished() {
        return this.end
    }

    isWon() {
        return this.score === this.success;
    }
}
