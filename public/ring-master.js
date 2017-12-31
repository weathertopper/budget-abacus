$(document).ready(function(){
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser (use Chrome)');
        return;
    }
    $('#csv-input').change(function() { // use `function` for `this`
        const file_name = (this.files[0]['name']) ? this.files[0]['name'] : null;
        showFileName(file_name);
        if (validFileName(file_name)){
            hideError('one');
            readCSVFile(this.files[0]);
        }
        else{
            showError('one', 'Incorrect file extension');
        }
    })
    $("#step-two-add-row").click(() => {
        addRow("two", {"cat_val":"", "cost_val": ""});
    });
    $("#step-two-update").click(() => {
        step2Update();
    });
    $("#step-three-add-row").click(() => {
        readJSON('catagories.json').then(
            (catagories) => {
                const just_catagories = Object.keys(catagories);
                const options = buildOptions(just_catagories, '');
                const params = {'host_val': '', 'options': options};
                addRow('three', params);
            }
        )
    });
    $("#step-three-update").click(() => {
        step3Update();
    });
    $("#step-four-run").click(() => {
        step4Run();
    });
    $("#step-five-download").click(() => {
        step5Download();
    });
    populateSteps();
});

const readCSVFile = (file) => {
    let file_reader = new FileReader();
    file_reader.onload = step1Select;
    file_reader.readAsDataURL(file)
}

const populateSteps = () => {
    step2Populate();
}

const step1Select = (file) => {
    const result = (file.currentTarget.result) ? file.currentTarget.result : null;
    const result_prefix = 'data:text/csv;base64,';
    const encoded_data = result.substring('data:text/csv;base64,'.length);
    if (encoded_data){
        let decoded_data = window.atob(encoded_data);
        let data_multi_array = CSVtoJSON(decoded_data);
        if (validFileContent(data_multi_array)){
            console.log('good data');
            //  setting global var
            csv_as_json = data_multi_array;
        }
        else{
            showError('one', 'Incorrect data format')
        }
    }
    else{
        showError('one', 'No data in file')
    }    
}

const step2Populate = () => {
    readJSON('catagories.json').then(
        (catagories) => {
            for (let catagory in catagories){
                const cat_val = catagory;
                const cost_val = catagories[catagory];
                const params = {'cat_val': cat_val, 'cost_val': cost_val};
                addRow('two', params);
            }
        }
    )
}

const step2Update = () => {
    hideError('two')
    let step2Input = getStep2Input();
    const validated_input = validateStep2Input(step2Input)
    if (validated_input){
        writeJSON('catagories.json', validated_input);
        step3Populate();
    }
    //  already threw errors
}

/**
 * Check for
 *  -   unique catagory (eh, don't worry-- will take latest value)
 *  -   catagory does not have illegal characters: `"` or `,` 
 *  -   cost is whole number > 0
 */
const validateStep2Input = (step2Input) => {
    for (let catagory in step2Input){
        if (catagory.length == 0){
            const error_string = 'Empty Catagory';
            showError('two', error_string);
            return false;
        }
        if (catagory.includes('"')
            || catagory.includes(',')){
            const error_string = 'Catagory ' + catagory + ' contains illegal character';
            showError('two', error_string);
            return false;
        }
        const cost_as_int = parseInt(step2Input[catagory]);
        if (!isNaN(cost_as_int) && cost_as_int >=0 ){
            step2Input[catagory] = cost_as_int;
        }
        else{
            const error_string = 'Expected Cost ' + step2Input[catagory] + ' is not a number ≥ 0';
            showError('two', error_string);
            return false;
        }
    }
    return step2Input;
}

const step3Populate = () => {
    step3Clear();
    readJSON('transaction-hosts.json').then(
        (hosts) => {
            for (let host in hosts){
                readJSON('catagories.json').then(
                    (catagories) => {
                        const just_catagories = Object.keys(catagories);
                        const host_cat = hosts[host];
                        const options = buildOptions(just_catagories, host_cat);
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
        writeJSON('transaction-hosts.json', validated_input);
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
            const error_string = 'Select Catagory for Transaction Host ' + host;
            showError('three', error_string);
            return false;
        }
    }
    return step3Input;
}

const step3Clear = () => {
    $( "#step-three .table-data-row" ).remove()
}

const step4Run = () => {
    showError('four', 'Step Four error');
}

const step5Download = () => {
    showError('five', 'Step Five error');
}