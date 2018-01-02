//  populates _JUST_ hosts w/o categories
const step4Populate = () => {
    step4Clear();
    hideError('four')
    if(csv_as_json){    //  must have csv
        readJSON('transaction-hosts.json').then(
            (hosts) => {
                readJSON('catagories.json').then(
                    (catagories) => {
                        wipeHostCatagories();
                        fillHostCatagories(hosts);    //  turn hosts JSON into multi-d array
                        const header_row = csv_as_json[0];
                        const cat_id = header_row.indexOf('Catagory');
                        const host_id = header_row.indexOf('Host');
                        const amount_id = header_row.indexOf('Amount');
                        const options = buildOptions(Object.keys(catagories), '');  //  catagories as strings in options
                        for (let row_id in csv_as_json){
                            const row = csv_as_json[row_id];
                            if (row[cat_id] != ''){ //  if catagory not empty
                                continue;
                            }
                            const params = {'host_val': row[host_id], 'options': options};
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
        step5Populate(validated_input);
    }
    //  already threw errors    
}

const step4Clear = () => {
    $( "#step-four .table-data-row" ).remove();
}