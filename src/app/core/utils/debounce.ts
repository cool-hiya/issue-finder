export default function debounce(func: Function, wait: number, immediate?: boolean) {
    let timeout;

    return function () {
        let context = this, args = arguments;

        clearTimeout(timeout);

        timeout = setTimeout(function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
}