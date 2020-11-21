var respondTimeout=10000;
function time(){
    return window.performance.now();
    // return new Date().getTime();
}
async function tcping(url){
    var st=time();
    await fetch(url,{mode:'no-cors'});
    return time()-st;
}
function speedtest(url,callBcak){
    var st=time();
    var http=new XMLHttpRequest();
    http.open("GET",url,true);
    http.onreadystatechange=()=>{
        /*
        cut the initialization time can be more accurate (or the speed will show a state of slow climbing)
        but meeting dash 
        if (http.readyState == 2)
            started = window.performance.now() 
        */
    }
    http.loadr=0
    http.onloadend=(e)=>{
        var rbytes=(e.loaded==0)?http.loadr:e.loaded // In Firefox, error or timeout will always return 0
        callBcak(rbytes,time()-st);
    }
    http.onprogress=(e)=>{
        var rbytes=e.loaded
        http.loadr=rbytes
        var ms=time()-st;
        if(ms>100) // fix first jump
            speedProgressCallback(rbytes,ms);
    }
    http.timeout = speedTimeout
    http.send()
}