
const step5Populate = (step_four_input) => {
    fillHostCatagories(step_four_input);
    step5ClearReview();
    step5FillDates();
    step5FillReview();
}

const step5FillDates = () => {
    const date_id = csv_as_json[0].indexOf('Date'); //    header
    const start_date_row = csv_as_json[1]; //    first row past header
    const start_date = start_date_row[date_id];
    const end_date_row = csv_as_json[csv_as_json.length - 1]; //    last row
    const end_date = end_date_row[date_id];
    fillTextById('start-date', start_date);
    fillTextById('end-date', end_date);
}

const step5FillReview = () => {
    //  four   rows to fill
    //  #start-balance-td
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance'); //    header
    const start_balance_row = csv_as_json[1]; //    first row past header
    const start_balance = start_balance_row[dpb_id];
    fillTextById('start-balance-td', start_balance);
    //  #end-balance-td
    const end_balance_row = csv_as_json[csv_as_json.length - 1]; //    last row
    const end_balance = end_balance_row[dpb_id];
    fillTextById('end-balance-td', end_balance);
    //  #actual-cost-td
    const actual_cost = calcActualCost();
    fillTextById('actual-cost-td', actual_cost);
    //  #expected-cost-td
    calcExpectedCost().then( (expected_cost) => {
        fillTextById('expected-cost-td', expected_cost);
        
        actual_color = (eval(actual_cost +' >= '+ expected_cost)) ? 'green' : 'red';
        colorActual(actual_color);
    });
}

const calcExpectedCost = () => {
    return new Promise ( (resolve, reject) => {
        let cost_total = '0';    //  string
        readJSON('catagories.json').then(
            (catagories) => {
                const costs = Object.values(catagories);
                for (let cost_id in costs){
                    const cost = costs[cost_id];
                    cost_total += (' + ' + cost);
                }
                cost_total = eval(cost_total).toFixed(2);
                resolve(cost_total);
            }
        )
    })
}

const calcActualCost = () => {
    const amount_id = csv_as_json[0].indexOf('Amount'); //    header
    let cost_total = '0';
    console.log(JSON.stringify(csv_as_json));
    for (let row_id in csv_as_json){
        if (row_id == 0){ continue; }   //  skip header
        const row = csv_as_json[row_id];
        const cost = row[amount_id];
        cost_total += (' + ' + cost);
    }
    cost_total = eval(cost_total).toFixed(2);
    return cost_total;
}

const step5Download = () => {
    if (nothingEmpty()){
        const data_as_str = JSONtoCSV()
        console.log(data_as_str);
        writeCSV('budget_download', data_as_str);
    }
    else{
        showError('five', 'Oh no! Something is missing. Make sure to update/run each step.');
    }
}
