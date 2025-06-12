import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://efyehoznpzaaqelgxibl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmeWVob3pucHphYXFlbGd4aWJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MTA1NjgsImV4cCI6MjA2NTI4NjU2OH0.RyE6U1frOhI3YDCpeV2OL_6WS7wyQT9DCgaAIUecbPg';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchData() {
  const { data, error } = await supabase.from('name').select('*');
  if (error) {
    console.error('Erreur :', error);
  } else {
    console.log('Données récupérées :', data);
  }
}

fetchData();