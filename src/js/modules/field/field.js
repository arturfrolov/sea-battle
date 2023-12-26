class Field {
    constructor(numberLines, numberColumns) {
        this.containers = document.querySelectorAll('.field');
        this.numberLines = numberLines;
        this.numberColumns = numberColumns;
    }

    createCell(content = '', counterLines, counterCells) {
        const cell = document.createElement('td');
        cell.classList.add('field__cell');
        cell.setAttribute('data-x', counterCells + 1);
        cell.setAttribute('data-y', counterLines + 1);

        if (counterCells === 0) {
            console.log(counterLines, counterCells)
            cell.classList.add('label-row');
            cell.style.content = counterLines;

        } else if (counterLines === 0) {

            cell.classList.add('label-column');
            cell.style.content = content;
        }
        return cell;

    }

    createRow(counterLines) {
        const row = document.createElement('tr')
        row.classList.add('field__row');

        // Создаем ячейки
        for (let i = 0; i < this.numberColumns; i++) {
            row.append(this.createCell(String.fromCharCode(65 + i), counterLines, i));
        }
        return row;
    }

    generateTable() {
        this.containers.forEach(container => {
            const table = document.createElement('table');
            table.classList.add('field__tab');

            // Создание строк
            for (let i = 0; i < this.numberLines; i++) {
                table.append(this.createRow(i));
            }
            container.append(table);
        });
    }

    isShipInField(shipRect, fieldRect) {
        return shipRect.left >= fieldRect.left &&
            shipRect.right <= fieldRect.right &&
            shipRect.top >= fieldRect.top &&
            shipRect.bottom <= fieldRect.bottom;
    }
}

export default Field;