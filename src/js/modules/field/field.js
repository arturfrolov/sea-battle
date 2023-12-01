class Field {
    constructor() {
        this.containers = document.querySelectorAll('.field');

    }

    createLabelCell(content = '') {
        const labelCell = document.createElement('th');
        labelCell.classList.add('field__label');
        labelCell.textContent = content;
        return labelCell;
    }

    generateTable() {
        const table = document.createElement('table');
        table.classList.add('field__tab');

        // Создаем строку с буквами
        const headerRow = document.createElement('tr')
        headerRow.classList.add('field__row');
        headerRow.append(this.createLabelCell()); // Создаем первую пустую ячейку

        for (let i = 0; i < 10; i++) {
            headerRow.append(this.createLabelCell(String.fromCharCode(65 + i)));
        }
        table.append(headerRow);
        // console.log(headerRow);

        // Создание остальных строк
        for (let i = 0; i < 10; i++) {
            const row = document.createElement('tr');
            row.classList.add('field__row');
            row.append(this.createLabelCell(i + 1));

            for (let j = 0; j < 10; j++) {
                const cell = document.createElement('td');
                cell.classList.add('field__cell');
                cell.setAttribute('data-x', j + 1);
                cell.setAttribute('data-y', i + 1);
                row.append(cell);
            }
            table.append(row);
        }
        this.containers.forEach(container => container.append(table));
    }

}

export default Field;