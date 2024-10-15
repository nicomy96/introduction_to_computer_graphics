// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.

function composite( bgImg, fgImg, fgOpac, fgPos )
{
    if(fgPos.x >= bgImg.width || fgPos.y >= bgImg.height){
        return;
    }
    let xbg = fgPos.x < 0 ?  0 : fgPos.x;
    let ybg = fgPos.y < 0 ?  0 : fgPos.y;
    let xfg= fgPos.x < 0 ?  -fgPos.x : 0;
    let yfg= fgPos.y < 0 ?  -fgPos.y : 0;

    for(var x = xfg; x < fgImg.width && xbg < bgImg.width; x++, xbg++){
        for(var y = yfg; y < fgImg.height && ybg < bgImg.height; y++, ybg++){
            let bgIndex = xbg * 4 + ybg * bgImg.width * 4;
            let fgIndex = (x + y * fgImg.width) * 4;
            for(let color = 0; color < 4; color++){
                bgImg.data[bgIndex + color] = fgImg.data[fgIndex + color] * fgOpac + (1 - fgOpac) * bgImg.data[bgIndex + color];
            }
        }
        ybg = fgPos.y < 0 ?  0 : fgPos.y;
    }
}
