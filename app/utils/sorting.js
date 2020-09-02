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
        const pivot = arr.length - 1;

        function partition (arr) {
            // make partition `in place`!!
            let left = 0;
            let right = arr.length - 2;

            while (left < right) {
                // pivot과 작거나 같은 것들이 왼쪽에 오도록
                if (arr[right] <= arr[pivot] && arr[left] > arr[pivot]) {
                    swap(left, right);
                    left++;
                    right--;
                }

                if (arr[right] > arr[pivot]) {
                    right--;
                }

                if (arr[left] <= arr[pivot]) {
                    left++;
                }
            }

            swap(left, pivot);

            if (arr.length === 1) {
                return arr;
            } else {
                return partition(arr);
            }
        }

        partition(arr);

        function swap (a, b) {
            const temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }

        return [];
    },

    mergeSort : function () {

    }
}