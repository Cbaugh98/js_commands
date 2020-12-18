
const { createWorker, createScheduler } = require('tesseract.js');
const Jimp = require('jimp');
const {Team1,Team2,AllStats} = require ('./testdata.json');

const fs = require('fs');
const file = fs.readFileSync('./images/ScreenShot_20-12-07_00-20-10-000.jpg');
(async () => {
const scheduler = createScheduler();

console.log({Team1});
let rectangles = [];
let i =0;
Team1.forEach(hero => {
  rectangles[i++] = hero.rectangle;
});
Team2.forEach(hero => {
  rectangles[i++] = hero.rectangle;
});
let allStats = [];

AllStats.forEach(hero => {
  allStats[0] = hero.rectangle;
});
// //image editing

//   await Jimp.read(file)
//   .then(image => {
//     return image
//     .posterize(10);
//   })
//   .catch(err => {
//     console.error(err);
//   });
// const nfile = await fs.readFileSync('./edited/image.jpg');




  

/////////
/////image handling
// orginal code
 const worker1 = createWorker({
  logger: m => console.log(m)
});
 /////added
 const workers =[worker1];
/**
 * 
 * @param {*} rectangles 
 * @param {*} image 
 */
async function readText(rectangles,image) {

  for (const worker of workers) {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');``
    await worker.setParameters({
      tessedit_pageseg_mode: 7,
      tessedit_char_whitelist: '0123456789-',
      tessedit_ocr_engine_mode: 2
    });
    scheduler.addWorker(worker);
  }
  

  const results = await Promise.all(rectangles.map((rectangle) => (
    scheduler.addJob('recognize', image , {rectangle})
    
    )));

  console.log(results.map(r => r.data.text));
  await scheduler.terminate(); // It also terminates all workers.
};
readText(rectangles,file);
})();
