//  where do i filter?
const step4Populate = () => {
    step4Clear();
    hideError('four')
    if(csv_as_json){    //  must have csv
        readJSON('transaction-hosts.json').then(
            (hosts) => {
                readJSON('catagories.json').then(
                    (catagories) => {
                        const header_row = csv_as_json[0];
                        const host_id = header_row.indexOf('Description');
                        const amount_id = header_row.indexOf('Amount');
                        let host_amount = csv_as_json.map( (row) => [row[host_id], row[amount_id]]);
                        host_amount.shift(); //  remove header;
                        console.log(host_amount);
                        const just_catagories = Object.keys(catagories);
                        const options = buildOptions(just_catagories, '');
                        for (let row_id in host_amount){
                            const row = host_amount[row_id];
                            const params = {'host_val': row[0], 'options': options};
                            addRow('four', params);
                        }
                    }
                )
            }
        )
    }
    else{
        showError('four', 'No CSV file');
    }
}

const validateStep4Input = (step4Input) => {
    
}

const step4Run = () => {
    showStep('five');
    showError('four', 'Step Four error');
}

const step4Clear = () => {
    $( "#step-four .table-data-row" ).remove();
}