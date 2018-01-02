const server_addr = "http://localhost:3000/";

let csv_as_json;    //  fill in w/ step one

let temp_hosts;     //  fill in w/ step four

//  const to guarantee I make a copy
const catagory_option_string = `<option value="%val_id%" %selected%>%opt_text%</option>`;

//  organized by step
const add_row_strings = {
    "two" : `<tr class="table-data-row" id="%id%">
                <td>
                    <input type="text" class="catagory" value="%cat_val%">
                </td>
                <td>
                    <span class = "dollar-sign">$</span>
                    <input type="text" class="expected-cost" value="%cost_val%">
                    <span class = "cents">
                        <sup>.00</sup>
                    </span> 
                </td>
                <td>
                    <button type="button" class="close" onclick='removeRow("%id%")'>
                        <span class="glyphicon glyphicon-remove-sign">
                    </button>
                </td>
            </tr>`,
    "three": `<tr class="table-data-row" id="%id%">
                <td>
                    <input type="text" class="transaction-host" value="%host_val%">
                </td>
                <td>
                    <select class="catagory-dropdown" >
                        <!-- populate this dropdown with values from step 2 -->
                        <option value="default">Select a Catagory</option>
                        %options%
                    </select>
                </td>
                <td>
                    <button type="button" class="close" onclick='removeRow("%id%")'>
                        <span class="glyphicon glyphicon-remove-sign">
                    </button>
                </td>
            </tr>`,
    "four": `<tr class="table-data-row" id="%id%">
                <td class="host-val">
                    %host_val%
                </td>
                <td class="step-four-catagory">
                    <select class="catagory-dropdown">
                        <!-- populate this dropdown with values from step 3 -->
                        <option value="default">Select a Catagory</option>
                        %options%
                    </select>
                </td>
            </tr>`
}