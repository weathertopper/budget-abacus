'use strict';

const fs = require('fs');
const path = require('path');

module.exports.getJSON = (json_file_name) => {
    const full_path = path.join(__dirname , json_file_name);
    if (fs.existsSync(full_path)){
        return fs.readFileSync(full_path);
    }
    return {};
}

module.exports.setJSON = (json_file_name, json_value) => {
    const full_path = path.join(__dirname , json_file_name);
    if (fs.existsSync(full_path)){
        fs.writeFileSync(full_path, JSON.stringify(json_value));
    }
}