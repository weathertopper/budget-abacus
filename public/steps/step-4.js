//  where do i filter?
const step4Populate = () => {
    step4Clear();
    hideError('four')
    if(csv_as_json){    //  must have csv
        readJSON('transaction-hosts.json').then(
            (hosts) => {
                readJSON('catagories.json').then(
                    (catagories) => {

                        //  fill in known hosts in csv_as_json w/ trans-hosts.json and cat.json
                        //  for each for in csv_as_json, if cat !== '', skip. else, make row
                        const header_row = csv_as_json[0];
                        const host_id = header_row.indexOf('Host');
                        const amount_id = header_row.indexOf('Amount');
                        let host_amount = csv_as_json.map( (row) => [row[host_id], row[amount_id]]);
                        host_amount.shift(); //  remove header;
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
    for (let host in step4Input){
        if(step4Input[host]== 'default'){
            const error_string = 'Select Catagory for Transaction Host ' + host;
            showError('four', error_string);
            return false;
        }
    }
    return step4Input;   
}

const step4Run = () => {
    let step4Input = getStep4Input();
    const validated_input = validateStep4Input(step4Input);
    if (validated_input){
        showStep('five');
        step5Populate();
    }
    //  already threw errors    
}

const step4Clear = () => {
    $( "#step-four .table-data-row" ).remove();
}