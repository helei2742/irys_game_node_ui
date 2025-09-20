export function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // 月
    const dd = String(date.getDate()).padStart(2, '0');      // 日
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
}


/**
 * 导出为csv
 * @param data
 * @param headers
 * @param filename
 */
export function exportToCSV(data, headers, filename = 'data.csv') {
    const rows = [headers, ...data.map(row => headers.map(key => row[key]))]
    const csvContent = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\r\n')
    const blob = new Blob([`\uFEFF${csvContent}`], {type: 'text/csv;charset=utf-8;'})

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
}


/**
 * 获取对象数组的字段数组
 * @param data
 */
export function generateObjectArrayFieldArray(data: Array<Record<never, never>>) {
    // 用 Set 去重所有 key
    const allKeysSet = new Set()

    data.forEach(obj => {
        Object.keys(obj).forEach(key => allKeysSet.add(key))
    })

    // 转为数组
    return Array.from(allKeysSet)
}



/**
 * 扁平化对象
 * @param obj
 */
export function flattenObject(obj: never): Record<string, never> {
    const result: Record<string, never> = {}

    for (const key in obj) {
        if (obj[key] instanceof Map) {
            // 处理 Map 类型
            obj[key].forEach((value: never, mapKey: never) => {
                result[mapKey] = value
            })
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            // 递归处理嵌套对象
            Object.assign(result, flattenObject(obj[key]))
        } else {
            // 普通属性
            result[key] = obj[key]
        }
    }

    return result
}
