class Dock {
    constructor(fields) {
        this.playerField = document.querySelector('.sea-battle__player');
        this.fields = fields;
        this.isPlaced = false;
        this.dock = this.createDock();
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
        this.offsetX = event.clientX - this.currentShip.getBoundingClientRect().left; // расстояние по горизонтали, от места клика до края блока, на который мы нажали
        this.offsetY = event.clientY - this.currentShip.getBoundingClientRect().top; // расстояние по вертикали, от места клика до края блока, на который мы нажали
        this.currentShip.classList.add('dragging');

        this.startX = this.currentShip.style.left;
        this.startY = this.currentShip.style.top;
    }

    handleMouseMove(event) {
        if (!this.currentShip) return;

        const dockRect = this.dock.getBoundingClientRect();

        // Обновляем позицию корабля
        const x = event.clientX - dockRect.left - this.offsetX;
        const y = event.clientY - dockRect.top - this.offsetY;

        this.currentShip.style.left = `${x}px`;
        this.currentShip.style.top = `${y}px`;
    }

    handleMouseUp() {
        if (!this.currentShip) return;
        const fieldsRect = this.fields.containers[0].getBoundingClientRect();
        const shipRect = this.currentShip.getBoundingClientRect();
        const isInField = this.fields.isShipInField(shipRect, fieldsRect);

        // Проверяем, находится ли корабль в пределах игрового поля
        if (isInField) {
            // Корабль размещён на поле
            this.isPlaced = true;

            // Запоминаем текущее положение как новые начальные координаты
            this.startX = this.currentShip.style.left;
            this.startY = this.currentShip.style.top;
        } else {
            // Возвращаем корабль на начальные координаты
            // Если корабль был размещён, используем исходное положение в доке
            if (this.isPlaced) {
                const initialPosition = this.currentShip.getAttribute('data-initial-position');
                const [initialX, initialY] = initialPosition.split(',');
                this.currentShip.style.left = `${initialX}px`;
                this.currentShip.style.top = `${initialY}px`;
            } else {
                // Если корабль не был размещён, возвращаем на последнее известное положение на поле
                this.currentShip.style.left = this.startX;
                this.currentShip.style.top = this.startY;
            }
            // Сброс флага размещения, так как корабль не на игровом поле
            this.isPlaced = false;
        }

        this.currentShip.classList.remove('dragging');
        this.currentShip = null;
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
        let yOffset = 10;

        Object.entries(this.shipTypes).forEach(([count, size]) => {

            let xOffset = 10;
            for (let i = 0; i < +count; i++) {
                const ship = this.createShip(size);
                ship.style.left = `${xOffset}px`;
                ship.style.top = `${yOffset}px`;
                ship.setAttribute('data-initial-position', `${xOffset},${yOffset}`);
                this.dock.append(ship);
                xOffset += size * 40 + 10; // Смещение по X + небольшой отступ
            }
            yOffset += 50; // Смещение по Y для следующего яруса кораблей
        });
    }
}

export default Dock;