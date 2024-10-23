// Initialize Supabase
const SUPABASE_URL = 'https://gqylqxjhovdoeecucikg.supabase.co';  // Replace with your Supabase URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdxeWxxeGpob3Zkb2VlY3VjaWtnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2OTYzNTEsImV4cCI6MjA0NTI3MjM1MX0.lY4_hxZ3qkRjxg5a5nY2yTVPLAb-ZPp6pRWEBId2m_o';  // Replace with your anon public key
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to update visitor count
async function updateVisitorCount() {
    try {
        // Fetch the current count from the 'visitors' table
        let { data, error } = await supabase
            .from('visitors')
            .select('count')
            .eq('id', 1);

        if (error) {
            console.error("Error fetching visitor count:", error);
            return;
        }

        if (data && data.length > 0) {
            // Update the count
            const newCount = data[0].count + 1;
            await supabase
                .from('visitors')
                .update({ count: newCount })
                .eq('id', 1);

            // Display the new count
            document.getElementById('visitorCount').textContent = newCount;
        } else {
            // If no record exists, initialize with count = 1
            await supabase
                .from('visitors')
                .insert([{ id: 1, count: 1 }]);

            document.getElementById('visitorCount').textContent = 1;
        }
    } catch (err) {
        console.error("Error updating visitor count:", err);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateVisitorCount();
});
