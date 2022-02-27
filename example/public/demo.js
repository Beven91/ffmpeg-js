const play = o => {
  const source = o.context.createBufferSource();
  source.buffer = o.audioBuffer;
  source.connect(o.context.destination);
  source.start();
};

document.getElementById('play').onclick = async () => {
  // for (const name of ['valid.wma', 'valid.mp4', 'invalid.aac']) {
  //   await window.decoder.decode({
  //     name,
  //     href: '../inputs/' + name
  //   }).then(o => {
  //     console.log(name, o);
  //     play(o);
  //   }).catch(e => console.error('Decoding Error', e))
  // }
};


function handleAudioFiles(files) {
  const reader = new FileReader();
  const file = files[0];
  reader.onload = function () {
    var buffer = new Uint8Array(this.result);
    FS.writeFile(file.name, buffer);
    const id = 'ffmpeg_callback_' + Date.now();
    window[id] = function (data) {
      console.log(data);
    }
    module.decode(file.name, id)
  }
  reader.readAsArrayBuffer(file);
}