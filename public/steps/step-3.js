
const step3Populate = () => {
    step3Clear();
    hideError('three')
    readJSON('transaction-hosts.json').then(
        (hosts) => {
            for (let host in hosts){
                readJSON('categories.json').then(
                    (categories) => {
                        const just_categories = Object.keys(categories);
                        const host_cat = hosts[host];
                        const options = buildOptions(just_categories, host_cat);
                        const params = {'host_val': host, 'options': options};
                        addRow('three', params);
                    }
                )
            }
        }
    )
}

const step3Update = () => {
    hideError('three')
    let step3Input = getStep3Input();
    const validated_input = validateStep3Input(step3Input);
    if (validated_input){
        writeJSON('transaction-hosts.json', validated_input).then(
            () => {
                showStep('four');
                step4Populate();
            }
        )
    }
    //  already threw errors
}

//  again, duplicates get simplified
const validateStep3Input = (step3Input) => {
    for (let host in step3Input){
        if (host.length == 0){
            const error_string = 'Empty Transaction Host';
            showError('three', error_string);
            return false;
        }
        if (host.includes('"')
            || host.includes(',')){
            const error_string = 'Transaction Host ' + host + ' contains illegal character';
            showError('three', error_string);
            return false;
        }
        if(step3Input[host]== 'default'){
            const error_string = 'Select Category for Transaction Host ' + host;
            showError('three', error_string);
            return false;
        }
    }
    return step3Input;
}

const step3Clear = () => {
    $( "#step-three .table-data-row" ).remove()
}