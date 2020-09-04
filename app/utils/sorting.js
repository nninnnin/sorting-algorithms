export default {
    bubbleSort : function (arr) {
        console.log(arr);

        const queue = [];

        for (let i = 0; i < arr.length - 1; i++) {
            
            for (let j = 0; j < arr.length - i - 1; j++) {
                const operation = {};
                operation.id = i;
                operation.currentBar = j;

                if (arr[j] > arr[j+1]) {
                    swap(j, j+1);
                    console.log('swap')
                    operation.swapped = true;
                } else {
                    console.log('no swap')
                    operation.swapped = false;
                }

                if (j+1 === arr.length - i -1) {
                    operation.fixed = j+1;
                }

                console.log(operation.currentBar);
                queue.push(operation);
            }

            console.log(`뒤에서 ${i} 번째 ${arr[arr.length-i-1]}로 확정!`)
            console.log(arr)
        }

        console.log(`\n 버블소트 완료 => ${arr} \n\n`)

        function swap (index1, index2) {
            const temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        }

        console.log(queue);
        return queue;
    },

    insertionSort : function (arr) { // [5,8,6,4,3,2,10,1]
        console.log(arr)

        const queue = [];

        for (let i = 1; i < arr.length; i++) {
            let j = i;

            while (j > 0 && arr[j-1] > arr[i]) {
                j--;

                const innerOperation = [];
                innerOperation.currentBar = i;
                innerOperation.comparison = j;
                innerOperation.checked = true;

                queue.push(innerOperation);
            }
            
            const operation2 = [];
            operation2.currentBar = i;

            // 알맞은 j의 위치를 찾아냈다면, 삽입!
            if (j !== i) {
                const [temp] = arr.splice(i, 1);
                arr.splice(j, 0, temp);

                operation2.moved = true;
            } else {
                operation2.comparison = i-1;
                operation2.moved = false;
            }
            
            operation2.fixed = i;
            queue.push(operation2);

            console.log(arr);
        }

        console.log(queue);

        return queue;
    },

    quickSort : function (arr) { // [5, 8, 1, 7, 2, 3, 10, 4]
        console.log('퀵소트 실행')
        console.log(arr);

        const queue = [];

        function createTask (type, from, to) {
            return {
                type,
                from,
                to
            }
        }

        function partition (arr) {
            console.log(arr);
            // debugger;
            if (arr.length <= 1) {
                return arr;
            }
            
            let pivot = arr.length - 1;
            let left = 0;
            let right = pivot - 1;

            queue.push(createTask("flag pivot", null, pivot));
            queue.push(createTask("flag left", null, left));
            queue.push(createTask("flag right", null, right));

            while (left < right) {
                if (arr[right] <= arr[pivot] && arr[left] > arr[pivot]) {
                    swap(left, right, arr);
                    queue.push(createTask("swap cards", left, right)); // flag는 그대로고 값(카드)만 바뀌어야

                    console.log(arr);
                    left++;
                    right--;

                    queue.push(createTask("flag left", left - 1, left));
                    queue.push(createTask("flag right", right + 1, right));

                    continue;
                }

                if (arr[right] > arr[pivot]) {
                    right--;
                    queue.push(createTask("flag right", right + 1, right));
                }
                
                if (arr[left] <= arr[pivot]) {
                    left++;
                    queue.push(createTask("flag left", left - 1, left));
                }
            }
            
            if (arr[left] <= arr[pivot]) {
                left++;
                queue.push(createTask("flag left", left - 1, left));
            }
            swap(left, pivot, arr);
            
            queue.push(createTask("remove left flag", left, null)); 
            queue.push(createTask("remove right flag", right, null));
            queue.push(createTask("swap cards", pivot, left));
            queue.push(createTask("flag pivot", pivot, left));
            
            pivot = left;

            queue.push(createTask("partitioned", pivot)); // 피벗 한번 깜빡
            
            console.log('partition complete => ', arr); // 재귀 호출 직전, partition이 완료된 arr

            const leftPart = arr.slice(0, pivot);
            const rightPart = arr.slice(pivot + 1);

            queue.push(createTask('separation', pivot, arr));

            console.log('parted!', leftPart, [arr[pivot]], rightPart);
            const result = [...partition(leftPart), arr[pivot], ...partition(rightPart)];
            console.log('merged!', result);
            
            return result;
        }

        function swap (a, b, arr) {
            const temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }
        
        const result = partition(arr);
        console.log(result);

        console.log('큐입니다', queue);
        return queue;
    },

    mergeSort : function () {

    }
}