import{e as v,c as b,d as y}from"./client.0jORRY1u.js";const t=document.getElementById("add-project-form"),E=document.getElementById("add-person-btn"),i=document.getElementById("additional-persons-container"),o=document.getElementById("submit-btn");let a=2;E.addEventListener("click",()=>{a++;const e=document.createElement("div");e.className="person-group dynamic",e.innerHTML=`
        <div class="form-group">
            <label>الاسم (الشخص ${a})</label>
            <input type="text" name="personName">
        </div>
        <div class="form-group">
            <label>البريد الإلكتروني (الشخص ${a})</label>
            <input type="email" name="personEmail">
        </div>
        <div class="remove-btn-container">
          <button type="button" class="btn-remove">إزالة</button>
        </div>
    `,i.appendChild(e)});i.addEventListener("click",e=>{e.target.classList.contains("btn-remove")&&e.target.closest(".person-group.dynamic").remove()});t.addEventListener("submit",async e=>{e.preventDefault(),o.disabled=!0,o.textContent="جارٍ الحفظ...";const m=t.querySelectorAll(".person-group"),c=[],d=[];m.forEach(n=>{const r=n.querySelector('input[name="personName"]'),s=n.querySelector('input[name="personEmail"]');if(r&&s&&r.value.trim()!==""&&s.value.trim()!==""){const u=r.value,l=s.value;c.push({name:u,email:l}),d.push(l)}});const p={projectName:t.projectName.value,projectCode:t.projectCode.value,projectAddress:t.projectAddress.value,supervisors:c,supervisorEmails:d};try{await v(b(y,"projects"),p),window.location.href="/admin/projects"}catch(n){console.error("Error adding document: ",n),alert("حدث خطأ أثناء حفظ المشروع. يرجى المحاولة مرة أخرى."),o.disabled=!1,o.textContent="حفظ المشروع"}});
