class Dock {
    constructor() {
        this.playerField = document.querySelector('.sea-battle__player');
        this.dock = this.createDock();
        // this.shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
        this.shipTypes = {
            1: 4, // 1 четырехпалубный
            2: 3, // 2 трехпалубных
            3: 2, // 3 двухпалубных
            4: 1  // 4 однопалубных
        };
        this.placeShips();
        this.initDragAndDrop();
    }

    initDragAndDrop() {
        const ships = document.querySelectorAll('.dock__ship');

        ships.forEach(ship => {
            ship.addEventListener('mousedown', this.handleMouseDown.bind(this));
        })

        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        document.addEventListener('mouseup', this.handleMouseUp.bind(this))
    }

    handleMouseDown(event) {
        // Сохраняем ссылку на перетаскиваемый корабль и начальные координаты
        this.currentShip = event.target;
        this.offsetX = event.clientX - this.currentShip.getBoundingClientRect().left; // X координата курсора относительно блока, на который мы нажали
        this.offsetY = event.clientY - this.currentShip.getBoundingClientRect().top; // Y координата курсора относительно блока, на который мы нажали
        this.currentShip.classList.add('dragging');
    }

    handleMouseMove(event) {
        if (!this.currentShip) return;

        const dockRect = this.dock.getBoundingClientRect();

        // Обновляем позицию корабля
        const x = event.clientX - dockRect.left - this.offsetX;
        const y = event.clientY - dockRect.top - this.offsetY;
        console.log(x, y)

        this.currentShip.style.left = `${x}px`;
        this.currentShip.style.top = `${y}px`;
    }

    handleMouseUp() {
        if (this.currentShip) {
            this.currentShip.classList.remove('dragging');
            this.currentShip = null;
        }
    }

    createDock() {
        const dock = document.createElement('div');
        dock.classList.add('dock');
        this.playerField.append(dock);
        return dock;
    }

    createShip(size, direction) {
        const ship = document.createElement('div');
        ship.classList.add('dock__ship', `ship-row-${size}`);
        return ship;
    }

    placeShips() {
        let yOffset = 0;

        Object.entries(this.shipTypes).forEach(([count, size]) => {
            let xOffset = 50;
            for (let i = 0; i < count; i++) {
                const ship = this.createShip(size);
                ship.style.left = `${xOffset}px`;
                ship.style.top = `${yOffset}px`;
                this.dock.append(ship);
                xOffset += parseInt(size) * 40 + 10; // Смещение по X + небольшой отступ
            }
            yOffset += 50; // Смещение по Y для следующего яруса кораблей
        });
    }
}

export default Dock;