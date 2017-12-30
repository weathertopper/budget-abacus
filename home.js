
//  organized by step
const add_row_strings = {
    'two' : `<tr class='table-data-row' id='%id%'>
                <td>
                    <input type='text' class='catagory' value=''>
                </td>
                <td>
                    <span class = 'dollar-sign'>$</span>
                    <input type='text' class='expected-cost' value=''>
                    <span class = 'cents'>
                        <sup>.00</sup>
                    </span> 
                </td>
                <td>
                    <button type='button' class='close' onclick='removeRow("%id%")'>
                        <span class='glyphicon glyphicon-remove-sign'>
                    </button>
                </td>
            </tr>`,
    'three': `<tr class='table-data-row' id='%id%'>
                <td>
                    <input type='text' class='transaction-host' value=''>
                </td>
                <td>
                    <select class='catagory-dropdown' >
                        <!-- populate this dropdown with values from step 2 -->
                        <option>Select a Catagory</option>
                    </select>
                </td>
                <td>
                    <button type="button" class="close" onclick='removeRow("%id%")'>
                        <span class='glyphicon glyphicon-remove-sign'>
                    </button>
                </td>
            </tr>`,
    'four': `<tr class='table-data-row'>
                <td>
                    transaction-host-here
                </td>
                <td>
                    <select class='catalog-dropdown'>
                        <!-- populate this dropdown with values from step 3 -->
                        <option>Select a Catagory</option>
                    </select>
                </td>
            </tr>`
}

const addRow = (step_num) => {
    let id = Date.now();
    let new_row = add_row_strings[step_num].replace(/%id%/g, id);
    $(`#step-${step_num} .table-div table .table-add-row`).before(new_row);
}

const removeRow = (row_id) => {
    $(`#${row_id}`).remove();
}