
const readJSON = (json_file_name) => {
    return new Promise( (resolve, reject) => {
        console.log('stop here');
        $.get(server_addr + json_file_name, (str) => {
            const json = JSON.parse(str);
            resolve(json);
        });
    })
}

const writeJSON = (json_file_name, new_json_object) => {
    return new Promise( (resolve, reject) => {
        $.post(server_addr + json_file_name, new_json_object, (data) => {
            resolve();
        })
    })
}

const writeCSV = (csv_file_name, csv_string) => {
    download(csv_file_name, csv_string)
    // return new Promise( (resolve, reject) => {
    //     $.post(server_addr + 'download/' + csv_file_name, csv_string, (data) => {
    //         resolve();
    //     })
    // })
}

//  taken from https://ourcodeworld.com/articles/read/189/how-to-create-a-file-and-generate-a-download-with-javascript-in-the-browser-without-a-server
function download(filename, text) {
    const full_file = filename+'.csv';
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', full_file);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }