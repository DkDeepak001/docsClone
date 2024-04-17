export const deltaToHTML = (data: string) => {
  if (!data) return 'Empty Document'
  const delta = JSON.parse(data)
  //@ts-ignore
  return delta.ops?.map(function(op) {
    if (typeof op.insert !== 'string' || delta.ops.length === 1 && op.insert === "\n") return 'Empty Document';
    let html = op.insert.replace(/\n/g, '<br>')
    if (op.attributes && op.attributes.bold) {
      html = '<strong>' + html + '</strong>';
    }
    return html;
  }).join('');
};



