export const deepUpdate = (original, keys, value) => {
    //  updates original object, creates new entries if not exist
    //  const a = {hi:{bye:3},second:3} -> deepUpdate(a, ['hi','ciao','bird'], 3) -> {hi:{bye:3},second:3,ciao:{bird:3}}
    if (keys.length === 0) {
        return value;
    }
    const currentKey = keys[0];
    if (Array.isArray(original)) {
        return original.map((v, index) => (index === currentKey ? deepUpdate(v, keys.slice(1), value) : v));
    } else if (typeof original === "object" && original !== null) {
        if (keys.length === 1) {
            original[currentKey] = value;
        }
        if (!Object.keys(original).includes(currentKey) || (!original[currentKey] && (original[currentKey] ?? true))) {
            original[currentKey] = {};
        }
        return Object.fromEntries(
            Object.entries(original).map((keyValuePair) => {
                const [k, v] = keyValuePair;
                if (k === currentKey) {
                    return [k, deepUpdate(v, keys.slice(1), value)];
                } else {
                    return keyValuePair;
                }
            })
        );
    } else {
        // Primitive value
        return original;
    }
};
