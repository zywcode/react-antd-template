export const scrollToTop = (dom: any) => {
  dom.scrollTop = 0;
};

export const scrollToBottom = (dom: any) => {
  dom.scrollTop = dom.scrollHeight;
};

export const request = async (promise: any) => {
  return await promise.then((res: any) => [null, res]).catch((err: any) => [err, null]);
}
