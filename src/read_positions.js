
const readMousePoints = async( reader) => {
  while(true) {
    const {value} = await reader.read();
    if (value[3] === 35) {
      const col = Math.floor((value[4] - 32) / 2);
      const row = value[5] - 33;
      return [col, row];
    }
  }
}

export const readPositions = async(color) => {
  Deno.stdin.setRaw(true , {cbreak : true});
  const writer = Deno.stdout.writable.getWriter();
  const reader = Deno.stdin.readable.getReader( );
  const encoder = new TextEncoder();
  writer.write(encoder.encode('\x1b[?1000h'));
  const [col , row] =  await readMousePoints(  reader);
  writer.releaseLock();
  reader.releaseLock();
  if (color === 'white') return [col, row];
  return [7 - col, 7 - row];
}