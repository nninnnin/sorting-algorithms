export default {
    bubbleSort : function (arr) {
        const queue = [];

        for (let i = 0; i < arr.length - 1; i++) {
            
            for (let j = 0; j < arr.length - i - 1; j++) {
                const operation = {};
                operation.id = i;
                operation.currentBar = j;

                if (arr[j] > arr[j+1]) {
                    swap(j, j+1);
                    operation.swapped = true;
                } else {
                    operation.swapped = false;
                }

                if (j+1 === arr.length - i -1) {
                    operation.fixed = j+1;
                }

                queue.push(operation);
            }
        }

        function swap (index1, index2) {
            const temp = arr[index1];
            arr[index1] = arr[index2];
            arr[index2] = temp;
        }

        return queue;
    },

    insertionSort : function (arr) {
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
        }

        return queue;
    },

    quickSort : function (arr) {
        const queue = [];
        let partitionDepth = 0;

        function createTask (type, from, to) {
            return {
                type,
                from,
                to
            }
        }

        function partition (arr) {
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
                    queue.push(createTask("swap cards", left, right));

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
            
            pivot = left;
            
            queue.push(createTask("partitioned", pivot));
            
            const leftPart = arr.slice(0, pivot);
            const rightPart = arr.slice(pivot + 1);

            queue.push(createTask('separation', pivot, partitionDepth + 1));

            partitionDepth++;

            return [...partition(leftPart), arr[pivot], ...partition(rightPart)];
        }

        function swap (a, b, arr) {
            const temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }
        
        partition(arr);

        console.log(queue);
        return queue;
    },

    mergeSort : function () {

    }
}