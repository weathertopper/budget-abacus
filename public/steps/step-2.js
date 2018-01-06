const step2Populate = () => {
    hideError('two')
    step2Clear();
    readJSON('categories.json').then(
        (categories) => {
            for (let category in categories){
                const cat_val = category;
                const cost_val = categories[category];
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
        writeJSON('categories.json', validated_input);
        showStep('three');
        step3Populate();
        step4Populate();
    }
    //  already threw errors
}

/**
 * Check for
 *  -   unique category (eh, don't worry-- will take latest value)
 *  -   category does not have illegal characters: `"` or `,` 
 *  -   cost is whole number > 0
 */
const validateStep2Input = (step2Input) => {
    for (let category in step2Input){
        if (category.length == 0){
            const error_string = 'Empty Category';
            showError('two', error_string);
            return false;
        }
        if (category.includes('"')
            || category.includes(',')){
            const error_string = 'Category ' + category + ' contains illegal character';
            showError('two', error_string);
            return false;
        }
        const cost_as_int = parseInt(step2Input[category]);
        if (!isNaN(cost_as_int) /*&& cost_as_int >=0*/ ){
            step2Input[category] = cost_as_int;
        }
        else{
            const error_string = 'Expected Total ' + step2Input[category] + ' is not a number ≥ 0';
            showError('two', error_string);
            return false;
        }
    }
    return step2Input;
}

const step2Clear = () => {
    $( "#step-two .table-data-row" ).remove()
}