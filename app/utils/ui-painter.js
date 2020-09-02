export default {
    PAIRS : {
        'bubble' : 'bar',
        'insertion' : 'bar',
        'quick' : 'card',
        'merge' : 'card'
    },


    paint : function (arr, algorithm) {
        // for test
        // arr = [8,6,2,4,5,10];

        const container = document.getElementById('visual-container');
        const bars = document.createElement('div');
        bars.classList.add('bars');
        bars.setAttribute('id', 'bars');

        for (let i = 0; i < arr.length; i++) {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.setAttribute('id', i); // order로 사용하자
            bar.setAttribute('data-value', arr[i]);
            bar.style.height = arr[i] * 20 + 'px';
            bar.style.order = i;
            bars.appendChild(bar);
        }

        container.innerHTML = "";
        container.appendChild(bars);
    },

    remove : function () {

    },

    select : function (node, color, timer) {
        return new Promise((resolve, reject) => {
            const timeout = timer ? timer : 1000;

            setTimeout(() => {
                document.getElementById(`${node}`).style.backgroundColor = `${color}`;

                resolve();
            }, timeout);
        });
    },

    check : function (node, uncheck, timer) {
        return new Promise((resolve, reject) => {
            const timeout = timer ? timer : 700;
            const color = uncheck ? 'black' : 'cornflowerblue';

            setTimeout(() => {
                const currNode = document.getElementById(`${node}`);
                currNode.style.border = `3px solid ${color}`;

                resolve();
            }, timeout);
        });
    },

    fix : function (node, timer) {
        return new Promise((resolve, reject) => {
            const timeout = timer ? timer : 500;
            setTimeout(() => {
                const currNode = document.getElementById(`${node}`);
                currNode.style.border = '3px solid blue';

                resolve();
            }, timeout);
        });
    },


    replace : function (node, index) { // currentBar, checked
        return new Promise(async (resolve, reject) => {
            const currBar = document.getElementById(`${node}`);
            await this.disappear(currBar);
            await this.reindex(currBar, index);
            await this.appear(currBar);

            resolve();
        });
    },
    appear : function (currBar) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                currBar.classList.add('appear');
                currBar.classList.remove('disappear');
                
                resolve();
            }, 300);
        });
    },
    disappear : function (currBar) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                currBar.classList.add('disappear');
                currBar.classList.remove('appear');
                
                resolve();
            }, 300);
        });
    },
    reindex : function (currBar, index) {
        const initialOrder = parseInt(currBar.style.order);
        
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const bars = document.getElementById('bars');
                Array.from(bars.children).forEach((bar, i) => {
                    if (bar === currBar) {
                        bar.style.order = index;
                        bar.id = bar.style.order;
                    } else if (parseInt(bar.style.order) >= index && parseInt(bar.style.order) < initialOrder) {
                        bar.style.order++;
                        bar.id = bar.style.order;
                    }
                });

                resolve();
            }, 300);
        });
    },
    

    swap : function (node1, node2) {
        return new Promise(async (resolve, reject) => {
            await this.hide(node1, node2);
            await this.change(node1, node2);
            await this.show(node1, node2);

            resolve();
        });
    },
    change : function (node1, node2) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currBar = document.getElementById(`${node1}`);
                const nextBar = document.getElementById(`${node2}`);

                const temp = currBar.style.order;

                currBar.style.order = nextBar.style.order;
                currBar.id = nextBar.style.order;

                nextBar.style.order = temp;
                nextBar.id = temp;

                resolve();
            }, 700)
        });
    },
    hide : function (node1, node2) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currBar = document.getElementById(`${node1}`);
                const nextBar = node2 ? document.getElementById(`${node2}`) : null;

                currBar.classList.add('hidden');
                currBar.classList.remove('visible');
                
                if (nextBar) {
                    nextBar.classList.add('hidden');
                    nextBar.classList.remove('visible');
                }

                resolve();
            }, 500);
        });
    },
    show : function (node1, node2) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const currBar = document.getElementById(`${node1}`);
                const nextBar = node2 ? document.getElementById(`${node2}`) : null;

                currBar.classList.add('visible');
                currBar.classList.remove('hidden');
                
                if (nextBar) {
                    nextBar.classList.add('visible');
                    nextBar.classList.remove('hidden');
                }

                resolve();
            }, 500);
        });
    }
}