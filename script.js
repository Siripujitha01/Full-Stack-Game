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

let imagePath=(frame,animation)=>{
    return "/images/"+animation+"/"+frame+".png";
}
let frames={
    idle:[1,2,3,4,5,6,7,8],
    kick:[1,2,3,4,5,6,7],
    punch:[1,2,3,4,5,6,7],

};
let loadImages=(callback)=>{
    let imageload=0;
    let image={idle:[],kick:[],punch:[]};
    ["idle","kick","punch"].forEach((animation)=>{
        let animationFrame=frames[animation];
        imageload=imageload+animationFrame.length;
        animationFrame.forEach((frame)=>{
        let path=imagePath(frame,animation);
        loadImage(path,(imag)=>{
          image[animation][frame-1]=imag;
          imageload=imageload-1;
          if(imageload===0)
          {
              callback(image);
          }
        });
    });
    });
};
let animate=(c,image,animation,callback)=>{
    image[animation].forEach((image,index)=>{
        setTimeout(()=>{
            c.clearRect(0,0,500,500);
           c.drawImage(image,0,0,500,500);
        },index*100);
    });
    setTimeout(callback,image.length*100);
};
loadImages((image)=>{
    let queued=[];
    let aux=()=>
    {
        let selected;
        if(queued.length===0)
         selected="idle";
        else
          selected=queued.shift(); 
        animate(c,image,selected,aux);
};
aux();
document.getElementById("kick").onclick=()=>{
queued.push("kick");
};
document.getElementById("punch").onclick=()=>{
    queued.push("punch");
};
document.addEventListener("keyup",(event)=>{
    const key=event.key;
    if(key==="ArrowLeft")
    {
        queued.push("kick");
    }
    else if(key==="ArrowRight")
    {
        queued.push("punch");
    }
});
});
 