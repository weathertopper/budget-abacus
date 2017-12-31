const readCSVFile = (file) => {
    let file_reader = new FileReader();
    file_reader.onload = step1Select;
    file_reader.readAsDataURL(file)
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
            showStep('two');
            step2Populate();
        }
        else{
            showError('one', 'Incorrect data format')
        }
    }
    else{
        showError('one', 'No data in file')
    }    
}