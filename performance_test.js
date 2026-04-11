// 排序演算法性能測試腳本
// 在瀏覽器控制台運行此腳本來收集準確數據

async function runPerformanceTest() {
    const results = [];

    // 測試不同資料規模
    const testSizes = [10, 50, 100, 500, 1000];

    for (const size of testSizes) {
        console.log(`\n=== 測試資料規模: ${size} ===`);

        // 生成隨機陣列
        const testArray = Array.from({length: size}, () => Math.floor(Math.random() * 1000));

        // 複製陣列給每個排序演算法
        const arrays = {
            bubble: [...testArray],
            selection: [...testArray],
            insertion: [...testArray],
            merge: [...testArray],
            quick: [...testArray]
        };

        const sortResults = {};

        // 氣泡排序測試
        const bubbleStart = performance.now();
        let bubbleComparisons = 0;
        let bubbleSwaps = 0;

        for (let i = 0; i < arrays.bubble.length - 1; i++) {
            for (let j = 0; j < arrays.bubble.length - i - 1; j++) {
                bubbleComparisons++;
                if (arrays.bubble[j] > arrays.bubble[j + 1]) {
                    [arrays.bubble[j], arrays.bubble[j + 1]] = [arrays.bubble[j + 1], arrays.bubble[j]];
                    bubbleSwaps++;
                }
            }
        }
        const bubbleTime = performance.now() - bubbleStart;
        sortResults.bubble = { time: bubbleTime, comparisons: bubbleComparisons, swaps: bubbleSwaps };

        // 選擇排序測試
        const selectionStart = performance.now();
        let selectionComparisons = 0;
        let selectionSwaps = 0;

        for (let i = 0; i < arrays.selection.length - 1; i++) {
            let minIndex = i;
            for (let j = i + 1; j < arrays.selection.length; j++) {
                selectionComparisons++;
                if (arrays.selection[j] < arrays.selection[minIndex]) {
                    minIndex = j;
                }
            }
            if (minIndex !== i) {
                [arrays.selection[i], arrays.selection[minIndex]] = [arrays.selection[minIndex], arrays.selection[i]];
                selectionSwaps++;
            }
        }
        const selectionTime = performance.now() - selectionStart;
        sortResults.selection = { time: selectionTime, comparisons: selectionComparisons, swaps: selectionSwaps };

        // 插入排序測試
        const insertionStart = performance.now();
        let insertionComparisons = 0;
        let insertionMoves = 0;

        for (let i = 1; i < arrays.insertion.length; i++) {
            const key = arrays.insertion[i];
            let j = i - 1;
            while (j >= 0 && arrays.insertion[j] > key) {
                insertionComparisons++;
                arrays.insertion[j + 1] = arrays.insertion[j];
                insertionMoves++;
                j--;
            }
            if (j >= 0) insertionComparisons++;
            arrays.insertion[j + 1] = key;
            insertionMoves++;
        }
        const insertionTime = performance.now() - insertionStart;
        sortResults.insertion = { time: insertionTime, comparisons: insertionComparisons, moves: insertionMoves };

        // 合併排序測試
        const mergeStart = performance.now();
        let mergeComparisons = 0;

        function merge(left, right) {
            const result = [];
            let i = 0, j = 0;
            while (i < left.length && j < right.length) {
                mergeComparisons++;
                if (left[i] <= right[j]) {
                    result.push(left[i++]);
                } else {
                    result.push(right[j++]);
                }
            }
            return result.concat(left.slice(i)).concat(right.slice(j));
        }

        function mergeSort(arr) {
            if (arr.length <= 1) return arr;
            const mid = Math.floor(arr.length / 2);
            const left = mergeSort(arr.slice(0, mid));
            const right = mergeSort(arr.slice(mid));
            return merge(left, right);
        }

        mergeSort(arrays.merge);
        const mergeTime = performance.now() - mergeStart;
        sortResults.merge = { time: mergeTime, comparisons: mergeComparisons };

        // 快速排序測試
        const quickStart = performance.now();
        let quickComparisons = 0;

        function quickSort(arr, low = 0, high = arr.length - 1) {
            if (low < high) {
                const pi = partition(arr, low, high);
                quickSort(arr, low, pi - 1);
                quickSort(arr, pi + 1, high);
            }
        }

        function partition(arr, low, high) {
            const pivot = arr[high];
            let i = low - 1;
            for (let j = low; j < high; j++) {
                quickComparisons++;
                if (arr[j] <= pivot) {
                    i++;
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
            }
            [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
            return i + 1;
        }

        quickSort(arrays.quick);
        const quickTime = performance.now() - quickStart;
        sortResults.quick = { time: quickTime, comparisons: quickComparisons };

        // 輸出結果
        console.log(`氣泡排序: ${sortResults.bubble.time.toFixed(2)}ms, 比較: ${sortResults.bubble.comparisons}, 交換: ${sortResults.bubble.swaps}`);
        console.log(`選擇排序: ${sortResults.selection.time.toFixed(2)}ms, 比較: ${sortResults.selection.comparisons}, 交換: ${sortResults.selection.swaps}`);
        console.log(`插入排序: ${sortResults.insertion.time.toFixed(2)}ms, 比較: ${sortResults.insertion.comparisons}, 移動: ${sortResults.insertion.moves}`);
        console.log(`合併排序: ${sortResults.merge.time.toFixed(2)}ms, 比較: ${sortResults.merge.comparisons}`);
        console.log(`快速排序: ${sortResults.quick.time.toFixed(2)}ms, 比較: ${sortResults.quick.comparisons}`);

        results.push({
            size: size,
            bubble: sortResults.bubble,
            selection: sortResults.selection,
            insertion: sortResults.insertion,
            merge: sortResults.merge,
            quick: sortResults.quick
        });
    }

    console.log('\n=== 測試完成 ===');
    console.log('複製以下數據到報告中：');
    console.log(JSON.stringify(results, null, 2));

    return results;
}

// 運行測試
runPerformanceTest();