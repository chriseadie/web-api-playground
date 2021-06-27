
async function SaveFile(){

    const newHandler = await window.showSaveFilePicker({
        types:[{
            description:"json",
            accept:{
                "plain/text":[".json"]
            }
        }]
    });

    const writableStream = await newHandler.createWritable();

    var obj = {hello:"world",personalConfigFile:["1","2","3"]};
    var blob = new Blob([JSON.stringify(obj,null,2)],{type:"application/json"})

    await writableStream.write(blob);

    await writableStream.close();
}