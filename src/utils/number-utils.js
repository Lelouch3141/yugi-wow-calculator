/**
 * 数字を二桁表示の文字列で返却する
 * @param {*} number
 * @returns
 */
export const getdoubleDigestNumer = (number) => {
    return ("0" + number).slice(-2);
};
