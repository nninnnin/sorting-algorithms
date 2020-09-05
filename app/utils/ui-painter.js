export default {
    PAIRS : {
        'bubble' : 'bar',
        'insertion' : 'bar',
        'quick' : 'card',
        'merge' : 'card'
    },


    paint : function (arr, algorithm) {
        const container = document.getElementById('visual-container');
        const bars = document.createElement('div');
        bars.classList.add('bars');
        bars.id = 'bars';

        for (let i = 0; i < arr.length; i++) {
            const bar = document.createElement('div');
            bar.classList.add('bar');
            bar.id = i;
            bar.setAttribute('data-value', arr[i]);
            bar.style.height = arr[i] * 20 + 'px';
            bar.style.order = i;
            bars.appendChild(bar);
        }

        container.innerHTML = "";
        container.appendChild(bars);
    },

    createCards : function (arr) {
        const container = document.getElementById('visual-container');
        container.innerHTML = '';
        const cards = document.createElement('div');
        cards.id = 'cards';

        const CARD_SYMBOLS = {
            0 : 'diamond',
            1 : 'clover',
            2 : 'heart',
            3 : 'spade'
        };

        arr.forEach((val, index) => {
            const card = document.createElement('div');
            const randomNumber = parseInt(4 * Math.random());

            card.classList.add('card');
            card.classList.add(`${CARD_SYMBOLS[randomNumber]}`);
            card.id = index;

            const content = document.createElement('div');
            content.className = 'cardNumber'
            content.innerText = val;

            card.appendChild(content);
            cards.appendChild(card);
        });
        
        container.appendChild(cards);
    },

    markFlag : async function (remove, create, flagType) {
        if (remove !== null) {
            const flag = document.getElementById(remove);
            flag.classList.remove(flagType);
        }
        
        if (create !== null) {
            const flag = document.getElementById(create);
            flag.classList.add(flagType);
        }

        await this.wait();
    },

    swapCards : async function (cardA, cardB) {
        if (cardA === cardB) return;

        const leftIndex = cardA > cardB ? cardB : cardA;
        const rightIndex = cardA > cardB ? cardA : cardB;

        const leftCard = document.getElementById(leftIndex);
        const rightCard = document.getElementById(rightIndex);

        const offset = rightCard.offsetLeft - leftCard.offsetLeft;

        leftCard.style.transform = `translate(${offset}px, 10px)`;
        
        await this.wait();
        
        rightCard.style.transform = `translate(-${offset}px, 10px)`;
        
        await this.wait();
        
        leftCard.style.transform = `translate(${offset}px, 0px)`;
        rightCard.style.transform = `translate(-${offset}px, 0px)`;
        
        const temp = leftCard.id;
        leftCard.id = rightCard.id;
        rightCard.id = temp;

        await this.wait();

        this.markFlag(leftCard.id, null, 'left');
        this.markFlag(rightCard.id, null, 'right');
        
        await this.wait();
    },

    separateCards : async function (pivot, height) {
        const pivotCard = document.getElementById(pivot);
        pivotCard.style.border = 'orangered 3px solid';
        pivotCard.style.transform = 'none';

        await this.wait();

        const leftPartition = document.createElement('div');
        const rightPartition = document.createElement('div');
        leftPartition.className = 'partition';
        rightPartition.className = 'partition';
        leftPartition.id = 'leftPartition';
        rightPartition.id = 'rightPartition';
        
        const partitions = [leftPartition, rightPartition];
        for (let i = 0; i < 2; i++) {
            partitions[i].style.position = 'absolute';
            partitions[i].style.top = 100 * height + 'px';
            partitions[i].style.width = parseInt(500 / (height + 1)) + 'px';
            partitions[i].textContent = i === 0 ? 'left' : 'right';
        }

        // leftPartition.style.left = `-${Math.floor(200 / height)}px`;
        // rightPartition.style.right =  `${Math.floor(200 / height)}px`;

        pivotCard.appendChild(leftPartition);
        pivotCard.appendChild(rightPartition);

        await this.wait();

        const cards = pivotCard.parentElement.children;
        const leftCards = document.createElement('div');
        const rightCards = document.createElement('div');

        console.log(cards);

        const cardReference = Array.from(cards).map(card => card.id);

        cardReference.forEach((id) => {
            const card = document.getElementById(id);

            card.style.transform = "none";

            if (id < pivot) {
                leftCards.appendChild(card);
            } else if (id > pivot) {
                rightCards.appendChild(card);
            }
        });

        leftPartition.appendChild(leftCards);
        rightPartition.appendChild(rightCards);

        await this.wait(50000000);
    },

    select : function (node, color, timer) {
        return new Promise((resolve, reject) => {
            const timeout = timer ? timer : 500;

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
                const currNode = document.getElementById(node);
                currNode.style.border = `3px solid ${color}`;

                resolve();
            }, timeout);
        });
    },

    fix : function (node, timer) {
        return new Promise((resolve, reject) => {
            const timeout = timer ? timer : 500;
            setTimeout(() => {
                const currNode = document.getElementById(node);
                currNode.style.border = 'blue 5px solid';

                resolve();
            }, timeout);
        });
    },

    replace : function (node, index) {
        return new Promise(async (resolve, reject) => {
            const currBar = document.getElementById(node);
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
                const currBar = document.getElementById(node1);
                const nextBar = document.getElementById(node2);

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
                const currBar = document.getElementById(node1);
                const nextBar = node2 ? document.getElementById(node2) : null;

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
                const currBar = document.getElementById(node1);
                const nextBar = node2 ? document.getElementById(node2) : null;

                currBar.classList.add('visible');
                currBar.classList.remove('hidden');
                
                if (nextBar) {
                    nextBar.classList.add('visible');
                    nextBar.classList.remove('hidden');
                }

                resolve();
            }, 500);
        });
    },

    wait : async function (timeout) {
        timeout = timeout ? timeout : 300;
        
        return new Promise((resolve, reject) => {
            setTimeout(resolve, timeout);
        });
    }
}
