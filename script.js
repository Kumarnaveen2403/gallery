let plus = document.querySelector("#plus");
let imgListContainer = document.querySelector(".img-list-container");
let previewImageContainer = document.querySelector(".preview-img-container");

let imagesArr = [];
let cid = 0;

let leftArrow = document.querySelector("#left");
let rightArrow = document.querySelector("#right");
let deleteButton = document.querySelector("#delete");

plus.addEventListener("click", function () {
    let imgLink = prompt("please enter img url");
    if (imgLink == null || imgLink == "") {
        alert("Please enter img src");
        return;
    }
    addImageToListandShow(imgLink)
    //    add image to List & add Image to show container
});

leftArrow.addEventListener("click", function(){
    let previewImg = document.querySelector("#final-image");
    let currCid = parseInt(previewImg.getAttribute("cid"));

    let cIdx = imagesArr.findIndex( el => el.cid == currCid);

    let prevIdx = cIdx == 0 ? imagesArr.length - 1 : cIdx - 1;
    let imageObj = imagesArr[prevIdx];

    addImageToPreview(imageObj.url, imageObj.cid);
});

rightArrow.addEventListener("click", function(){
    let previewImg = document.querySelector("#final-image");
    let currCid = parseInt(previewImg.getAttribute("cid"));

    let cIdx = imagesArr.findIndex( el => el.cid == currCid);

    let nextIdx = (cIdx + 1) % imagesArr.length ;
    let imageObj = imagesArr[nextIdx];

    addImageToPreview(imageObj.url, imageObj.cid);
});

deleteButton.addEventListener("click", function(){
    let previewImg = document.querySelector("#final-image");
    let currCid = parseInt(previewImg.getAttribute("cid"));

    let cIdx = imagesArr.findIndex( el => el.cid == currCid);

    let imageInList = document.querySelector(`[cid="${currCid}"]`);
    imageInList.remove();

    previewImageContainer.innerHTML = "";

    imagesArr.splice(cIdx, 1);
    console.log(imagesArr);

});

function addImageToListandShow(imgLink) {
    let previewImg = document.createElement("img");
    previewImg.setAttribute("src", imgLink);
    previewImg.addEventListener("click", showImageInPreview);
    previewImg.setAttribute("class", "img_preview");
    previewImg.setAttribute("cid", cid);
    imgListContainer.appendChild(previewImg);

    addImageToPreview(imgLink, cid);
    imagesArr.push({
        cid : cid,
        url : imgLink
    });
    cid++;
}

function showImageInPreview() {
    let clickedImage = this;
    let cid = parseInt(clickedImage.getAttribute("cid"));
    let link = clickedImage.getAttribute("src");
    addImageToPreview(link, cid);
}

function addImageToPreview(link, cid) {
    let imageTag =`<img id="final-image" src=${link} cid="${cid}"> `
    // img show -> replace 
    previewImageContainer.innerHTML = imageTag;
}