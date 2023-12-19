class Dock {
    constructor() {
        this.playerField = document.querySelector('.sea-battle__player');
        this.dock = this.createDock();
    }

    createDock() {
        const dock = document.createElement('div');
        dock.classList.add('dock');
        this.playerField.append(dock);

        this.createShips(dock, 1, 4); // 1 четырехпалубный
        this.createShips(dock, 2, 3); // 2 трехпалубных
        this.createShips(dock, 3, 2); // 3 двухпалубных
        this.createShips(dock, 4, 1); // 4 однопалубных

        return dock;
    }

    createShips(dock, count, size) {
        for (let i = 0; i < count; i++) {
            const ship = document.createElement('div');
            ship.classList.add('dock__ship', `ship-row-${size}`);
            dock.append(ship);
        }
    }
}

export default Dock;