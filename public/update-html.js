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
    params['id'] = Date.now();
    let add_row = add_row_strings[step_num];
    for (let param in params){
        const param_bookends = '%'+param+'%';  //  add param bookends
        const reg = new RegExp(param_bookends, 'g'); //  global replace
        add_row = add_row.replace(reg, params[param]);
    }    
    $(`#step-${step_num} .table-div table .table-add-row`).before(add_row);
}

const removeRow = (row_id) => {
    $(`#${row_id}`).remove();
}

const showFileName = (file_name) => {
    $('#file_name_span')
        .text(file_name);
}