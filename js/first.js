var websiteInp = document.getElementById('nameInp');
var websiteUrlInp = document.getElementById('urlInp');
var Btn = document.getElementById('addBtn');
var currentIndex = 0;

Btn.addEventListener('click',function(){
    if(Btn.innerHTML=='Submit')
    {
        addWebsite();
    }
    else
    {
        saveUpdate();
    }
})

if(localStorage.getItem('myWebsitelist')==null)
{
    websiteList = [];
}
else
{
    websiteList = JSON.parse(localStorage.getItem('myWebsitelist'));
    display();
}

function saveUpdate(){
    var web = {
        name:websiteInp.value,
        url:websiteUrlInp.value
    }
    websiteList[currentIndex]=web;
    localStorage.setItem('myWebsitelist',JSON.stringify(websiteList))
    display();
    clear();
    Btn.innerHTML = 'Submit';
}

function addWebsite(){
    var web = {
        name:websiteInp.value,
        url:websiteUrlInp.value
    }
    websiteList.push(web);
    localStorage.setItem('myWebsitelist',JSON.stringify(websiteList))
    display();
    clear();
}

function display(){
    var box = '';
    for(var i=0 ; i<websiteList.length ; i++)
    {
        box+=`<tr><td>`+websiteList[i].name+`</td>
        <td>`+websiteList[i].url+`</td>
        <td><button onclick='deleteWebsite(`+i+`)' class='btn btn-danger'>delete</button></td>
        <td><button onclick='updateWebsite(`+i+`)' class='btn btn-warning'>update</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = box;
}

function clear(){
    websiteInp.value = ``;
    websiteUrlInp.value = ``;
}

function search(term){
    var box = ``;
    var result = ``;
    var newTxt = ``;
    for(var i=0 ; i<websiteList.length ; i++)
    {
        if(websiteList[i].name.toLowerCase().trim().includes(term.toLowerCase().trim())==true)
        {
            box+=`<tr><td>`+websiteList[i].name+`</td>
            <td>`+websiteList[i].url+`</td>
            <td><button onclick='deleteWebsite(`+i+`)' class='btn btn-danger'>delete</button></td>
            <td><button onclick='updateWebsite(`+i+`)' class='btn btn-warning'>update</button></td>
            </tr>`;
            newTxt = websiteList[i].name.toLowerCase().replace(term,`<span style="color:red">`+term+`</span>`)
            if(term!=``)
        {
            result+=`<p>`+newTxt+`</p>`;
            document.getElementById('result').style.padding='1rem';
        }
        else{
            result=``;
            document.getElementById('result').style.padding='0';
        }
        }
    }
    document.getElementById('tableBody').innerHTML = box;
    document.getElementById('result').innerHTML = result;
    
}


function deleteWebsite(index){
    websiteList.splice(index,1);
    localStorage.setItem('myWebsitelist',JSON.stringify(websiteList))
    display();
}

function updateWebsite(index){
currentIndex = index;
websiteInp.value = websiteList[index].name;
websiteUrlInp.value = websiteList[index].url;
Btn.innerHTML = 'Update';
}




