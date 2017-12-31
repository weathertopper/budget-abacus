
const readJSON = (json_file_name) => {
    return new Promise( (resolve, reject) => {
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