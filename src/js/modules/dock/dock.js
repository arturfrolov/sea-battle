class Dock {
    constructor() {
        this.playerField = document.querySelector('.sea-battle__player');
        this.dock = this.createDock();
        this.shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1]; // Массив размеров кораблей
        this.createDock();
        this.placeShips();
    }

    createDock() {
        const dock = document.createElement('div');
        dock.classList.add('dock');
        this.playerField.append(dock);
        return dock;
    }

    createShip(size) {
        const ship = document.createElement('div');
        ship.classList.add('dock__ship', `ship-row-${size}`);
        return ship;
    }

    placeShips() {
        // Расстояние между кораблями
        let xOffset = 50;
        let yOffset = 10;

        // Создаем и размещаем корабли в доке
        this.shipSizes.forEach((size, index) => {
            const ship = this.createShip(size);
            ship.style.left = `${xOffset}px`;
            ship.style.top = `${yOffset}px`;
            this.dock.appendChild(ship);

            // Обновляем смещение для следующего корабля
            yOffset += (index % 2 === 0) ? 50 : 0; // Регулируемое смещение по Y
            xOffset = (index % 2 === 0) ? xOffset : xOffset + 50; // Смещаем по X после каждого второго корабля
        });
    }
}

export default Dock;