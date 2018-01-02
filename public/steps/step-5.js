
const step5Populate= (step_four_input) => {
    fillHostCatagories(step_four_input);
}

const step5Download = () => {
    if (nothingEmpty()){
        const data_as_str = JSONtoCSV()
        console.log(data_as_str);
        writeCSV('budget_download', data_as_str);
    }
    else{
        showError('five', 'Oh no! Something is missing. Make sure to update/run each step.');
    }
}