// 公共方法

let interval = null

const PageScrolling = (backPosition = 0) => {
    // 页面滚动
    let distanceY = window.pageYOffset
    let i = 0
    interval = setInterval(() => {
        if (backPosition > distanceY) {
            let next = Math.floor(easeInOutQuad(10 * i, distanceY, backPosition, 500))
            if (next >= backPosition) {
                window.scrollTo(0, backPosition)
                clearInterval(interval)
            } else {
                window.scrollTo(0, next)
            }
        } else {
            let next = Math.floor(easeInOutQuad(10 * i, distanceY, -distanceY, 500))
                // 像上滚动
            if (next <= backPosition) {
                window.scrollTo(0, backPosition)
                clearInterval(interval)
            } else {
                window.scrollTo(0, next)
            }
        }

        i++
    }, 17)
}

const easeInOutQuad = (t, b, c, d) => {
    /*
    缓动公式（Tween算法）
    t: 动画已经执行的时间（实际上时执行多少次/帧数）
    b: 起始位置
    c: 终止位置
    d: 从起始位置到终止位置的经过时间（实际上时执行多少次/帧数）

    http://www.cnblogs.com/mrsunny/archive/2011/06/21/2086080.html
    */
    // 判断当前时间是否总在总时间的一半以内，是的话执行缓入函数，否则的话执行缓出函数
    if ((t /= d / 2) < 1) {
        return c / 2 * t * t + b
    } else {
        // 将总长度设置为一半，并且时间从当前开始递减，对图像进行垂直向上平移
        return -c / 2 * (--t * (t - 2) - 1) + b
    }
}


export {
    PageScrolling,
}