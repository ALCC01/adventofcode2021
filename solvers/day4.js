export default (part, input) => {
  let [numbers, ...boards] = input.toString().split('\n\n')
  numbers = numbers.split(',').map(Number)
  boards = boards.map(e => e.split('\n').map(e => e.split(' ').filter(e => !!e).map(Number)))

  for (const n of numbers) {
    for (let i = 0; i < boards.length; i++) {
      const [newBoard, found] = checkBoard(boards[i], n)
      if (found) return sumBoard(newBoard) * n
      boards[i] = newBoard
    }
  }
}

const sumBoard = (board) => board.flat().filter(e => e >= 0).reduce((t, e) => t + e, 0)

const sumRow = (board, i) => board[i].reduce((t, e) => t + e, 0)

const sumColumn = (board, i) => board.reduce((t, r) => t + r[i], 0)

const checkBoard = (board, n) => {
  const returnBoard = board

  for (let y = 0; y < board.length; y++) {
    const x = board[y].indexOf(n)

    if (x > -1) {
      returnBoard[y][x] = -1
      if (sumColumn(returnBoard, x) < 0 || sumRow(returnBoard, y) < 0) return [returnBoard, true]
    }
  }

  return [returnBoard, false]
}
