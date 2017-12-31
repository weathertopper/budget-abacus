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
    $("#step-two-add-row").click(function(){ // use `function` for `this`
        addRow("two", {"cat_val":"", "cost_val": ""});
    });
    $("#step-two-update").click(() => {
        step2Update();
    });
    $("#step-three-add-row").click(function(){ // use `function` for `this`
        addRow("three");
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
                const row_id = addRow('two', params);
            }
        }
    )
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