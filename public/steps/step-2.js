const step2Populate = () => {
    hideError('two')
    step2Clear();
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
        showStep('three');
        step3Populate();
        step4Populate();
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

const step2Clear = () => {
    $( "#step-two .table-data-row" ).remove()
}