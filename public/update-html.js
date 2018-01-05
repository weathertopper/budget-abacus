const showError = (step_num, error_string) => {
    $(`#step-${step_num} .error-div`)
        .html(`<strong>Error: </strong><span>${error_string}</span>`)
        .css('display', 'block');
}

const hideError = (step_num) => {
    $(`#step-${step_num} .error-div`)
        .html(``)
        .css('display', 'none');
}

const hideStep = (step_num) => {
    $(`#step-${step_num}`)
        .css('display', 'none');
}

const showStep = (step_num) => {
    $(`#step-${step_num}`)
        .css('display', 'block');
}

const hideStepsOnStartup = () => {
    hideStep('two');
    hideStep('three');
    hideStep('four');
    hideStep('five');
}

//  not part of click() function bc Date.now() needed for id
//  params is JSON obj of key/val pairs to replace in row
const addRow = (step_num, params) => {
    params = (params) ? params : {}; // init if no other params needed
    let id = Date.now().toString();
    let add_row = add_row_strings[step_num];
    for (let param in params){
        id += (param + params[param]);
        const param_bookends = '%'+param+'%';  //  add param bookends
        const reg = new RegExp(param_bookends, 'g'); //  global replace
        add_row = add_row.replace(reg, params[param]);
    }
    //  take all illegal chars out of id
    id = id.replace(/\s/g, "-");
    id = id.replace(/'/g, "-");
    id = id.replace(/"/g, "-");
    id = id.replace(/=/g, "-");
    id = id.replace(/\//g, "-");
    id = id.replace(/>/g, "-");
    id = id.replace(/</g, "-");
    //  now add id manually
    add_row = add_row.replace(/%id%/g, id);
    if (step_num == 'four'){    // four is a bit different, it doesn't have an add row
        $(`#step-${step_num} .table-div table tbody`).append(add_row);
    }
    else{
        $(`#step-${step_num} .table-div table .table-add-row`).before(add_row);
    }
}

//  returns string
const buildOptions = (cat_array, host_cat) => {
    let opts_string = '';
    for (let cat_id in cat_array){
        const catagory = cat_array[cat_id];
        const selected = (catagory == host_cat) ? 'selected' : '';
        const params = {'val_id': catagory, 'opt_text': catagory, 'selected': selected}; //def for now
        const opt_row = addOption(params);
        opts_string += opt_row;
    }
    return opts_string;
}

//  returns string
const addOption = (params) => {
    let opt_template = catagory_option_string.slice(0); //  local copy
    for (let param in params){
        const param_bookends = '%'+param+'%';  //  add param bookends
        const reg = new RegExp(param_bookends, 'g'); //  global replace
        opt_template = opt_template.replace(reg, params[param]);
    }
    return opt_template;
}

const removeRow = (row_id) => {
    $(`#${row_id}`).remove();
}

const getStep2Input = () => {
    let updated_catagories = {};
    $('#step-two .table-data-row').each(function() { // `function` for `this`
        const row_cat = $(this).find('.catagory').val().toUpperCase();
        const row_cost = $(this).find('.expected-cost').val();
        updated_catagories[row_cat] = row_cost;
    })
    return updated_catagories;
}

const getStep3Input = () => {
    let updated_hosts = {};
    $('#step-three .table-data-row').each(function() { // `function` for `this`
        const row_host = $(this).find('.transaction-host').val().toUpperCase().trim();
        const row_cat = $(this).find('.catagory-dropdown').val();
        updated_hosts[row_host] = row_cat;
    })
    return updated_hosts;
}

const getStep4Input = () => {
    let updated_hosts = {};
    $('#step-four .table-data-row').each(function() { // `function` for `this`
        const row_host = $(this).find('.host-val').text().trim();
        const row_cat = $(this).find('.catagory-dropdown').val();
        updated_hosts[row_host] = row_cat;
    })
    return updated_hosts;
}

const step4Clear = () => {
    $( "#step-four .table-data-row" ).remove();
}

const step5ClearReview = () => {
    $( "#step-five .table-data-row td:nth-of-type(2)" ).empty();
}

const fillTextById = (id, val) => {
    $(`#${id}`).text(val);
}

const colorActual = (color) => {
    $('#actual-cost-td').css('color', color);
}