import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://efyehoznpzaaqelgxibl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

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