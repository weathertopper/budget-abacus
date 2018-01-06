$(document).ready(function(){
    if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
        alert('The File APIs are not fully supported in this browser (use Chrome)');
        return;
    }
    $('#csv-input').change(function() { // use `function` for `this`
        const file_name = (this.files[0]['name']) ? this.files[0]['name'] : null;
        fillTextById('file_name_span', file_name);
        if (validFileName(file_name)){
            hideError('one');
            readCSVFile(this.files[0]);
        }
        else{
            showError('one', 'Incorrect file extension');
        }
    })
    $("#step-two-add-row").click(() => {
        addRow("two", {"cat_val":"", "cost_val": ""});
    });
    $("#step-two-update").click(() => {
        step2Update();
    });
    $("#step-three-add-row").click(() => {
        readJSON('categories.json').then(
            (categories) => {
                const just_categories = Object.keys(categories);
                const options = buildOptions(just_categories, '');
                const params = {'host_val': '', 'options': options};
                addRow('three', params);
            }
        )
    });
    $("#step-three-update").click(() => {
        step3Update();
        //  clean up 
    });
    $("#step-four-run").click(() => {
        step4Run();
    });
    $("#step-five-download").click(() => {
        step5Download();
    });
    hideStepsOnStartup();
});