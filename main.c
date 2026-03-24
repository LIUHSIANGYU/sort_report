#include <stdio.h>
#include <time.h>

/* 
 * 氣泡排序法 (Bubble Sort)
 * 通過不斷比較相鄰的元素，將較大的元素逐步交換到陣列的末尾
 */

// 交換兩個變數的值
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

// 基礎氣泡排序法
void bubbleSort(int arr[], int n) {
    // 外層迴圈：控制排序次數
    for (int i = 0; i < n - 1; i++) {
        // 內層迴圈：比較相鄰元素
        for (int j = 0; j < n - i - 1; j++) {
            // 如果前一個元素大於後一個元素，則交換
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
            }
        }
    }
}

// 優化版氣泡排序法（加入早期終止條件）
void bubbleSortOptimized(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        int swapped = 0;  // 標記是否發生交換
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(&arr[j], &arr[j + 1]);
                swapped = 1;  // 標記已發生交換
            }
        }
        // 如果沒有發生交換，表示陣列已排序完成
        if (swapped == 0) {
            break;
        }
    }
}

// 列印陣列
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    printf("========== 氣泡排序法 (Bubble Sort) ==========\n\n");
    
    // 測試陣列 1：隨機順序
    int arr1[] = {64, 34, 25, 12, 22, 11, 90};
    int n1 = sizeof(arr1) / sizeof(arr1[0]);
    
    printf("測試 1：基礎氣泡排序\n");
    printf("排序前：");
    printArray(arr1, n1);
    bubbleSort(arr1, n1);
    printf("排序後：");
    printArray(arr1, n1);
    
    // 測試陣列 2：已排序完成
    int arr2[] = {1, 2, 3, 4, 5};
    int n2 = sizeof(arr2) / sizeof(arr2[0]);
    
    printf("\n測試 2：優化版氣泡排序 (已排序的陣列)\n");
    printf("排序前：");
    printArray(arr2, n2);
    bubbleSortOptimized(arr2, n2);
    printf("排序後：");
    printArray(arr2, n2);
    
    // 測試陣列 3：反序排列
    int arr3[] = {9, 7, 5, 3, 1};
    int n3 = sizeof(arr3) / sizeof(arr3[0]);
    
    printf("\n測試 3：優化版氣泡排序 (反序的陣列)\n");
    printf("排序前：");
    printArray(arr3, n3);
    bubbleSortOptimized(arr3, n3);
    printf("排序後：");
    printArray(arr3, n3);
    
    // 複雜度討論
    printf("\n========== 時間複雜度分析 ==========\n");
    printf("最壞情況 (Worst Case): O(n²)\n");
    printf("  - 陣列完全反序排列\n");
    printf("  - 需要進行 (n-1) + (n-2) + ... + 1 = n(n-1)/2 次比較\n\n");
    
    printf("平均情況 (Average Case): O(n²)\n");
    printf("  - 隨機排列的陣列\n");
    printf("  - 仍然需要約 n²/4 次比較\n\n");
    
    printf("最好情況 (Best Case): O(n)\n");
    printf("  - 陣列已排序或幾乎排序\n");
    printf("  - 使用優化版本可以只需 n-1 次比較\n\n");
    
    printf("空間複雜度: O(1)\n");
    printf("  - 只需要常數空間用於臨時變數\n");
    printf("  - 是 In-place 排序演算法\n\n");
    
    printf("========== 特點 ==========\n");
    printf("優點：\n");
    printf("  ✓ 實現簡單易懂\n");
    printf("  ✓ 空間複雜度低 (O(1))\n");
    printf("  ✓ 穩定排序（相同元素的相對順序不變）\n");
    printf("  ✓ 對小規模或接近排序的陣列較有效\n\n");
    
    printf("缺點：\n");
    printf("  ✗ 時間複雜度高 (O(n²))\n");
    printf("  ✗ 對大規模陣列不適用\n");
    printf("  ✗ 效率遠低於快速排序等演算法\n");
    
    return 0;
}
