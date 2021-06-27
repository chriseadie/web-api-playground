
var bc = new BroadcastChannel("dcode");

bc.addEventListener("message", (e) => {
    postToDom(e.data)
})

function postMessage() {
    var input = document.querySelector("#input")
    bc.postMessage(input.value)
    postToDom(input.value)
    input.value = "";
}

function postToDom(message) {
    var para = document.createElement("p");
    var dom = document.querySelector("body");
    para.innerHTML = message;
    dom.append(para);
}