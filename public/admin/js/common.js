function serializeToJson(form) {
    // [{name: 'email', value: '用户输入的内容'}]
    let f = form.serializeArray();
    let result = {};
    f.forEach(item => {
        result[item.name] = item.value;
    });
    return result;
}