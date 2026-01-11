/**
 * ss → mm:ssに変換
 * @param {*} time
 * @returns
 */
export const convertMmSs = (time) => {
    const min = Math.floor(Number(time) / 60);
    const scd = Number(time) % 60;
    return [min, scd];
};

/**
 * mm:ss → ssに変換
 * @param {number[]} time
 * @returns
 */
export const convertSs = (time) => {
    if (time.length !== 2) {
        return;
    }
    const min = Number(time[0]) * 60;
    const scd = Number(time[1]);

    return min + scd;
};
