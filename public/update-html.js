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
    //  now add id manually
    add_row = add_row.replace(/%id%/g, id);
    $(`#step-${step_num} .table-div table .table-add-row`).before(add_row);
}

//  returns string
const buildOptions = (cat_array, host_cat) => {
    let opts_string = '';
    let opt_val_count = 1; // 0 is the default (already added);
    for (let cat_id in cat_array){
        const catagory = cat_array[cat_id];
        const selected = (catagory == host_cat) ? 'selected' : '';
        const params = {'val_id': opt_val_count, 'opt_text': catagory, 'selected': selected}; //def for now
        const opt_row = addOption(params);
        opts_string += opt_row;
        opt_val_count++;
    }
    console.log(opts_string);
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

const showFileName = (file_name) => {
    $('#file_name_span')
        .text(file_name);
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