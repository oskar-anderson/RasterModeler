const app = new PIXI.Application();

async function load() {
    app.loader.add('../wwwroot/font/ps2p/consolas-14-xml-white-text-with-alpha-padding0-spacing1.fnt');

    return new Promise((resolve, reject) => {
        app.loader.onComplete.add(() => {
            resolve();
        })
        app.loader.onError.add(() => {
            reject();
        })
        app.loader.load();
    });
}

async function main() {
    await load();
    renderScreen();

    app.renderer.plugins.extract.canvas(app.stage).toBlob((blob) => {
        const a = document.createElement('a');
        document.body.append(a);
        a.download = `RasterModeler_${dayjs().format('YYYY-MM-DD-HH-mm-ss')}_screenshot`;
        a.href = URL.createObjectURL(blob);
        a.click();
        a.remove();
    }, 'image/png');
    app.destroy();
}


function renderScreen() {
    /* // uncomment code block for white background color, otherwise background is transparent
    let graphics = new PIXI.Graphics(); 
    graphics.beginFill(0xffffff);
    graphics.drawRect(0, 0, schema.worldCharWidth * 7, schema.worldCharHeight * 14);
    graphics.endFill();
    app.stage.addChild(graphics); 
    */
    for (let y = 0; y < schema.worldCharHeight; y++) {
        for (let x = 0; x < schema.worldCharWidth; x++) {
            let tile = schema.worldDrawArea[y * schema.worldCharWidth + x];
            if (tile.char === " ") { continue; }
            let bitmapText = new PIXI.BitmapText(tile.char,
                {
                    fontName: "Consolas",
                    tint: tile.color
                });
            bitmapText.x = x * 7;
            bitmapText.y = y * 14;
            app.stage.addChild(bitmapText);
        }
    }
}

RESULT_LOG.push("This could take a while...");
main();