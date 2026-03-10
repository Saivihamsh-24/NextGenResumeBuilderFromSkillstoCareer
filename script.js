let expCount=0
let certCount=0
let stream

function addExperience(){

expCount++

let div=document.createElement("div")
div.className="expBox"

div.innerHTML=`
<input placeholder="Company" id="company${expCount}" onkeyup="update()">
<input placeholder="Years" id="years${expCount}" onkeyup="update()">
<input placeholder="Role" id="role${expCount}" onkeyup="update()">
`

document.getElementById("experienceContainer").appendChild(div)

}

function addCertificate(){

certCount++

let div=document.createElement("div")
div.className="expBox"

div.innerHTML=`
<input placeholder="Certificate Name" id="cert${certCount}" onkeyup="update()">
<input placeholder="Organization" id="certOrg${certCount}" onkeyup="update()">
`

document.getElementById("certificateContainer").appendChild(div)

}

function update(){

let name=document.getElementById("name").value
let email=document.getElementById("email").value
let phone=document.getElementById("phone").value
let linkedin=document.getElementById("linkedin").value
let github=document.getElementById("github").value
let summary=document.getElementById("summaryInput").value
let edu=document.getElementById("education").value
let skills=document.getElementById("skills").value

document.getElementById("rname").innerText=name
document.getElementById("remail").innerText=email
document.getElementById("rphone").innerText=phone

document.getElementById("rlinkedin").href=linkedin
document.getElementById("rlinkedin").innerText=linkedin ? "LinkedIn Profile" : ""

document.getElementById("rgithub").href=github
document.getElementById("rgithub").innerText=github ? "GitHub Profile" : ""

document.getElementById("summary").innerText=summary
document.getElementById("reducation").innerText=edu
document.getElementById("rskills").innerText=skills

calculateScore()
checkATS()
spellCheck()

}

function calculateScore(){

let score=0
let fields=["name","email","phone","education","skills"]

fields.forEach(id=>{
if(document.getElementById(id).value!=""){
score+=20
}
})

document.getElementById("strength").style.width=score+"%"
document.getElementById("scoreText").innerHTML="Resume Score: <b>"+score+"/100</b>"

}

function checkATS(){

let skills=document.getElementById("skills").value.toLowerCase()
let keywords=["html","css","javascript","react","java","python","sql"]

let found=0

keywords.forEach(k=>{
if(skills.includes(k)) found++
})

let score=(found/keywords.length)*100

document.getElementById("atsScore").innerHTML="ATS Match Score: <b>"+Math.round(score)+"%</b>"

}

function spellCheck(){

let text=document.getElementById("education").value
let mistakes=[]

if(text.includes("teh")) mistakes.push("teh → the")
if(text.includes("recieve")) mistakes.push("recieve → receive")
if(text.includes("adress")) mistakes.push("adress → address")

document.getElementById("spellCheck").innerHTML=
mistakes.length ? "Possible typos:<br>"+mistakes.join("<br>") : "No spelling issues detected"

}

function analyzeResume(){

let feedback=[]

let email=document.getElementById("email").value
let phone=document.getElementById("phone").value
let skills=document.getElementById("skills").value
let education=document.getElementById("education").value

if(!email.includes("@")){
feedback.push("⚠ Use a valid professional email")
}

if(phone.length<10){
feedback.push("⚠ Phone number may be incomplete")
}

if(skills.split(",").length<3){
feedback.push("⚠ Add more technical skills")
}else{
feedback.push("✔ Good skill diversity")
}

if(education.length<20){
feedback.push("⚠ Education description too short")
}else{
feedback.push("✔ Education section looks good")
}

document.getElementById("aiFeedback").innerHTML=feedback.join("<br>")

}

function shareResume(){

let data={
name:document.getElementById("name").value,
email:document.getElementById("email").value
}

let encoded=btoa(JSON.stringify(data))
let link=location.href.split("?")[0]+"?resume="+encoded

navigator.clipboard.writeText(link)

alert("Share link copied to clipboard!")

}

function toggleMode(){
document.body.classList.toggle("dark")
}

function loadPhoto(event){
document.getElementById("photo").src=URL.createObjectURL(event.target.files[0])
}

function startCamera(){

navigator.mediaDevices.getUserMedia({video:true})
.then(function(s){

stream=s
document.getElementById("camera").srcObject=s

})
.catch(()=>{
alert("Camera permission denied")
})

}

function capturePhoto(){

let video=document.getElementById("camera")
let canvas=document.getElementById("canvas")
let ctx=canvas.getContext("2d")

canvas.width=video.videoWidth
canvas.height=video.videoHeight

ctx.drawImage(video,0,0)

document.getElementById("photo").src=canvas.toDataURL("image/png")

stream.getTracks().forEach(track=>track.stop())

}