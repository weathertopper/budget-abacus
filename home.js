$(document).ready(function(){
    $("#csv-input").click(function(){
        step1Select();
    });
    $("#step-two-update").click(function(){
        step2Update();
    });
    $("#step-three-update").click(function(){
        step3Update();
    });
    $("#step-four-run").click(function(){
        step4Run();
    });
    $("#step-five-download").click(function(){
        step5Download();
    });
});

const step1Select = () => {
    showError('one', 'CSV not selected');
}

const step2Update = () => {
    showError('two', 'Step Two error');
}

const step3Update = () => {
    showError('three', 'Step Three error');
}

const step4Run = () => {
    showError('four', 'Step Four error');
}

const step5Download = () => {
    showError('five', 'Step Five error');
}

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
const addRow = (step_num) => {
    let id = Date.now();
    let new_row = add_row_strings[step_num].replace(/%id%/g, id);
    $(`#step-${step_num} .table-div table .table-add-row`).before(new_row);
}

const removeRow = (row_id) => {
    $(`#${row_id}`).remove();
}