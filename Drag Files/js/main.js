"use strict";

let dropWrapper = document.querySelector('.dropWrapper');

dropWrapper.addEventListener("dragover", function(e){
    e.preventDefault();

    dropWrapper.classList.add("active");    

    return false;
})

dropWrapper.addEventListener("dragleave", function(e){
    dropWrapper.classList.remove("active");    
})

dropWrapper.addEventListener("drop", function(e){
    e.preventDefault();
    
    FillTable(e.dataTransfer.files);

    dropWrapper.classList.remove("active");    
})


function FillTable(images) {

    let totalSize = 0;

    for (const file of images) {
        
        if (file.type.match("image*")) {
            const tr = document.createElement('tr');

            //FileReader for reading files
            const reader = new FileReader();

            reader.onload = function (readerEvent) {
                let imageTd = document.createElement('td');
                const img = document.createElement('img');
                img.src = readerEvent.target.result;
                img.width = 200;
                img.height = 200;

                imageTd.appendChild(img);
                tr.insertBefore(imageTd, tr.firstChild);
            }

            reader.readAsDataURL(file);

            const nameTd = document.createElement('td');
            nameTd.innerText = file.name;

            const sizeTd = document.createElement('td');
            sizeTd.innerText = (+file.size / 1024).toFixed(2) + " kb";

            const dateTd = document.createElement('td');
            dateTd.innerText = (new Date(file.lastModified)).toString();

            const typeTd = document.createElement('td');
            typeTd.innerText = file.type;

            const deleteTd = document.createElement('td');

            const icon = document.createElement('i');
            icon.className = "fas fa-times";
            icon.onclick = function(){
                this.parentElement.parentElement.remove();
            }

            totalSize += file.size;

            deleteTd.appendChild(icon);

            tr.appendChild(nameTd);
            tr.appendChild(sizeTd);
            tr.appendChild(dateTd);
            tr.appendChild(typeTd);
            tr.appendChild(deleteTd);

            document.querySelector('#mainTable tbody').appendChild(tr);
            document.querySelector('#mainTable').classList.remove("d-none");
        }
    }

    const tr = document.createElement('tr');

    const countTd = document.createElement('td');
    countTd.innerText = "Total count: " + images.length;
    countTd.colSpan = 3;

    const sizeTd = document.createElement('td');
    sizeTd.innerText = "Total size (kb): " + (totalSize/1024).toFixed(2);
    sizeTd.colSpan = 3;

    tr.appendChild(countTd);
    tr.appendChild(sizeTd);
    document.querySelector('#mainTable tbody').appendChild(tr);

}
