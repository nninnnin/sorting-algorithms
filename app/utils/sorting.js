export default {
    bubbleSort : function (arr) {
        const queue = [];

        for (let i = 0; i < arr.length - 1; i++) {
            
            for (let j = 0; j < arr.length - i - 1; j++) {
                const operation = {};
                operation.id = i;
                operation.currentBar = j;

                if (arr[j] > arr[j + 1]) {
                    swap(j, j + 1);
                    operation.swapped = true;
                } else {
                    operation.swapped = false;
                }

                if (j + 1 === arr.length - i - 1) {
                    operation.fixed = j + 1;
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

            while (j > 0 && arr[j - 1] > arr[i]) {
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
                operation2.comparison = i - 1;
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
            if (arr.length <= 1) return arr;
            
            let pivot = arr.length - 1;
            let left = 0;
            let right = pivot - 1;

            queue.push(createTask("flag pivot", null, arr[pivot]));
            queue.push(createTask("flag left", null, arr[left]));
            queue.push(createTask("flag right", null, arr[right]));

            while (left < right) {
                if (arr[right] <= arr[pivot] && arr[left] > arr[pivot]) {
                    swap(left, right, arr);
                    queue.push(createTask("swap cards", arr[left], arr[right]));

                    left++;
                    right--;

                    queue.push(createTask("flag left", arr[left - 1], arr[left]));
                    queue.push(createTask("flag right", arr[right + 1], arr[right]));

                    continue;
                }

                if (arr[right] > arr[pivot]) {
                    right--;
                    queue.push(createTask("flag right", arr[right + 1], arr[right]));
                }
                
                if (arr[left] <= arr[pivot]) {
                    left++;
                    queue.push(createTask("flag left", arr[left - 1], arr[left]));
                }
            }
            
            if (left + 1 !== pivot && arr[left] <= arr[pivot]) {
                left++;
                queue.push(createTask("flag left", arr[left - 1], arr[left]));
            }

            if (arr[left] > arr[pivot]) {
                swap(left, pivot, arr);
                queue.push(createTask("swap cards", arr[pivot], arr[left]));
                
                pivot = left;
            } else {
                queue.push(createTask("swap cards", arr[left], arr[left]));
                queue.push(createTask("swap cards", arr[pivot], arr[pivot]));
            }
            
            queue.push(createTask("partitioned", arr[pivot]));
            
            let leftPart = arr.slice(0, pivot);
            let rightPart = arr.slice(pivot + 1);

            partitionDepth++;
            
            queue.push({
                type: 'separation',
                pivot : arr[pivot],
                height : partitionDepth,
                arr
            });
            
            leftPart = partition(leftPart);
            partitionDepth--;
            rightPart = partition(rightPart);
            
            return [...leftPart, arr[pivot], ...rightPart];
        }

        function swap (a, b, arr) {
            const temp = arr[a];
            arr[a] = arr[b];
            arr[b] = temp;
        }
        
        partition(arr);

        queue.push({type : 'reconcile'});

        return queue;
    },

    mergeSort : function (arr) {
        const queue = [];

        function partition(arr) {
            if (arr.length === 1) return arr;

            const medium = Math.ceil(arr.length / 2);
            const leftPart = arr.slice(0, medium);
            const rightPart = arr.slice(medium);

            const sortedArr = merge(partition(leftPart), partition(rightPart));

            console.log(sortedArr);

            return sortedArr;
        }

        function merge (leftPart, rightPart) {
            const mergedArr = new Array();

            let i = 0;
            let j = 0;

            while (leftPart[i] !== undefined && rightPart[j] !== undefined) {
                if (leftPart[i] < rightPart[j]) {
                    mergedArr.push(leftPart[i]);
                    i++;
                } else {
                    mergedArr.push(rightPart[j]);
                    j++;
                }
            }

            const restElements = leftPart[i] === undefined ? rightPart.slice(j) : leftPart.slice(i);

            return [...mergedArr, ...restElements];
        }

        const partedArr = partition(arr);
        

        return queue;
    }
}
