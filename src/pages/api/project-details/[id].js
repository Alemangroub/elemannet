const { db } = require("../../../firebase/admin");

// This is an API route in Astro, designed to run securely on the server.
// It receives a project ID, fetches its details from Firestore using the Admin SDK,
// and returns the data as JSON. This is the secure way to expose sensitive data to the client.

export async function GET({ params }) {
    const { id } = params;

    if (!id) {
        return new Response(JSON.stringify({ message: "Project ID is required" }), { status: 400 });
    }

    try {
        const projectDoc = await db.collection('projects').doc(id).get();

        if (!projectDoc.exists) {
            return new Response(JSON.stringify({ message: "Project not found" }), { status: 404 });
        }

        const projectData = projectDoc.data();

        // Fetch related data concurrently for better performance.
        const [supervisorsSnap, expensesSnap, dailyReportsSnap, leftoversSnap] = await Promise.all([
            Promise.all((projectData.supervisorIds || []).map(sid => db.collection('users').doc(sid).get())),
            db.collection('daily_expenses').where('projectId', '==', id).where('isRead', '==', false).get(),
            db.collection('daily_reports').where('projectId', '==', id).where('isRead', '==', false).get(),
            db.collection('leftovers_reports').where('projectId', '==', id).where('isRead', '==', false).get()
        ]);

        const supervisorNames = supervisorsSnap.map(doc => doc.exists ? doc.data().name : 'مشرف محذوف');

        const projectDetails = { 
            id: projectDoc.id, 
            projectName: projectData.projectName || 'اسم غير متوفر',
            projectAddress: projectData.projectAddress || 'عنوان غير محدد',
            supervisors: supervisorNames,
            unreadExpenseReports: expensesSnap.size,
            unreadDailyReports: dailyReportsSnap.size,
            unreadLeftoversReports: leftoversSnap.size,
        };

        return new Response(JSON.stringify(projectDetails), { 
            status: 200, 
            headers: { "Content-Type": "application/json" } 
        });

    } catch (error) {
        console.error("API Route Error fetching project details:", error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
    }
}
