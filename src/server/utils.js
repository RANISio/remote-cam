export const log = text => {
  var time = new Date();
  console.log('[' + time.toLocaleTimeString() + '] Server sais: ' + text);
};
