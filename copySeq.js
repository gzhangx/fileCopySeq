const fs = require('fs');
const path = require('path');
const {sortBy} = require('lodash');
function doCopy() {
    const from = process.argv[2];
    const to = process.argv[3];
    if (!from) {
        console.log('must specify from');
        return;
    }
    if (!to) {
        console.lgo('must specify to');
        return;
    }

    if (!fs.existsSync(to)) {
        console.log(`creating directory ${to}`);
        fs.mkdirSync(to);
    }
    if (!fs.lstatSync(to).isDirectory() ) {
        console.log(`Not directory ${to}`);
        return;
    }

    const files = sortBy(fs.readdirSync(from) );

    console.log(`copying from ${from} to ${to}`);
    files.forEach((file,i)=>{
        const fullPath = path.join(from, file);
        const toFullPath = path.join(to, `IMG_${i+1}.jpeg`);
        if (fs.existsSync(toFullPath)) {
            fs.unlinkSync(toFullPath);
        }
        console.log(`copy ${fullPath} -> ${toFullPath}`);
        fs.copyFileSync(fullPath, toFullPath);
    });

    console.log(`ffmpeg.exe -start_number 1 -framerate 10 -i ${to}\\IMG_%d.jpeg out.mp4`)

}

doCopy();