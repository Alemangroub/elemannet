import{g as $,a as f,b as w,o as D,w as L,d as p,c as y}from"./firebase.CeNGk6Xb.js";const A=$(f),d=w(f);D(A,n=>{n||(window.location.href="/admin")});const g=document.getElementById("unitType"),v=document.getElementById("other-unit-type-group"),h=document.getElementById("otherUnitType");g.addEventListener("change",()=>{g.value==="other"?(v.style.display="block",h.required=!0):(v.style.display="none",h.required=!1)});const c=document.getElementById("installmentsCount"),m=document.getElementById("totalAmount"),E=document.getElementById("installments-container");function b(){const n=parseInt(c.value)||0,o=parseFloat(m.value)||0;if(E.innerHTML="",n>0){const l=(o/n).toFixed(2);for(let t=1;t<=n;t++){const s=document.createElement("div");s.className="installment-entry";const e=new Date;e.setDate(e.getDate()+1),e.setMonth(e.getMonth()+(t-1));const u=e.toISOString().split("T")[0];s.innerHTML=`
                    <div class="installment-header">القسط رقم ${t}</div>
                    <div class="input-group">
                        <label for="installment-amount-${t}">مبلغ القسط</label>
                        <input type="number" step="0.01" id="installment-amount-${t}" value="${l>0?l:"0.00"}" required />
                    </div>
                    <div class="input-group">
                        <label for="installment-due-date-${t}">تاريخ الاستحقاق</label>
                        <input type="date" id="installment-due-date-${t}" value="${u}" required />
                    </div>
                    <div class="input-group">
                        <label for="installment-status-${t}">الحالة</label>
                        <select id="installment-status-${t}" required>
                            <option value="unpaid" selected>مستحق</option>
                            <option value="paid">مدفوع</option>
                        </select>
                    </div>
                `,E.appendChild(s)}}}c.addEventListener("change",b);m.addEventListener("input",b);const I=document.getElementById("add-installment-form");I.addEventListener("submit",async n=>{n.preventDefault();const o=I.querySelector('button[type="submit"]');o.disabled=!0,o.textContent="جاري الحفظ...";try{const t={unitType:document.getElementById("unitType").value==="other"?document.getElementById("otherUnitType").value:document.getElementById("unitType").value,unitLocation:document.getElementById("unitLocation").value,customerName:document.getElementById("customerName").value,customerPhone:document.getElementById("customerPhone").value,totalAmount:parseFloat(m.value),installmentsCount:parseInt(c.value),createdAt:new Date},s=[];let e=0;for(let a=1;a<=t.installmentsCount;a++){const i=parseFloat(document.getElementById(`installment-amount-${a}`).value),B=document.getElementById(`installment-due-date-${a}`).value,T=document.getElementById(`installment-status-${a}`).value;s.push({amount:i,dueDate:B,status:T}),e+=i}if(Math.abs(t.totalAmount-e)>.01)throw new Error("مجموع الأقساط لا يساوي المبلغ الإجمالي");const u=L(d),r=p(y(d,"contracts"));u.set(r,t),s.forEach(a=>{const i=p(y(d,"installments"));u.set(i,{...a,contractId:r.id,customerName:t.customerName,unitLocation:t.unitLocation})}),await u.commit(),alert("تم حفظ العقد والأقساط بنجاح!"),window.location.href="/admin/installments"}catch(l){console.error("Error adding document: ",l),alert(`حدث خطأ أثناء الحفظ: ${l.message}`),o.disabled=!1,o.textContent="حفظ العقد"}});
