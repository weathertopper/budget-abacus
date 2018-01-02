const validFileName = (file_name) => {
    file_name = file_name.toLowerCase();
    return (file_name.indexOf('.csv') == (file_name.length - ('.csv'.length)));
}

//  technically array of arrays
const CSVtoJSON = (data_as_string) => {
    data_as_string = data_as_string.trim();
    //  split rows by newline
    let data_as_array = data_as_string.split('\n');
    //  split each row by comma
    data_multi_array = [];
    for (let row_index in data_as_array){
        let row = data_as_array[row_index];
        row = row.split(',');
        //  trim any other newlines
        for (let inner_index in row){
            row[inner_index] = row[inner_index].trim();
        }
        data_multi_array.push(row);
    }
    return data_multi_array;
}

/**
 * Check for:
 *  -   correct headers
 * I could check for a bunch more, but I will assume the CSV from the bank is legit
 */
const validFileContent = (csv_as_json) => {
    const header_row = csv_as_json[0];
    let header_lower_case = []
    for (let h_id in header_row){
        header_lower_case.push(header_row[h_id].toLowerCase());
    }
    //  I don't care about 'check number'
    return ( header_lower_case.includes('date')
            && header_lower_case.includes('transaction type')
            && header_lower_case.includes('description')
            && header_lower_case.includes('amount')
            && header_lower_case.includes('daily posted balance')
    )
}

//  technically array of arrays
const JSONtoCSV = () => {
    let data_str = '';
    for (row_id in csv_as_json){
        const row = csv_as_json[row_id]
        for (col_id in row){
            const data_val = row[col_id];
            data_str += data_val;
            data_str += ','
        }
        data_str+='\n';
    }
    return data_str;
}
