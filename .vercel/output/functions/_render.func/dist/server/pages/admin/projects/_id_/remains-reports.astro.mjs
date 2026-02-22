/* empty css                                               */
import { e as createAstro, f as createComponent, k as renderComponent, n as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../../../chunks/astro/server_Cggvz1LX.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../../../chunks/Layout_Tcj3x3ri.mjs';
import { $ as $$AdminLogin } from '../../../../chunks/AdminLogin_CzgLRU97.mjs';
import { d as db } from '../../../../chunks/admin_B4VhlVdo.mjs';
/* empty css                                                    */
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro("https://www.elemancompany.net");
const $$RemainsReports = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$RemainsReports;
  const { id } = Astro2.params;
  let project = null;
  let remainsReports = [];
  let feedback = { message: "", type: "" };
  if (id) {
    try {
      const unreadReportsRef = db.collection("remains_reports").where("projectId", "==", id).where("isRead", "==", false);
      const unreadReportsSnapshot = await unreadReportsRef.get();
      if (!unreadReportsSnapshot.empty) {
        const batch = db.batch();
        unreadReportsSnapshot.docs.forEach((doc) => {
          batch.update(doc.ref, { isRead: true });
        });
        await batch.commit();
      }
    } catch (error) {
      console.error("Error marking remains reports as read:", error);
    }
  }
  const reportIdToDelete = Astro2.url.searchParams.get("delete");
  if (reportIdToDelete) {
    try {
      await db.collection("remains_reports").doc(reportIdToDelete).delete();
      return Astro2.redirect(`/admin/projects/${id}/remains-reports?feedback=deleted`);
    } catch (error) {
      console.error("Error deleting report:", error);
      return Astro2.redirect(`/admin/projects/${id}/remains-reports?feedback=error`);
    }
  }
  const feedbackParam = Astro2.url.searchParams.get("feedback");
  if (feedbackParam === "deleted") feedback = { message: "\u062A\u0645 \u062D\u0630\u0641 \u062A\u0642\u0631\u064A\u0631 \u0627\u0644\u0628\u0648\u0627\u0642\u064A \u0628\u0646\u062C\u0627\u062D.", type: "success" };
  if (feedbackParam === "error") feedback = { message: "\u062D\u062F\u062B \u062E\u0637\u0623 \u0623\u062B\u0646\u0627\u0621 \u062D\u0630\u0641 \u0627\u0644\u062A\u0642\u0631\u064A\u0631.", type: "error" };
  const formatTimestamp = (timestamp) => {
    if (!timestamp || !timestamp.toDate) return "\u062A\u0627\u0631\u064A\u062E \u063A\u064A\u0631 \u0645\u062A\u0648\u0641\u0631";
    return timestamp.toDate().toLocaleDateString("ar-EG", { day: "numeric", month: "long", year: "numeric", hour: "numeric", minute: "2-digit" });
  };
  try {
    const projectDoc = await db.collection("projects").doc(id).get();
    if (!projectDoc.exists) return Astro2.redirect("/404");
    project = { id: projectDoc.id, ...projectDoc.data() };
    const reportsSnapshot = await db.collection("remains_reports").where("projectId", "==", id).get();
    remainsReports = reportsSnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAtFormatted: formatTimestamp(data.createdAt)
      };
    }).sort((a, b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0));
  } catch (error) {
    console.error("Error fetching data:", error);
    project = { projectName: "\u062E\u0637\u0623 \u0641\u064A \u062A\u062D\u0645\u064A\u0644 \u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A" };
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `\u062A\u0642\u0627\u0631\u064A\u0631 \u0627\u0644\u0628\u0648\u0627\u0642\u064A: ${project?.projectName}`, "data-astro-cid-vwply5gg": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="auth-loading-message" class="auth-container" data-astro-cid-vwply5gg> <p data-astro-cid-vwply5gg>جارٍ التحقق من صلاحيات الدخول...</p> </div> <div id="admin-login-container" class="auth-container" style="display: none;" data-astro-cid-vwply5gg> ${renderComponent($$result2, "AdminLogin", $$AdminLogin, { "data-astro-cid-vwply5gg": true })} </div> <main id="page-content" class="reports-display-page" style="display: none;" data-astro-cid-vwply5gg> <div class="container" data-astro-cid-vwply5gg> <header class="page-header" data-astro-cid-vwply5gg> <div data-astro-cid-vwply5gg> <h1 data-astro-cid-vwply5gg>تقارير بواقي مشروع: ${project.projectName}</h1> <p class="page-subtitle" data-astro-cid-vwply5gg>عرض وحذف تقارير المواد المتبقية.</p> </div> <div data-astro-cid-vwply5gg> <a${addAttribute(`/admin/projects/${id}`, "href")} class="back-link" data-astro-cid-vwply5gg>&larr; العودة للتفاصيل</a> <button id="logout-button" class="btn-logout" data-astro-cid-vwply5gg>تسجيل الخروج</button> </div> </header> ${feedback.message && renderTemplate`<div${addAttribute(`feedback-banner ${feedback.type}`, "class")} data-astro-cid-vwply5gg>${feedback.message}</div>`} <section class="reports-section" data-astro-cid-vwply5gg> ${remainsReports.length === 0 ? renderTemplate`<div class="no-items-card" data-astro-cid-vwply5gg><p data-astro-cid-vwply5gg>لا توجد تقارير بواقي لهذا المشروع بعد.</p></div>` : renderTemplate`<div class="list-container" data-astro-cid-vwply5gg> ${remainsReports.map((report) => renderTemplate`<article class="card remains-report-card"${addAttribute(report.id, "data-report-id")} data-astro-cid-vwply5gg> <div class="card-header" data-astro-cid-vwply5gg><span data-astro-cid-vwply5gg>بواسطة: ${report.supervisorName}</span><time data-astro-cid-vwply5gg>${report.createdAtFormatted}</time></div> <div class="card-content" data-astro-cid-vwply5gg> <div class="card-body" data-astro-cid-vwply5gg> <div class="remains-item-display" data-astro-cid-vwply5gg> <p class="item-name" data-astro-cid-vwply5gg><strong data-astro-cid-vwply5gg>الصنف:</strong> ${report.itemName}</p> <p class="item-quantity" data-astro-cid-vwply5gg><strong data-astro-cid-vwply5gg>الكمية:</strong> ${report.quantity}</p> </div> ${report.notes && renderTemplate`<div class="notes-section" data-astro-cid-vwply5gg><h4 data-astro-cid-vwply5gg>ملاحظات:</h4><p data-astro-cid-vwply5gg>${report.notes}</p></div>`} ${report.imageUrl && renderTemplate`<div class="attachments" data-astro-cid-vwply5gg> <h3 class="attachments-title" data-astro-cid-vwply5gg>المرفقات:</h3> <div class="image-gallery" data-astro-cid-vwply5gg> <a${addAttribute(report.imageUrl, "href")} target="_blank" rel="noopener noreferrer" class="image-thumbnail" data-astro-cid-vwply5gg> <img${addAttribute(report.imageUrl, "src")} alt="صورة مرفقة" loading="lazy" data-astro-cid-vwply5gg> </a> </div> </div>`} </div> <div class="card-footer" data-astro-cid-vwply5gg> <button type="button" class="action-btn delete-btn"${addAttribute(`/admin/projects/${id}/remains-reports?delete=${report.id}`, "data-delete-url")} data-astro-cid-vwply5gg>حذف</button> </div> </div> </article>`)} </div>`} </section> </div> <div id="delete-modal" class="modal-overlay" data-astro-cid-vwply5gg> <div class="modal-content" data-astro-cid-vwply5gg> <p data-astro-cid-vwply5gg>هل أنت متأكد أنك تريد حذف هذا التقرير؟</p> <div class="modal-actions" data-astro-cid-vwply5gg> <button id="cancel-delete-btn" class="action-btn cancel-btn-toggle" data-astro-cid-vwply5gg>إلغاء</button> <a id="confirm-delete-btn" href="#" class="action-btn delete-btn" data-astro-cid-vwply5gg>نعم، حذف</a> </div> </div> </div> </main> ` })} ${renderScript($$result, "/home/user/bobobo/src/pages/admin/projects/[id]/remains-reports.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/user/bobobo/src/pages/admin/projects/[id]/remains-reports.astro", void 0);

const $$file = "/home/user/bobobo/src/pages/admin/projects/[id]/remains-reports.astro";
const $$url = "/admin/projects/[id]/remains-reports";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$RemainsReports,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
