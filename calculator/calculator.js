/*
* 计算器demo
* 修复浮点数计算精确度问题
*/
$(function() {
	var memory = 0;
	var memorycalc;
	var c = false;//清除标记
	var flag = false;//浮点标记
var screen = function(p) {
	if(p == '.' && flag == true){
		return;
	}
	if(c == true){
		$('#screen').val('');
		c = false;
	}
	var r = $('#screen').val() + p;
	if(p == '.'){
		flag = true;
	} else {
		r = r * 1;
	}
	$('#screen').val(r);
}
var calculate = function(p) {
	if(memory){
		result();	
	}
	flag = false;
	c = true; 
	memory = $('#screen').val();
	memorycalc = p;
}
$('#clear').click(function (){
	memory = 0;
	$('#screen').val("0");
});
$('#sign').click(function (){
	$('#screen').val($('#screen').val() * -1);
});
$('#backspace').click(function (){
	var len = $('#screen').val().length;
	$('#screen').val($('#screen').val().substring(0, len -1));
	if($('#screen').val().length == 0)
		$('#screen').val(0);
});
var result = function(){
	if(memory == 0)
	return;
	c = true;
	var r;
	var num2 = $('#screen').val();
	switch(memorycalc){
		case '+':
			r = accAdd(memory,num2);
		break;
		case '-':
			r = accSub(memory,num2);
		break;
		case '*':
			r = accMul(memory,num2);
		break;
		case '/':
			r = accDiv(memory,num2);
		break;
	}
	screen(r);
	c = true;
	flag = false;
	memory = 0;
};
$('.digit').click(function(e) {
	screen(e.target.value);
});
$('.operator').click(function(e) {
	calculate(e.target.value);
});
$('#equal').click(function() {
	result();
});

//加法函数
function accAdd(arg1,arg2){
	var r1,r2,m;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m+arg2*m)/m;
}  
  
//减法函数  
function accSub(arg1,arg2){  
	var r1,r2,m;  
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}  
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}  
	m=Math.pow(10,Math.max(r1,r2))
	return (arg1*m-arg2*m)/m;
}  
  
//乘法函数  
function accMul(arg1,arg2)
{
	var m=0,s1=arg1.toString(),s2=arg2.toString();
	try{m+=s1.split(".")[1].length}catch(e){}
	try{m+=s2.split(".")[1].length}catch(e){}
	return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m);
}
  
//除法函数  
function accDiv(arg1,arg2){
	var t1=0,t2=0,r1,r2;
	try{t1=arg1.toString().split(".")[1].length}catch(e){}
	try{t2=arg2.toString().split(".")[1].length}catch(e){}
	with(Math){
	r1=Number(arg1.toString().replace(".",""))
	r2=Number(arg2.toString().replace(".",""))
	return (r1/r2)*pow(10,t2-t1);
	}  
}

});