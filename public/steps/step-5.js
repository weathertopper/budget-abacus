
const step5Populate = (step_four_input) => {
    fillHostCategories(step_four_input);
    step5ClearReview();
    step5FillDates();
    step5FillReview();
}

const step5FillDates = () => {
    const dates = getStartEndDates();
    fillTextById('start-date', dates[0]);
    fillTextById('end-date', dates[1]);
}

//  returns [start_date, end_date];
const getStartEndDates = () => {
    const date_id = csv_as_json[0].indexOf('Date'); //    header
    const start_date_row = csv_as_json[1]; //    first row past header
    const start_date = start_date_row[date_id];
    const end_date_row = csv_as_json[csv_as_json.length - 1]; //    last row
    const end_date = end_date_row[date_id];
    return [start_date, end_date];
}

const step5FillReview = () => {
    //  four   rows to fill
    //  #start-balance-td
    const start_balance = getStartBalance();
    fillTextById('start-balance-td', start_balance);
    //  #end-balance-td
    const end_balance = getEndBalance();
    fillTextById('end-balance-td', end_balance);
    //  #actual-cost-td
    const actual_cost = calcActualCost();
    fillTextById('actual-cost-td', getCostPrefix(actual_cost) + actual_cost);
    //  #expected-cost-td
    calcExpectedCost().then( (expected_cost) => {
        fillTextById('expected-cost-td', getCostPrefix(expected_cost) + expected_cost);
        actual_color = (eval(actual_cost +' >= '+ expected_cost)) ? 'green' : 'red';
        colorActual(actual_color);
    });
}

const getStartBalance = () => {
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance'); //    header
    const start_balance_row = csv_as_json[1]; //    first row past header
    const start_balance = start_balance_row[dpb_id];
    return start_balance;
}

const getEndBalance = () => {
    const dpb_id = csv_as_json[0].indexOf('Daily Posted Balance'); //    header
    const end_balance_row = csv_as_json[csv_as_json.length - 1]; //    last row
    const end_balance = end_balance_row[dpb_id];
    return end_balance;
}

const calcExpectedCost = () => {
    return new Promise ( (resolve, reject) => {
        let cost_total = '0';    //  string
        readJSON('categories.json').then(
            (categories) => {  
                const costs = Object.values(categories);
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

const getCostPrefix = (amount) => {
    amount = parseFloat(amount);
    return (amount >= 0) ? 'GAIN ' : 'COST ';
}

const step5Download = () => {
    if (nothingEmpty()){
        getCostsByCategory().then( (cat_totals) => {
            const dates = getStartEndDates();
            const start_balance = getStartBalance();
            const end_balance = getEndBalance();
            const actual_cost = calcActualCost();
            calcExpectedCost().then( (expected_cost) => {
                const start_balance_row = ["START BALANCE", start_balance];
                const end_balance_row = ["END BALANCE", end_balance];
                const expected_cost_row = ["EXPECTED COST", getCostPrefix(expected_cost) + expected_cost];
                const actual_cost_row = ["ACTUAL COST", getCostPrefix(actual_cost) +actual_cost];
                const cat_totals_header = ["CATEGORY", "TOTAL"];
                const break_row = [" "];

                const pre_lim = [ dates,
                                    start_balance_row,
                                    end_balance_row,
                                    expected_cost_row,
                                    actual_cost_row,
                                    break_row, 
                                    cat_totals_header];

                const full_report = pre_lim.concat(objToArr(cat_totals))
                                            .concat(break_row)
                                            .concat(csv_as_json);

                const data_as_str = JSONtoCSV(full_report);
                console.log("data_as_str" + data_as_str);
                writeCSV('budget_download', data_as_str);
            });
        })
    }
    else{
        showError('five', 'Oh no! Something is missing. Make sure to update/run each step.');
    }
}
