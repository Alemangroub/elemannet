import{b as v,a as g,i as l,c as u,q as w,f as h}from"./firebase.CeNGk6Xb.js";const m=v(g),D=document.getElementById("loader"),E=document.getElementById("notifications-content"),p=document.getElementById("overdue-list"),L=document.getElementById("no-overdue"),I=document.getElementById("due-soon-list"),M=document.getElementById("no-due-soon"),b=t=>t?t.toLocaleString("ar-EG",{style:"currency",currency:"EGP"}):"";async function B(){try{const t=await l(u(m,"contracts")),s=new Map;t.forEach(o=>{s.set(o.id,o.data().customerName)});const y=w(u(m,"installments"),h("status","==","unpaid")),f=await l(y),n=new Date;n.setHours(0,0,0,0);const a=new Date(n);a.setDate(n.getDate()+7);let c=0,i=0;f.forEach(o=>{const e=o.data(),r=new Date(e.dueDate),d=`
                    <div class="notification-item">
                        <div class="item-info">
                            <span class="customer-name">${s.get(e.contractId)||"عميل غير معروف"}</span>
                            <span class="amount">المبلغ: ${b(e.amount)}</span>
                            <span class="due-date">تاريخ الاستحقاق: ${e.dueDate}</span>
                        </div>
                        <div class="item-actions">
                            <a href="/admin/contract-details?id=${e.contractId}" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                <span>عرض العقد</span>
                            </a>
                        </div>
                    </div>
                `;r<n?(p.innerHTML+=d,c++):r<=a&&(I.innerHTML+=d,i++)}),c===0&&(L.style.display="block"),i===0&&(M.style.display="block")}catch(t){console.error("Error fetching notifications: ",t),p.innerHTML='<p style="color: red;">حدث خطأ أثناء تحميل التنبيهات.</p>'}finally{D.style.display="none",E.style.display="block"}}document.addEventListener("DOMContentLoaded",B);
