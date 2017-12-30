$(document).ready(function(){
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser (use Chrome)');
        return;
    }  
    populateStepTwoTable();
    $('#csv-input').change(function() { // use `function` for `this`
        const file_name = (this.files[0]['name']) ? this.files[0]['name'] : null;
        if (validFileName(file_name)){
            hideError('one');
            showFileName(file_name);
            let file = this.files[0];
            let file_reader = new FileReader();
            file_reader.onload = step1Select;
            file_reader.readAsDataURL(file)
        }
        else{
            showError('one', 'Incorrect file extension');
        }
    })
    $("#step-two-update").click(() => {
        step2Update();
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
});

const step1Select = (file) => {
    const result = (file.currentTarget.result) ? file.currentTarget.result : null;
    const result_prefix = 'data:text/csv;base64,';
    const encoded_data = result.substring('data:text/csv;base64,'.length);
    if (encoded_data){
        let decoded_data = window.atob(encoded_data);
        let data_multi_array = CSVtoJSON(decoded_data);
    }
    else{
        showError('one', 'No data in file')
    }    
}

const validFileName = (file_name) => {
    file_name = file_name.toLowerCase();
    return (file_name.indexOf('.csv') == (file_name.length - ('.csv'.length)));
}

const CSVtoJSON = (data_as_string) => {
    data_as_string = data_as_string.trim();
    //  split rows by newline
    let data_as_array = data_as_string.split('\n');
    //  split each row by comma
    data_multi_array = [];
    for (let row_index in data_as_array){
        let row = data_as_array[row_index];
        row = row.split(',');
        data_multi_array.push(row);
    }    
    console.log(data_multi_array);
    //  will need to populate step three i think
}

const showFileName = (file_name) => {
    $('#file_name_span')
        .text(file_name);
}

const populateStepTwoTable = () => {
    // readJSONFile('defaults')
}

const readJSON = (json_file_name) => {
    $.getJSON(json_file_name, (result) => {
        console.log(result);
    })
}

const writeJSON = (json_file_name) => {

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