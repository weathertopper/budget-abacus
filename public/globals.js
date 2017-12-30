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

let catagories = {}; // used as local copy of `catagory` default. updated by update button in step 2

let transaction_hosts = {}; //  used as local copy of  `transaction_host` default. updated by update button in step three