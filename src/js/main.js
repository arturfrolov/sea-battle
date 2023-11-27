import 'bootstrap';
import '../sass/style.scss';
// import '../icons/sprite.svg';
// eslint-disable-next-line import/no-unresolved
import 'virtual:svg-icons-register';

class TicTacToe {
    constructor() {
        this.container = document.querySelector('.tic-tac-toe-container');
        this.render();
        this.counter = 0;
        this.numberVictoriesX = 0;
        this.numberVictories0 = 0;
        this.winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
            [0, 4, 8], [2, 4, 6] // диагонали
        ];
    }

    render()
    {
        const htmlContent = `
            <div class='tictactoe'>
                <div class='tictactoe__status'>
                    <p class='tictactoe__current'>Ходит: <span id='currentPlayer'>X</span></p>
                    <p class='tictactoe__score'>Счет: <span class='tictactoe__x active'>X - 0</span> | <span class='tictactoe__0'>O - 0</span></p>
                </div>
                <div class='tictactoe__grid'>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                    <div></div><div></div><div></div>
                </div>
                
                    <!-- Modal -->
                <div class='modal fade' id='chooseModal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h1 class='modal-title' id='staticBackdropLabel'>Pick your opponent</h1>
                            </div>
                            <div class='modal-body'>
                                <button type='button' class='btn btn-light js--player' data-bs-dismiss='modal'>Another player</button>
                                <button type='button' class='btn btn-light js--computer' data-bs-dismiss='modal'>Сomputer</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class='modal fade' id='winModal' data-bs-backdrop='static' data-bs-keyboard='false' tabindex='-1' aria-labelledby='staticBackdropLabel' aria-hidden='true'>
                    <div class='modal-dialog modal-dialog-centered'>
                        <div class='modal-content'>
                            <div class='modal-header'>
                                <h1 class='modal-title' id='winnerLabel'>WIN</h1>
                            </div>
                            <div class='modal-body'>
                                <button type='button' class='btn btn-light js--play-again' data-bs-dismiss='modal'>Play Again</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Button trigger modal -->
                <button type='button' class='btn btn-primary hide js--win_btn' data-bs-toggle='modal' data-bs-target='#winModal'>
                    win modal
                </button>
            
                <button type='button' class='btn btn-primary hide js--choose_btn' data-bs-toggle='modal' data-bs-target='#chooseModal'>
                    choose modal
                </button>
            </div>
        `;

        this.container.innerHTML = htmlContent;

        this.chooseBtn = document.querySelector('.js--choose_btn');
        this.playerBtn = document.querySelector('.js--player');
        this.computerBtn = document.querySelector('.js--computer');
        this.playAgain = document.querySelector('.js--play-again');
        this.gameField = document.querySelector('.tictactoe__grid');
        this.currentPlayer = document.querySelector('#currentPlayer');
        this.statusPlayerX = document.querySelector('.tictactoe__x');
        this.statusPlayer0 = document.querySelector('.tictactoe__0');
        this.winBtn = document.querySelector('.js--win_btn');
        this.winnerLabel = document.querySelector('#winnerLabel');
        this.score = document.querySelector('.tictactoe__score ')

        // this.bindEvents();
    }

    bindEvents() {
        if (this.chooseBtn) {
            this.chooseBtn.click();
        }
        this.playerBtn.addEventListener('click', () => this.initTic());
        this.computerBtn.addEventListener('click', () => this.initTic(true));
        this.gameField.addEventListener('click', (event) => this.handleCellClick(event));
        this.playAgain.addEventListener('click', () => this.resetGame());
    }

    comPlay() {
        const noClickedCell = Array.from(this.gameField.getElementsByTagName('div'))
            .filter(item => !item.classList.contains('clicked_once'));
        const randomElement = noClickedCell[Math.floor(Math.random() * noClickedCell.length)];
        if (randomElement && this.counter !== 0) {
            randomElement.click();
        }
    }

    winnerDisplay(winner) {
        this.winnerLabel.textContent = winner;
        this.counter = 0;
        if (winner === 'X') {
            this.numberVictoriesX++;
            this.statusPlayerX.textContent = `X - ${this.numberVictoriesX}`;
        } else if (winner === '0') {
            this.numberVictories0++;
            this.statusPlayer0.textContent = `X - ${this.numberVictories0}`;
        }
        this.winBtn.click();
    }

    checkWinCombinations(currentPlayerValue) {
        this.winCombinations.forEach((combination, index) => {
            const winPlayer = combination.every(item => this.gameField.getElementsByTagName('div')[item].classList.contains(currentPlayerValue));
            if (winPlayer) {
                this.winnerDisplay(currentPlayerValue);
            } else if (!winPlayer && index >= 7 && this.counter >= 9) {
                this.winnerDisplay('score tie');
            }
        });
    }

    status(player) {
        if (player === 'X') {
            this.currentPlayer.textContent = '0';
            this.statusPlayerX.classList.remove('active');
            this.statusPlayer0.classList.add('active');
        } else {
            this.currentPlayer.textContent = 'X';
            this.statusPlayer0.classList.remove('active');
            this.statusPlayerX.classList.add('active');
        }
    }

    addClickCell({ event, iconId, clicked, statusValue }) {
        const currentCell = event.target;
        if (!currentCell.classList.contains(clicked) && currentCell.tagName === 'DIV' && !currentCell.classList.contains('tictactoe__grid')) {
            currentCell.classList.add(clicked, statusValue);
            currentCell.innerHTML = `
              <svg class="${iconId}">
                <use xlink:href="#${iconId}"></use>
              </svg>
            `;
            this.status(statusValue);
            this.counter++;
            this.checkWinCombinations(statusValue);
            if (this.computer && this.counter < 9 && statusValue === 'X') {
                this.comPlay();
            }
        }
    }

    handleCellClick(event) {
        if (this.counter % 2 === 0) {
            this.addClickCell({
                event,
                iconId: 'icon-cross_1',
                clicked: 'clicked_once',
                statusValue: 'X',
            });
        } else {
            this.addClickCell({
                event,
                iconId: 'icon-zero',
                clicked: 'clicked_once',
                statusValue: '0',
            });
        }
    }

    resetGame() {
        this.gameField.innerHTML = `
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
            <div></div><div></div><div></div>
        `;
    }

    initTic(computer = false) {
        this.computer = computer;
        this.counter = 0;
        this.resetGame();
    }
}

const ticTacToe = new TicTacToe();
ticTacToe.bindEvents();
