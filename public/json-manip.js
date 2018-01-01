//  returns JSON
/**
 * - turn transaction type into "+" or "-" (for credit or debit) based on amount
 * - clean amount string
 * - fill in all daily posted balance slots using amount, transaction type, and existing daily bosted balances
 * - add catagory column to every row
 * 
 * not efficient, but easy to follow
 */
const trimJSON = (csv_as_json) => {
    //  removing check number column
    const check_num_id = csv_as_json[0].indexOf('Check Number');
    for (let row_id in csv_as_json){
        csv_as_json[row_id].splice(check_num_id, 1);
    }
    //  updating transaction type
    const tt_id = csv_as_json[0].indexOf('Transaction Type');
    const amount_id = csv_as_json[0].indexOf('Amount');
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][tt_id] = (csv_as_json[row_id][amount_id].includes('(')) ? '-' : '+';
    }
    //  updating amount 
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace('(', '');
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace('$', '');
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace(')', '');
    }
    //  updating daily posted balance
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance');
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][dpb_id] = csv_as_json[row_id][dpb_id].replace('$', '');
    }
    //  filling daily posted balance
    csv_as_json = fillDPB(csv_as_json);

    csv_as_json[0].push('Catagory') //   add Catagory header
    //  add catagory column
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id].push('');
    }


    console.log(csv_as_json);
    return csv_as_json;
}

//  assumes last row in exported csv has daily posted balance (which it should)
const fillDPB = (csv_as_json) => {
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance');
    const tt_id = csv_as_json[0].indexOf('Transaction Type');
    const amount_id = csv_as_json[0].indexOf('Amount');

    let row_id = csv_as_json.length - 1;
    let curr_dbp = csv_as_json[row_id][dpb_id];
    while (row_id > 0){//  excluding header
        csv_as_json[row_id][dpb_id] = curr_dbp;
        const amount = csv_as_json[row_id][amount_id];
        const transaction = csv_as_json[row_id][tt_id];
        const math_exp = curr_dbp + ' - ' + transaction + ' ' + amount;
        curr_dbp = eval(math_exp).toFixed(2);
        row_id--;
    }
    return csv_as_json;
}

// returns json
const updateCatagories = (csv_as_json) => {
    return csv_as_json;
}