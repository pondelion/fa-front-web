
export const keyListData2DictListData = (data: any) => {
  const keys: string[] = Object.keys(data);
  const minDataLen = Math.min(...keys.map((key: any) => data[key].length));
  const dictListData: any = [...Array(minDataLen)].map((v, idx) => {
    const d: any = {};
    keys.forEach(key => {
      d[key] = data[key][idx];
    })
    return d;
  });
  return dictListData;
}

export const dictListData2KeyListData = (data: any) => {
  
}
