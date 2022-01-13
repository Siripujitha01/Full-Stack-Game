let can=document.getElementById("canvas");
let c=can.getContext("2d");

let loadImage=(src,callback)=>{
    let img=document.createElement("img");
    img.onload=()=>callback(img);
    img.src=src;
};
loadImage("/images/idle/1.png",(img)=>{
    c.drawImage(img,0,0,500,500);
})

let imagePath=(frame)=>{
    return "/images/idle/"+frame+".png";
}
let loadImages=(callback)=>{
    let imageload=8;
    let image=[];
    [1,2,3,4,5,6,7,8].forEach((frame)=>{
        let path=imagePath(frame);
        loadImage(path,(imag)=>{
          image[frame-1]=imag;
          imageload=imageload-1;
          if(imageload===0)
          {
              callback(image);
          }
        });
    });
};
let animate=(c,image,callback)=>{
    image.forEach((image,index)=>{
        setTimeout(()=>{
            c.clearRect(0,0,500,500);
           c.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,image.length*100);
};
loadImages((image)=>{
 animate(c,image,()=>{console.log("done");});
});