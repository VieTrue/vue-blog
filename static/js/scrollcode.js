var appDom = document.getElementById('app');
// var author = document.querySelector('meta[name="author"]').getAttribute('content')

ScrollCode()
appDom.addEventListener('click', ClickShwoText);
appDom.addEventListener('copy', CopyAddLink);

function ScrollCode() {
    var txts = "0123456789!@#$%^&*()~_+-abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    //转为数组
    txts = txts.split("");
    var matrix = document.createElement('canvas');
    matrix.style.cssText = 'position: fixed;top: 0;z-index: -1;height: calc(100vh);width: calc(100vw);'
    appDom.appendChild(matrix);
    var context = matrix.getContext("2d");
    matrix.height = window.innerHeight;
    matrix.width = window.innerWidth;
    var drop = [];
    var font_size = 20;
    var fon = 14;
    var columns = matrix.width / fon;
    for (var i = 0; i < columns; i++) drop[i] = 1;

    function drawMatrix() {
        context.fillStyle = "rgba(0, 0, 0, 0.03)";
        context.fillRect(0, 0, matrix.width, matrix.height);
        context.fillStyle = "green";
        context.font = font_size + "px";
        for (var i = 0; i < columns; i++) {
            //随机取要输出的文字
            var text = txts[Math.floor(Math.random() * txts.length)];
            //输出文字，注意坐标的计算
            context.fillText(text, i * fon, drop[i] * fon); /*get 0 and 1*/
            if (drop[i] * font_size > (matrix.height * 2 / 3) && Math.random() > 0.95) /*reset*/
                drop[i] = 0;
            drop[i]++;
        }
    }
    setInterval(drawMatrix, 23);
}

function ClickShwoText(e) {
    var a = new Array('😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '🙂', '🤗', '🤩', '🤨', '🤔', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '😛', '😌', '😴', '🥱', '😫', '😪', '😯', '🤐', '😜', '😝', '🤤', '😒', '😓', '😔', '😕', '🙃', '😤', '😟', '😞', '😖', '🙁', '😲', '🤑', '😢', '😢', '😭', '😦', '😧', '😨', '😩', '🤯', '😬', '🥴', '😵', '🤪', '😳', '🥶', '🥵', '😱', '😰', '😠', '😡', '🤬', '😷', '🤒', '🤕', '🤢', '🤮', '🤫', '🤥', '🤡', '🤠', '🥺', '🥳', '😇', '🤧', '🤭', '🧐', '🤓', '😈');
    // var a = new Array("富强", "民主", "文明", "和谐", "自由", "平等", "公正", "法治", "爱国", "敬业", "诚信", "友善");
    var a_idx = 0;
    var ev = e || event, //  IE浏览器兼容
        x = ev.clientX,
        y = ev.clientY;
    var color = Math.floor((Math.random() * 255)) + ',' + Math.floor((Math.random() * 255)) + ',' + Math.floor((Math.random() * 255));
    // 初始化定时器
    var _timer = null;
    // 创建节点
    var elSpan = document.createElement("span");
    // 随机节点内容
    a_idx = Math.floor((Math.random() * a.length));
    var cur_opacity = 1,
        cur_fontSize = 20,
        i = 0;
    // 添加内容到节点
    elSpan.innerHTML = a[a_idx];
    elSpan.style.color = 'rgb(' + color + ')';
    // elSpan.style.fontWeight = "bold";
    elSpan.style.fontSize = cur_fontSize + 'px';
    elSpan.className = "floatSpan";
    appDom.appendChild(elSpan);
    elSpan.style.top = y - elSpan.offsetHeight / 2 + "px";
    elSpan.style.left = x - elSpan.offsetWidth / 2 + "px";
    _timer = setInterval(function() {
        i += 1, y += -10, cur_opacity -= 0.1, cur_fontSize += 1;
        elSpan.style.opacity = cur_opacity;
        elSpan.style.fontSize = cur_fontSize + "px";
        elSpan.style.top = y - elSpan.offsetHeight / 2 + "px";
        elSpan.style.left = x - elSpan.offsetWidth / 2 + "px";
        if (i > 10) clearInterval(_timer), appDom.removeChild(elSpan);
    }, 50);
}

function CopyAddLink() {
    var selection, author = document.querySelector('meta[name="author"]').getAttribute('content')
    selection = window.getSelection() ? window.getSelection() : document.selection.createRange().text;
    var pagelink = "\r\n\r\n ==========😈========== \r\n 原文作者： " + author + " \r\n 转自链接：" + document.location.href;
    var copyText = selection + pagelink;
    var newDiv = document.createElement('div');
    newDiv.style.position = 'absolute';
    newDiv.style.left = '-99999px';
    appDom.appendChild(newDiv);
    newDiv.innerText = copyText;
    selection.selectAllChildren(newDiv);
    window.setTimeout(function() {
        appDom.removeChild(newDiv);
    }, 2);
}