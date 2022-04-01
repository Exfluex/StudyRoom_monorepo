


export const handler = (rawevent: any, context: any, callback: any) => {
  let event = JSON.parse(rawevent);
  callback(null, { event, context });
}
