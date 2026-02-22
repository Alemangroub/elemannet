import{o as k,d as E,a as f,g as $,b as D,q as F,c as b,f as T,h as _,s as H,e as g,y as h,z as G,A as U,B as z,C as O}from"./client.BqIP8IDN.js";function L(){let c={uid:null,name:""},u={},m={};const j=document.getElementById("auth-loading-message"),x=document.getElementById("dashboard-content"),I=document.getElementById("user-name-placeholder"),p=document.getElementById("projects-list"),w=document.getElementById("no-projects-message"),q=document.getElementById("logout-button");if(!x||!p)return;async function N(s){s.preventDefault();const e=s.target,t=e.dataset.projectId,a=e.querySelector('button[type="submit"]'),r=e.matches(".report-form");a.disabled=!0,a.textContent="جارٍ الحفظ...";try{if(r?await A(e,t):e.matches(".expense-form")?await R(e,t):e.matches(".leftovers-form")&&await M(e,t),alert("تم حفظ التقرير بنجاح!"),r)window.location.reload();else if(e.reset(),document.querySelector(`[data-project-group-id="${t}"]`)){const o=e.closest(".form-card");o&&(o.style.display="none")}}catch(n){console.error("Submission Error:",n);let o="حدث خطأ أثناء حفظ التقرير. يرجى المحاولة مرة أخرى.";n instanceof Error&&(n.message==="At least one expense item is required"?o="يجب إضافة بند مصروف واحد على الأقل قبل الحفظ.":n.message==="At least one leftover item is required"?o="يجب إضافة بند باقٍ واحد على الأقل قبل الحفظ.":n.message==="Report text is required"&&(o="نص التقرير مطلوب للحفظ.")),alert(o)}finally{r||(a.disabled=!1,e.matches(".expense-form")?a.textContent="حفظ المصروفات":e.matches(".leftovers-form")&&(a.textContent="حفظ البواقي"))}}p.addEventListener("submit",N),p.addEventListener("click",s=>{const e=s.target,t=e.closest(".project-group");if(!t)return;const a=t.dataset.projectGroupId;if(e.matches(".btn-toggle-expense")&&(t.querySelector(".expense-card").style.display="block",t.querySelector(".report-card").style.display="none",t.querySelector(".leftovers-card").style.display="none"),e.matches(".btn-toggle-report")&&(t.querySelector(".expense-card").style.display="none",t.querySelector(".report-card").style.display="block",t.querySelector(".leftovers-card").style.display="none"),e.matches(".btn-toggle-leftovers")&&(t.querySelector(".expense-card").style.display="none",t.querySelector(".report-card").style.display="none",t.querySelector(".leftovers-card").style.display="block"),e.matches(".btn-cancel-expense")&&(t.querySelector(".expense-card").style.display="none",u[a]=[],v(a,t.querySelector(".expense-form"),"staged-expenses-list",u)),e.matches(".btn-cancel-report")&&(t.querySelector(".report-card").style.display="none"),e.matches(".btn-cancel-leftovers")&&(t.querySelector(".leftovers-card").style.display="none",m[a]=[],v(a,t.querySelector(".leftovers-form"),"staged-leftovers-list",m)),e.matches(".btn-add-item")){const r=e.closest("form"),n=r.matches(".leftovers-form"),o=r.querySelector(".item-name"),i=r.querySelector(".item-amount"),l=o.value.trim(),d=i.value.trim();if(!l){alert(`يرجى إدخال ${n?"الصنف":"البند"}.`);return}if(!d){alert("يرجى إدخال الكمية.");return}const y=n?m:u,P=n?"staged-leftovers-list":"staged-expenses-list";y[a]||(y[a]=[]),y[a].push({id:Date.now(),name:l,amount:d}),v(a,r,P,y),o.value="",i.value=""}if(e.matches(".btn-delete-item")){const r=e.closest("form"),n=r.matches(".leftovers-form"),o=n?m:u,i=n?"staged-leftovers-list":"staged-expenses-list",l=parseInt(e.getAttribute("data-id"),10);o[a]&&(o[a]=o[a].filter(d=>d.id!==l),v(a,r,i,o))}}),k(D,async s=>{if(s){const e=E(f,"users",s.uid),t=await $(e);t.exists()&&t.data().role==="supervisor"?(c.uid=s.uid,c.name=t.data().name||"المشرف",I.textContent=c.name,await B(c.uid),j.style.display="none",x.style.display="block"):window.location.href="/admin"}else window.location.href="/admin"});async function S(s,e,t){const a=Array.from(s).map(r=>{const n=G(U,`${t}/${e}/${Date.now()}_${r.name}`),o=z(n,r);return new Promise((i,l)=>{o.on("state_changed",d=>{},d=>l(d),()=>O(o.snapshot.ref).then(i))})});return Promise.all(a)}async function A(s,e){const t=s.querySelector(".report-text").value;if(!t.trim())throw new Error("Report text is required");const a=s.querySelector(".report-images").files,r=await S(a,e,"daily_reports");await g(b(f,"daily_reports"),{projectId:e,supervisorId:c.uid,supervisorName:c.name,reportText:t,imageUrls:r,isRead:!1,createdAt:h()})}async function R(s,e){const t=u[e]||[];if(t.length===0)throw new Error("At least one expense item is required");const a=s.querySelector(".expense-notes").value,r=s.querySelector(".expense-images").files,n=await S(r,e,"daily_expenses");await g(b(f,"daily_expenses"),{projectId:e,supervisorId:c.uid,supervisorName:c.name,items:t.map(o=>({name:o.name,amount:parseFloat(o.amount)})),notes:a,imageUrls:n,isRead:!1,createdAt:h()}),u[e]=[]}async function M(s,e){const t=m[e]||[];if(t.length===0)throw new Error("At least one leftover item is required");const a=s.querySelector(".leftovers-notes").value;await g(b(f,"remains_reports"),{projectId:e,supervisorId:c.uid,supervisorName:c.name,items:t,notes:a,isRead:!1,createdAt:h()}),m[e]=[]}async function B(s){try{const e=F(b(f,"projects"),T("supervisorIds","array-contains",s)),a=(await _(e)).docs.map(i=>({id:i.id,...i.data()}));if(a.length===0){w.style.display="block",p.innerHTML="";return}const r=[...new Set(a.flatMap(i=>i.supervisorIds||[]))],n=new Map;r.length>0&&(await Promise.all(r.map(l=>$(E(f,"users",l))))).forEach(l=>{l.exists()&&n.set(l.id,l.data().name||"اسم غير معروف")});const o=a.map(i=>({...i,supervisorNames:(i.supervisorIds||[]).map(l=>n.get(l)||"اسم غير معروف")}));w.style.display="none",p.innerHTML=o.map(C).join("")}catch(e){console.error("Error fetching supervisor projects:",e),p.innerHTML='<p class="error-message">حدث خطأ أثناء تحميل المشاريع.</p>'}}function C(s){u[s.id]=[],m[s.id]=[];const e=s.supervisorNames.join(", ");return`
          <div class="project-group" data-project-group-id="${s.id}">
              <div class="project-card">
                  <div class="card-details">
                      <div class="card-item"><span class="item-label">اسم المشروع</span><p class="item-value">${s.projectName}</p></div>
                      <div class="card-item"><span class="item-label">عنوان المشروع</span><p class="item-value">${s.projectAddress||"غير محدد"}</p></div>
                      <div class="card-item"><span class="item-label">المشرفون</span><p class="item-value">${e}</p></div>
                  </div>
                  <div class="card-actions">
                      <button class="btn btn-action btn-toggle-expense">مصروفات يومية</button>
                      <button class="btn btn-action btn-toggle-report">تقرير يومي</button>
                      <button class="btn btn-action btn-toggle-leftovers">تقرير البواقي</button>
                  </div>
              </div>
              
              <div class="form-card expense-card" style="display: none;">
                   <form class="expense-form" data-project-id="${s.id}">
                      <header class="form-card-header"><h2>إضافة مصروفات يومية لمشروع: ${s.projectName}</h2></header>
                      <div class="form-section-title">إضافة بند مصروف</div>
                      <div class="add-item-container">
                          <div class="form-group"><label>اختر البند</label><input type="text" class="item-name" placeholder="اسم البند"></div>
                          <div class="form-group"><label>المبلغ (ج.م)</label><input type="number" class="item-amount" placeholder="0.00"></div>
                          <button type="button" class="btn btn-add-item">+ إضافة البند</button>
                      </div>
                      <div class="staged-items-container" style="display: none;"><div class="form-section-title">البنود المضافة</div><ul class="staged-expenses-list"></ul></div>
                      <div class="form-section-title">تفاصيل إضافية</div>
                      <div class="form-group"><label>ملاحظات (اختياري)</label><textarea class="expense-notes" rows="3"></textarea></div>
                      <div class="form-group"><label>إرفاق صور (اختياري)</label><input type="file" class="expense-images" multiple accept="image/*"></div>
                      <div class="upload-progress" style="display: none;"></div>
                      <div class="form-actions"><button type="submit" class="btn btn-submit">حفظ المصروفات</button><button type="button" class="btn btn-cancel-expense">إلغاء</button></div>
                  </form>
              </div>

              <div class="form-card leftovers-card" style="display: none;">
                   <form class="leftovers-form" data-project-id="${s.id}">
                      <header class="form-card-header"><h2>إضافة تقرير بواقي لمشروع: ${s.projectName}</h2></header>
                      <div class="form-section-title">إضافة بند باقي</div>
                      <div class="add-item-container">
                          <div class="form-group"><label>الصنف</label><input type="text" class="item-name" placeholder="اسم الصنف"></div>
                          <div class="form-group"><label>الكمية</label><input type="text" class="item-amount" placeholder="مثال: 10 شكاير"></div>
                          <button type="button" class="btn btn-add-item">+ إضافة البند</button>
                      </div>
                      <div class="staged-items-container" style="display: none;"><div class="form-section-title">البنود المضافة</div><ul class="staged-leftovers-list"></ul></div>
                      <div class="form-section-title">تفاصيل إضافية</div>
                      <div class="form-group"><label>ملاحظات (اختياري)</label><textarea class="leftovers-notes" rows="3"></textarea></div>
                      <div class="form-actions"><button type="submit" class="btn btn-submit">حفظ البواقي</button><button type="button" class="btn btn-cancel-leftovers">إلغاء</button></div>
                  </form>
              </div>

              <div class="form-card report-card" style="display: none;">
                  <form class="report-form" data-project-id="${s.id}">
                      <header class="form-card-header"><h2>إضافة تقرير يومي لمشروع: ${s.projectName}</h2></header>
                      <div class="form-group"><label>نص التقرير</label><textarea class="report-text" rows="6" required placeholder="اكتب هنا تفاصيل سير العمل، المشاكل، التقدم المحرز..."></textarea></div>
                      <div class="form-group"><label>إرفاق صور (اختياري)</label><input type="file" class="report-images" multiple accept="image/*"></div>
                      <div class="upload-progress" style="display: none;"></div>
                      <div class="form-actions"><button type="submit" class="btn btn-submit">حفظ التقرير</button><button type="button" class="btn-cancel-report">إلغاء</button></div>
                  </form>
              </div>
          </div>
        `}function v(s,e,t,a){const r=e.querySelector(`.${t}`),n=e.closest(".form-card").querySelector(".staged-items-container");if(!(!r||!n)){if(r.innerHTML="",!a[s]||a[s].length===0){n.style.display="none";return}n.style.display="block",a[s].forEach(o=>{const i=document.createElement("li");i.className="staged-item";const l=t==="staged-leftovers-list"?"":" ج.م",d=t==="staged-leftovers-list"?o.amount:parseFloat(o.amount).toFixed(2);i.innerHTML=`<span>${o.name}</span> <span class="item-amount">${d}${l}</span><button type="button" class="btn-delete-item" data-id="${o.id}">&times;</button>`,r.appendChild(i)})}}q&&q.addEventListener("click",async()=>{try{await H(D),window.location.href="/admin"}catch(s){console.error("Logout Error:",s)}})}L();document.addEventListener("astro:after-swap",L);
