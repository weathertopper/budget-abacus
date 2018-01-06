//  returns JSON
/**
 * - turn transaction type into "+" or "-" (for credit or debit) based on amount
 * - clean amount string
 * - fill in all daily posted balance slots using amount, transaction type, and existing daily bosted balances
 * - add category column to every row
 * 
 * not efficient, but easy to follow
 */
const trimJSON = (csv_as_json) => {
    //  removing check number column
    const check_num_id = csv_as_json[0].indexOf('Check Number');
    for (let row_id in csv_as_json){
        csv_as_json[row_id].splice(check_num_id, 1);
    }
    //  updating transaction type based on amount
    const tt_id = csv_as_json[0].indexOf('Transaction Type');
    const amount_id = csv_as_json[0].indexOf('Amount');
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][tt_id] = (csv_as_json[row_id][amount_id].includes('(')) ? '-' : '';
    }
    //  rename 'Description' to 'Host'
    const desc_id = csv_as_json[0].indexOf('Description');
    csv_as_json[0][desc_id] = 'Host'
    //  updating amount 
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace('(', '');
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace('$', '');
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][amount_id].replace(')', '');
        csv_as_json[row_id][amount_id] = csv_as_json[row_id][tt_id] + csv_as_json[row_id][amount_id] // adding transaction type to amount
    }
    //  turn transaction type into category
    csv_as_json[0][tt_id] = 'Category'; //header
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][tt_id] = '';
    }
    //  updating daily posted balance
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance');
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][dpb_id] = csv_as_json[row_id][dpb_id].replace('$', '');
    }
    //  filling daily posted balance
    csv_as_json = fillDPB(csv_as_json);

    return csv_as_json;
}

//  assumes last row in exported csv has daily posted balance (which it should)
const fillDPB = (csv_as_json) => {
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance');
    const amount_id = csv_as_json[0].indexOf('Amount');

    let row_id = csv_as_json.length - 1;
    let curr_dbp = csv_as_json[row_id][dpb_id];
    while (row_id > 0){//  excluding header
        csv_as_json[row_id][dpb_id] = curr_dbp;
        const amount = csv_as_json[row_id][amount_id];
        const math_exp = curr_dbp + ' - ' +  amount;
        curr_dbp = eval(math_exp).toFixed(2);
        row_id--;
    }
    return csv_as_json;
}

//  returns nothing, sets global var
//  sets all category values to ''
const wipeHostCategories = () => {
    const cat_id = csv_as_json[0].indexOf('Category');
    for (let row_id in csv_as_json){
        if (row_id == 0){continue;} //  skip header
        csv_as_json[row_id][cat_id] = '';
    }
}

//  returns nothing, sets global var
//  fills in category regardless of what's there now  
const fillHostCategories = (host_cat_obj) => {
    let host_cat_arr = objToArr(host_cat_obj)
    const cat_id = csv_as_json[0].indexOf('Category');
    let these_hosts = Object.keys(host_cat_arr);
    const all_hosts = justHosts();
    for (let arr_id in host_cat_arr){
        const host_to_find = host_cat_arr[arr_id][0];
        const cat = host_cat_arr[arr_id][1];
        const indices = findAllIndices(host_to_find, all_hosts);
        if (indices.length > 0){
            for (index_id in indices){
                const index = indices[index_id];
                csv_as_json[index][cat_id] = cat;
            }
        }
    }
}

const findAllIndices = (host_to_find, all_hosts) => {
    let indices = [];
    let start_at = 0;
    while(true){
        const found_host_id = all_hosts.findIndex(
            (full_host) => {
                return full_host.toUpperCase().includes(host_to_find);
            }
        );
        if (found_host_id >= 0){ //  local index
            const actual_index = start_at + found_host_id; 
            start_at = actual_index + 1;
            indices.push(actual_index);
            all_hosts = all_hosts.slice(found_host_id + 1); //  go one past found;
        }
        else{
            break;
        }
    }
    return indices;
}

//  returns array of string hosts from global var
const justHosts = () => {
    let just_hosts = [];
    const host_id = csv_as_json[0].indexOf('Host');
    for (let row_id in csv_as_json){
        just_hosts.push(csv_as_json[row_id][host_id]);
    }
    return just_hosts;
}

//  assuming object flat
//  to match csv_as_json 
const objToArr = (obj) => {
    let arr = [];
    for (let key in obj){
        arr.push([key, obj[key]]);
    }
    return arr;
}

const nothingEmpty = () => {
    for (row_id in csv_as_json){
        const row = csv_as_json[row_id]
        for (col_id in row){
            const data_val = row[col_id];
            if (data_val == ''){
                return false;
            }
        }
    }
    return true;
}

const getCostsByCategory = () => {
    return new Promise( (resolve) => {
        let costs_by_cat = {};
        readJSON('categories.json').then(
            (categories) => {  
                const cat_arr = Object.keys(categories);
                for (let cat_id in cat_arr){
                    const cat = cat_arr[cat_id]
                    costs_by_cat[cat] = 0;
                }
                const amount_id = csv_as_json[0].indexOf('Amount'); //    header
                const cat_id = csv_as_json[0].indexOf('Category');  //    header
                for (let row_id in csv_as_json){
                    if (row_id == 0){continue;} //  skip header
                    const row = csv_as_json[row_id];
                    const cat = row[cat_id];
                    const cost = row[amount_id];    //  string
                    costs_by_cat[cat] += parseFloat(cost);
                }
                resolve(costs_by_cat);
            }
        )
    })
} 