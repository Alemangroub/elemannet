---
import type { APIRoute } from 'astro';
import { db, admin } from "../../../firebase/admin";

export const POST: APIRoute = async ({ request }) => {
  // 1. Authenticate and authorize the user (Important for real apps)
  // For now, we'll skip this for simplicity.

  // 2. Parse the request body
  let data;
  try {
    data = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid request: JSON is badly formatted.' }), { status: 400 });
  }

  const { projectId, supervisorId, supervisorName } = data;

  // 3. Validate the incoming data
  if (!projectId || !supervisorId || !supervisorName) {
    return new Response(JSON.stringify({ message: 'Invalid request: Missing required fields (projectId, supervisorId, supervisorName).' }), { status: 400 });
  }

  // 4. Perform the database operation
  try {
    const projectRef = db.collection('projects').doc(projectId);

    // Use Firestore's arrayUnion to add the new supervisor atomically.
    // This prevents race conditions and ensures no duplicates if run multiple times.
    await projectRef.update({
      supervisors: admin.firestore.FieldValue.arrayUnion({ 
        id: supervisorId, 
        name: supervisorName 
      })
    });

    // 5. Send a success response
    return new Response(JSON.stringify({ message: 'Supervisor assigned successfully!' }), { status: 200 });

  } catch (error) {
    console.error('Error assigning supervisor:', error);
    // Check for specific errors, e.g., document not found
    if (error.code === 5) { // Firestore code for NOT_FOUND
        return new Response(JSON.stringify({ message: `Project with ID ${projectId} not found.` }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: 'Internal Server Error: Could not assign supervisor.' }), { status: 500 });
  }
};
---
