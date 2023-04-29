export function* questionsIterator(arr) {
    let index = 0;
    while (index < arr.length) {
        yield arr[index++];
    }
}
