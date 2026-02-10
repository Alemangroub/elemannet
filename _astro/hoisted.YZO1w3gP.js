import{o as g,b as h,i as d,c as u,d as m,q as v,f as w}from"./client.02t19jQd.js";const D=document.getElementById("loader"),E=document.getElementById("notifications-content"),y=document.getElementById("overdue-list"),I=document.getElementById("no-overdue"),b=document.getElementById("due-soon-list"),B=document.getElementById("no-due-soon"),L=t=>t?t.toLocaleString("ar-EG",{style:"currency",currency:"EGP"}):"";g(h,t=>{t?M():window.location.href="/admin"});async function M(){try{const t=await d(u(m,"contracts")),s=new Map;t.forEach(o=>{s.set(o.id,o.data().customerName)});const p=v(u(m,"installments"),w("status","==","unpaid")),f=await d(p),n=new Date;n.setHours(0,0,0,0);const a=new Date(n);a.setDate(n.getDate()+7);let c=0,i=0;f.forEach(o=>{const e=o.data(),r=new Date(e.dueDate),l=`
                    <div class="notification-item">
                        <div class="item-info">
                            <span class="customer-name">${s.get(e.contractId)||"عميل غير معروف"}</span>
                            <span class="amount">المبلغ: ${L(e.amount)}</span>
                            <span class="due-date">تاريخ الاستحقاق: ${e.dueDate}</span>
                        </div>
                        <div class="item-actions">
                            <a href="/admin/contract-details?id=${e.contractId}" class="btn btn-primary">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                <span>عرض العقد</span>
                            </a>
                        </div>
                    </div>
                `;r<n?(y.innerHTML+=l,c++):r<=a&&(b.innerHTML+=l,i++)}),c===0&&(I.style.display="block"),i===0&&(B.style.display="block")}catch(t){console.error("Error fetching notifications: ",t),y.innerHTML='<p style="color: red;">حدث خطأ أثناء تحميل التنبيهات.</p>'}finally{D.style.display="none",E.style.display="block"}}
