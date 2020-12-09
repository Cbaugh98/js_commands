/**
 * 
 * @param {String} name 
 * @param {String} url 
 */
function url(name,url) {
this.name = name;
this.url = url.trim();
this.breadCrumbs = getBreadCrumbs();

function getBreadCrumbs() {
    if(url.indexOf('https://')===-1) {
        const urlArr = url.split('/')
        urlArr[0]='';
        bc = urlArr.toString();
        return bc;
    }    
}
}

let mc3 = new url('mc3','mc3.edu/url/adf/dasfs/dsf');
console.log({mc3});
let mc32 = new url('mc32', 'https://'+mc3.url);
console.log({mc32})
