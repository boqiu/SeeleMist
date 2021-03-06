// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var SeeleClient = require('../api/seeleClient');
var fs = require('fs');

seeleClient = new SeeleClient();

// onload = function() {
//     document.getElementById("createKey").addEventListener("click", generateKey);
// }

function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function() {
            oldonload();
            func();
        }
    }
}
addLoadEvent(function() {
    document.getElementById("createKey").addEventListener("click", generateKey);
})

function generateKey() {
    var shard = document.getElementById("shardnum")
    var passWord = document.getElementById("passWord")

    layer.load(0, { shade: false });

    seeleClient.generateKey(shard.value, passWord.value).then((outdata) => {
        setInterval(function() {
            if (fs.existsSync(seeleClient.accountPath + outdata.trim())) {
                layer.closeAll();
                window.location.reload();
            }
        }, 1000, "Interval");
    }).catch(err => {
        alert(err)
    });
}