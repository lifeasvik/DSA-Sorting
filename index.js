/*

1) Understanding Merge Sort

  21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40

  a) Resulting list after 3 recursive calls?
      21, 1, 26, 45, 29, 28, 2, 9, 16, 49, 39, 27, 43, 34, 46, 40
                /                                     \
      21, 1, 26, 45, 29, 28, 2, 9         16, 49, 39, 27, 43, 34, 46, 40
        /                  \                    /                     \
   21, 1, 26, 45       29, 28, 2, 9      16, 49, 39, 27           43, 34, 46, 40
    /       \           /        \           /        \             /          \
21, 1     26, 45     29, 28      2, 9     16, 49,    39, 27      43, 34,     46, 40


  b) Resulting list after 16 recursive calls?

  c) What are the first 2 lists to be merged?
    21 and 1
  d) Which two lists would be merged on the 7th merge?
    43 and 34

2) Understanding Quicksort

Going in ascending...
After first partition step: 3 9 1 14 17 24 22 20

  a) Explain what could be the pivot

    The pivot could have been either 14 or 17 because everything to the left
    is less than and everything right is greater than the pivot

  b) 14, 17, 13, 15, 19, 10, 3, 16, 9, 12 
     Show the resulting list after the second partitioning...

                  LAST ITEM AS PIVOT  
          14, 17, 13, 15, 19, 10, 3, 16, 9, 12
                 /                 \
           10, 9, 3         14, 17, 13, 15, 19, 16
            /   \               /           \
          {}   10, 9       14, 13, 15     17, 19


                  FIRST ITEM AS PIVOT  
          14, 17, 13, 15, 19, 10, 3, 16, 9, 12
                    /                 \
          13, 10, 3, 9, 12        17, 15, 19, 16
            /         \             /         \
      10, 3, 9, 12    {}          15, 16      19
*/

const LinkedList = require('./LinkedList');

function qSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }

  const middle = partition(array, start, end)
  array = qSort(array, start, middle)
  array = qSort(array, middle + 1, end)
  return array
}

function partition(array, start, end) {
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++
    }
  }
  swap(array, end - 1, j);
  return j
}

function swap(array, i, j) {
  const tmp = array[i];
  array[i] = j;
  array[j] = tmp;
}


function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  // console.log(left, right)

  left = mergeSort(left);
  right = mergeSort(right);

  return merge(left, right, array)
}

function merge(left, right, array) {
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i]
  }
  return array
}

function bucketSort(array, low, high) {
  const result = new Array(high - low + 1);
  for (let i = 0; i < array.length; i++) {
    result[array[i] - low] = (result[array[i] - low] || 0) + 1;
  };
  return result;
};


function shuffle(array) {
  array.forEach((num, i) => {
    const newPos = Math.floor(Math.random() * (array.length - 0))
    array[i] = array[newPos]
    array[newPos] = num
  })
  return array
}

function main() {
  // const array = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5]
  console.log(shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]))
  console.log(mergeSort(['Zello', 'X', 'Hello', 'Its me', 'Ya boi Dan']))
}

main();